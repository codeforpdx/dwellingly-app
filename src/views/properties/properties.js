import React, { useContext, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import UserContext from '../../UserContext';
import { Link } from "react-router-dom";
import * as axios from 'axios';
import Search from '../../components/Search';
import { ShowHideSwitch } from '../../components/ShowHideSwitch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import useMountEffect from '../../utils/useMountEffect';
import Toast from '../../utils/toast';

import './properties.scss';

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

const columns = [{
  dataField: 'name',
  formatter: (cell, row, rowIndex, formatExtraData) => {
    return (
      <Link key={row.id} to={`/manage/properties/${row.id}`}>
        {row.name}
      </Link>
    );
  },
  text: 'Name',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };

  }
}, {
  dataField: 'propertyManagerNames',
  text: 'Property Managers',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'address',
  text: 'Address',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'totalTenants',
  text: 'Tenants',
  sort: true,
  headerStyle: () => {
    return { width: "10%" };
  }
}, {
  dataField: 'created_at',
  text: 'Added On',
  sort: true,
  headerStyle: () => {
    return { width: "10%" };
  }
}];


const getDisplayProperties = (properties, showArchived) => properties.filter(p => showArchived || !p.archived);

const formatPropertyData = (properties) => properties.map(p => ({
  id: p.id,
  archived: p.archived,
  name: p.name,
  propertyManagerNames: p.propertyManagerName && p.propertyManagerName.join(", "),
  address: p.address,
  totalTenants: p.tenantIDs && p.tenantIDs.length,
  created_at: p.created_at
}));


export const Properties = () => {
  const userContext = useContext(UserContext);

  const [allProperties, setAllProperties] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [searchedProperties, setSearchedProperties] = useState([]);
  const [displayProperties, setDisplayProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [checkboxRenderCount, setCheckboxRenderCount] = useState(0);

  const handleToggleArchived = () => { 
    const newShowArchived = !showArchived
    setShowArchived(newShowArchived);
    setDisplayProperties(getDisplayProperties(searchedProperties, newShowArchived));
  };
  const handleDisableSearch = () => {
    setSearchedProperties(allProperties);
    setIsSearchActive(false);
    setDisplayProperties(getDisplayProperties(allProperties, showArchived));
  };
  const handleSearchOutput = (output, isTrue) => {
    setSearchedProperties(output);
    setIsSearchActive(isTrue);
    setDisplayProperties(getDisplayProperties(output, showArchived));
  };
  const handleSelectRow = (property) => setSelectedProperties([...selectedProperties, property]);
  const handleDeselectRow = (property) => setSelectedProperties(selectedProperties.filter(p => p.id !== property.id));
  const handleSelectAll = setSelectedProperties;
  const handleDeselectAll = (_) => setSelectedProperties([]);


  useMountEffect(() => {
    axios.get("/api/properties", makeAuthHeaders(userContext))
      .then((response) => {
        const { data: { properties } } = response;
        const propertyRows = formatPropertyData(properties)
        setAllProperties(propertyRows);
        setSearchedProperties(propertyRows);
        setDisplayProperties(getDisplayProperties(propertyRows, showArchived));
      })
      .catch((error) => {
        Toast(error.message, "error");
      });
  });


  const archiveProperties = () => {
    const propertyIds = selectedProperties.map(p => p.id);
    axios.patch(`/api/properties/archive`, { ids: propertyIds }, makeAuthHeaders(userContext))
      .then((response) => {
        Toast(`Property Archived.`);
        const { data: { properties } } = response;
        const propertyRows = formatPropertyData(properties);
        setAllProperties(propertyRows);
        setSearchedProperties(propertyRows);
        setDisplayProperties(getDisplayProperties(propertyRows, showArchived));
        setSelectedProperties([]);
        setCheckboxRenderCount(checkboxRenderCount + 1);
      })
      .catch((error) => {
        Toast(error.message, "error");
      })
  }


  return (
    <div className='main-container'>
      <div className="properties">
        <div className="section-header">
          <h2 className="page-title">Properties</h2>
          <Link className="button is-primary is-rounded ml-4" to="/add/property">+ ADD NEW</Link>
        </div>
        <div className="search-and-archive-container">
          <Search
            input={allProperties}
            outputLocation={searchedProperties}
            isFilteredLocation={isSearchActive}
            setIsFilteredStateFalse={handleDisableSearch}
            setOutputState={handleSearchOutput}
            placeholderMessage="Search by name, address, or property manager"
          />
          <ShowHideSwitch labelText="Archived:" isShowState={showArchived} handleToggleChange={handleToggleArchived}/>
        </div>
        <div className='bulk-actions-container py-3'>
          <button 
            className={`button is-rounded is-primary ml-3 ${selectedProperties.length && 'is-active-button'}`}
            onClick={archiveProperties}
          >
            <FontAwesomeIcon
              className="mr-3"
              icon={faArchive}
            />
            Archive Properties
          </button>
        </div>
        <div className="properties-list">
          <BootstrapTable
            key={`tables-of-properties--${checkboxRenderCount}`}
            wrapperClasses='properties-list-wrapper'
            keyField='id'
            data={displayProperties}
            columns={columns}
            selectRow={({
              mode: 'checkbox',
              clickToSelect: true,
              onSelect: (row, isSelect) => isSelect? handleSelectRow(row) : handleDeselectRow(row),
              onSelectAll: (isSelect, rows) => isSelect? handleSelectAll(rows) : handleDeselectAll(rows),
              sort: true,
              headerColumnStyle: () => ({ width: "5%" }),
            })}
            defaultSortDirection="asc"
            bootstrap4={true}
            headerClasses="table-header"
          />
        </div>
      </div>
    </div>
  );
}
