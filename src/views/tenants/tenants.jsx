import React, { useContext, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import { Link } from "react-router-dom";


import UserContext from '../../UserContext';
import useMountEffect from '../../utils/useMountEffect';
import Toast from '../../utils/toast';
import Search from "../../components/Search/index";
import { ShowHideSwitch } from '../../components/ShowHideSwitch';

import { columns } from './tenantsFormStructure'
import './tenants.scss'

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

const addPropertyNames = ((tenants, allProperties) => {
  return tenants.map(tenant => {
    if (tenant.lease) {
      const propertyIndex = allProperties.findIndex(property =>
        property.id === tenant.lease.propertyID)
      tenant.propertyName = allProperties[propertyIndex].name
    }
    return tenant
  });
});

const formatTenantData = tenants => tenants.map(tenant => {
  const { id, lease, phone, fullName } = tenant;
  const staff = tenant.staff.map(staff => {
    return `${staff.firstName} ${staff.lastName}`
  })
  return { id, lease, phone, fullName, staff }
})

const sortTenantData = tenants => tenants.sort((a, b) => {
  if (a.fullName < b.fullName) {
    return -1;
  }
  if (a.fullName > b.fullName) {
    return 1;
  }
  return 0;
})

const getDisplayTenants = (tenants, showHoused) =>
  tenants.filter(tenant => showHoused || tenant.lease);

export function Tenants() {
  const userContext = useContext(UserContext)

  const [allTenants, setAllTenants] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState([]);
  const [showHoused, setShowHoused] = useState(false);
  const [searchedTenants, setSearchedTenants] = useState([]);
  const [displayTenants, setDisplayTenants] = useState([]);
  // const [defaultSort, setDefaultSort] = useState(defaultSort)

  useMountEffect(() => {
    let allProperties;

    axios.get(`/api/properties`, makeAuthHeaders(userContext))
      .then(propertyResponse => {
        const { data: { properties } } = propertyResponse;
        allProperties = properties;
      })
      .then(() =>
        axios.get("/api/tenants", makeAuthHeaders(userContext))
      )
      .then((response) => {
        const { data: { tenants } } = response;
        const tenantRows = formatTenantData(tenants)
        const tenantsWithProperties = addPropertyNames(tenantRows, allProperties)
        const sortedTenants = sortTenantData(tenantsWithProperties)
        setAllTenants(sortedTenants);
        setSearchedTenants(sortedTenants);
        setDisplayTenants(getDisplayTenants(sortedTenants, showHoused));
      })
      .catch((error) => {
        Toast(error.message, "error")
      });
  })

  const handleToggleHoused = () => {
    setShowHoused(!showHoused)
    setDisplayTenants(getDisplayTenants(searchedTenants, !showHoused))
  }

  const handleDisableSearch = () => {
    setSearchedTenants(allTenants);
    setIsSearchActive(false);
    setDisplayTenants(getDisplayTenants(allTenants, showHoused))
  }

  const handleSearchOutput = (output, isTrue) => {
    setSearchedTenants(output);
    setIsSearchActive(isTrue);
    setDisplayTenants(getDisplayTenants(output, showHoused))
  }

  return (
    <div className='main-container'>
      <div className='tenants'>
        <div className='section-header'>
          <h2 className='page-title'>Tenants</h2>
          <Link
            className='button is-primary is-rounded ml-4'
            to='/add/tenant'>+ ADD NEW</Link>
        </div>
        <div className='search-and-archive-container'>
          <Search
            input={allTenants}
            outputLocation={searchedTenants}
            isFilteredLocation={isSearchActive}
            setIsFilteredStateFalse={handleDisableSearch}
            setOutputState={handleSearchOutput}
            placeholderMessage="Search tenants by name, property, or JOIN staff" />
          <ShowHideSwitch
            labelText="Unhoused:"
            isShowState={showHoused}
            handleToggleChange={handleToggleHoused}
          />
        </div>
        <div className="tenants-list">
          <BootstrapTable
            key={`tables-of-tenants--${allTenants.length}`}
            wrapperClasses='tenants-list-wrapper'
            keyField='id'
            data={displayTenants}
            columns={columns}
            defaultSorted={[
              {
                dataField: 'propertyName',
                order: 'asc'
              }]}
            bootstrap4={true}
            headerClasses='table-header'
          />
        </div>
      </div>
    </div>
  )
};
