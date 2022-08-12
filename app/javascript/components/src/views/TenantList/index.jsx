import React, { useContext, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../contexts/UserContext';
import useMountEffect from '../../utils/useMountEffect';
import Toast from '../../utils/toast';
import Icon from '../components/icon/Icon';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Search from "../components/Search/index";
import { ShowHideSwitch } from '../components/ShowHideSwitch';
import Modal from '../components/Modal';
import { columns, mobileColumns } from './components/TenantsTable/tenantsTableComponents';
import { tabletWidth } from '../../constants/index.js';
import { useMediaQueries } from '@react-hook/media-query';
import './styles/index.scss';

const addPropertyNames = ((tenants, allProperties) => {
  return tenants.map(tenant => {
    if(tenant.lease) {
      const propertyIndex = allProperties.findIndex(property =>
        property.id === tenant.lease.property_id);
      tenant.propertyName = allProperties[propertyIndex].name;
    }
    return tenant;
  });
});

const formatTenantData = tenants => tenants.map(tenant => {
  const { id, lease, phone, fullName, archived } = tenant;
  const staff = tenant.staff.map(staff => {
    return `${staff.firstName} ${staff.lastName}`;
  });
  return { id, lease, phone, fullName, staff, archived };
});

const sortTenantData = tenants => tenants.sort((a, b) => {
  if(a.fullName < b.fullName) {
    return -1;
  }
  if(a.fullName > b.fullName) {
    return 1;
  }
  return 0;
});

const getDisplayTenants = (tenants, showHoused, showArchived) => {
  return tenants.filter(tenant => (showHoused || tenant.lease) && (showArchived || !tenant.archived));
};

const expandRow = isSmallScreen => ({
  renderer: row => (
    <div>
      <label for="phone">Phone</label>
      <br />
      <phone id="created-at">{row.phone}</phone>
      
      <br />
      <label for="property-name">
        Property
      </label>
      <p id="property-name">
        {row.lease && <Link key={row.lease.id} to={`/manage/properties/${row.lease.propertyID}`}>
          {row.propertyName}
        </Link>}
      </p>
    </div>
  ),
  showExpandColumn: isSmallScreen ? true : false,
  expandColumnRenderer: ({ expanded }) => {
    if(expanded) {
      return (
        <FontAwesomeIcon
          className="button__envelope-icon mr-3"
          icon={faChevronDown}
        />
      );
    }
    return (
      <FontAwesomeIcon
        className="button__envelope-icon mr-3"
        icon={faChevronRight}
      />
    );
  },
});
const Tenants = () => {
  const userContext = useContext(UserContext);

  const [allTenants, setAllTenants] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState([]);
  const [showHoused, setShowHoused] = useState(false);
  const [searchedTenants, setSearchedTenants] = useState([]);
  const [displayTenants, setDisplayTenants] = useState([]);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [nonSelectableRows, setNonSelectableRows] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [checkboxRenderCount, setCheckboxRenderCount] = useState(0);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { matchesAll: isSmallScreen } = useMediaQueries({
    screen: 'screen',
    width: `(max-width: ${tabletWidth})`
  });

  useMountEffect(() => {
    fetchAllTenants();
  });

  const fetchAllTenants = () => {
    let allProperties;
    setIsLoading(true);
    userContext.apiCall('get', '/properties', {}, {})
      .then(propertyResponse => {
        allProperties = propertyResponse.data
      })
      .then(() =>
        userContext.apiCall('get', '/tenants', {}, {})
      )
      .then((tenantResponse) => {
        const tenants = tenantResponse.data;
        const tenantRows = formatTenantData(tenants);
        const tenantsWithProperties = addPropertyNames(tenantRows, allProperties);
        const sortedTenants = sortTenantData(tenantsWithProperties);
        setAllTenants(sortedTenants);
        setSearchedTenants(sortedTenants);
        setDisplayTenants(getDisplayTenants(sortedTenants, showHoused, showArchived));

        const archivedTenants = sortedTenants.filter(tenant => tenant.archived);
        setNonSelectableRows(archivedTenants.map(archivedTenant => archivedTenant.id));
        setIsLoading(false);
      })
      .catch(_ => {
        setIsLoading(false);
      });
  };

  const handleToggleHoused = () => {
    setShowHoused(!showHoused);

    if(isSearchActive) {
      setDisplayTenants(getDisplayTenants(searchedTenants, !showHoused, showArchived));
    } else {
      setDisplayTenants(getDisplayTenants(allTenants, !showHoused, showArchived));
    }
    const newSelectedTentants = getDisplayTenants(selectedTenants, !showHoused, showArchived);
    setSelectedTenants(newSelectedTentants);
  };

  const handleDisableSearch = () => {
    setSearchedTenants(allTenants);
    setIsSearchActive(false);
    setDisplayTenants(getDisplayTenants(allTenants, showHoused, showArchived));
  };

  const handleSearchOutput = (output, isTrue) => {
    setSearchedTenants(output);
    setIsSearchActive(isTrue);
    setDisplayTenants(getDisplayTenants(output, showHoused, showArchived));
  };

  const handleToggleArchived = () => {
    setShowArchived(!showArchived);

    if(isSearchActive) {
      setDisplayTenants(getDisplayTenants(searchedTenants, showHoused, !showArchived));
    } else {
      setDisplayTenants(getDisplayTenants(allTenants, showHoused, !showArchived));
    }
  };

  const toggleArchiveModal = () => {
    setShowArchiveModal(!showArchiveModal);
  };

  const handleSelectRow = (tenant) => {
    setSelectedTenants([...selectedTenants, tenant]);
  };

  const handleDeselectRow = (tenant) => {
    setSelectedTenants(selectedTenants.filter(sTenant => sTenant.id !== tenant.id));
  };

  const handleSelectAll = setSelectedTenants;

  const handleDeselectAll = (_) => setSelectedTenants([]);


  const archiveTenants = () => {
    const tenantIds = selectedTenants.map(tenant => tenant.id);

    Promise.all(tenantIds.map(tenantId =>
      userContext.apiCall('put', `/tenants/${tenantId}`, { archived: true }, {})
    ))
    .then(_ => {
      setCheckboxRenderCount(checkboxRenderCount + 1);
      setSelectedTenants([]);
      Toast('Tenants archived successfully!', 'success');
    })
    .catch(_ => {
      Toast('Error archiving tenants, please try again later.', 'error');
    });

    fetchAllTenants();
    toggleArchiveModal();
  };

  return (
    <div className='main-container'>
      <div className='tenants'>
        <div className='section-header'>
          <h2 className='page-title'>Tenants</h2>
          {userContext.user.staff_level && <Link
            className='button is-primary is-rounded ml-4'
            to='/add/tenant'>+ ADD NEW</Link>}
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
            id="housedToggleSwitch"
            labelText="Unhoused:"
            isShowState={showHoused}
            handleToggleChange={handleToggleHoused}
          />

          <ShowHideSwitch
            id="archivedToggleSwitch"
            labelText="Archived:"
            isShowState={showArchived}
            handleToggleChange={handleToggleArchived}
          />

        </div>
        <div className='bulk-actions-container py-3'>
          <button
            className={`button is-rounded is-primary ml-3 ${selectedTenants.length && 'is-active-button'}`}
            onClick={toggleArchiveModal}
          >
            <FontAwesomeIcon
              className="mr-3"
              icon={faArchive}
            />
            Archive Tenants
          </button>
        </div>

        <div className="tenants-list">
          {isLoading
            ? <Icon
              icon="gear"
              classNames="spinner" />
            : <BootstrapTable
              key={`tables-of-tenants--${checkboxRenderCount}`} wrapperClasses='tenants-list-wrapper'
              keyField='id'
              data={displayTenants}
              columns={isSmallScreen ? mobileColumns : columns}
              selectRow={({
                mode: 'checkbox',
                clickToSelect: isSmallScreen ? false : true,
                clickToExpand: isSmallScreen ? true : false,
                onSelect: (row, isSelect) => isSelect ? handleSelectRow(row) : handleDeselectRow(row),
                onSelectAll: (isSelect, rows) => isSelect ? handleSelectAll(rows) : handleDeselectAll(rows),
                sort: true,
                headerColumnStyle: () => ({ width: "5%" }),
                nonSelectable: nonSelectableRows,
                nonSelectableStyle: () => ({ color: '#999999' })
              })}
              defaultSorted={[
                {
                  dataField: 'propertyName',
                  order: 'asc'
                }]}
              bootstrap4={true}
              headerClasses='table-header'
              expandRow={expandRow(isSmallScreen)}
            />
          }
        </div>


      </div >
      {showArchiveModal &&
        <Modal
          titleText={selectedTenants.length > 1 ? "Archive Tenants" : "Archive Tenant"}
          content={
            <div>
              <p>You have selected the following {selectedTenants.length} tenants to be archived: </p>
              <ul>
                {selectedTenants.map(tenant => (
                  <li
                    key={tenant.fullName}
                    className="archive-tenants-list has-text-weight-bold">
                    {tenant.fullName}
                  </li>
                )

                )}
                <br />
                <p>Are you sure you want to archive these tenants?</p>
              </ul>
            </div>
          }
          hasButtons={true}
          hasRedirectButton={false}
          confirmButtonHandler={archiveTenants}
          confirmText="Yes"
          cancelButtonHandler={toggleArchiveModal}
          cancelText="No"
          closeHandler={toggleArchiveModal}
        />
      }

    </div >
  );
};

export default Tenants;
