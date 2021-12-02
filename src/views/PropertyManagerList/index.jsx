import React, { useContext, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import roleEnum from '../../Enums/RoleEnum';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Search from "../components/Search";
import UserContext from '../../contexts/UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Icon from '../components/icon/Icon';
import './styles/index.scss';
import { columns, mobileColumns } from './components/managersTableComponents';
import { useMediaQueries } from '@react-hook/media-query';
import { tabletWidth } from '../../constants/index.js';
import { convertManagersDataForTable } from './util'

const getManagers = (context, storeInState, updateLoading, setSearchedManagers) => {
  context.apiCall('get', `/user?r=${roleEnum.PROPERTY_MANAGER}`, {}, {})
    .then((response) => {
      const convertedData = convertManagersDataForTable(response.data.users);
      storeInState(convertedData);
      setSearchedManagers(convertedData);
      updateLoading(false);
    })
    .catch(_ => {
      updateLoading(false);
    });
};

const expandRow = isSmallScreen => ({
  renderer: row => (
    <div>
      <label for="email">Email</label>
      <p id="email">{row.email}</p>
      <br />

      <label for="status">Status</label>
      <p id="status">{row.status}</p>
      <br />

      <label for="last-active">Last Usage</label>
      <p id="last-active">{row.lastActive}</p>
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

const PropertyManagerList = () => {
  const [managersData, setManagersData] = useState();
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedManagers, setSearchedManagers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const context = useContext(UserContext);

  const handleSelectRow = (manager) => setSelectedManagers([...selectedManagers, manager]);
  const handleDeselectRow = (manager) => setSelectedManagers(selectedManagers.filter(p => p.id !== manager.id));
  const handleSelectAll = setSelectedManagers;
  const handleDeselectAll = (_) => setSelectedManagers([]);

  const { matchesAll: isSmallScreen } = useMediaQueries({
    screen: 'screen',
    width: `(max-width: ${tabletWidth})`
  });
  
  useEffect(() => {
    setIsLoading(true);
    getManagers(context, setManagersData, setIsLoading, setSearchedManagers);
  }, []);

  const handleDisableSearch = () => {
    setSearchedManagers(managersData);
    setIsSearchActive(false);
  }

  const handleSearchOutput = (output, isTrue) => {
    setSearchedManagers(output);
    setIsSearchActive(isTrue);
  }

  return (
    <div className="managers main-container">
      <div className="section-header">
        <h2 className="page-title">Property Managers</h2>
        <Link className="button is-rounded is-primary ml-4" to="/add/manager">
          + ADD NEW
        </Link>
      </div>
      <div>
        <Search
          input={managersData}
          outputLocation={searchedManagers}
          isFilteredLocation={isSearchActive}
          setIsFilteredStateFalse={handleDisableSearch}
          setOutputState={handleSearchOutput}
          placeholderMessage="Search property managers by name, property, or status" />
      </div>
      <div className="invite-button-container py-3">
        <button className="button is-rounded is-primary ml-3" type="submit">
          <FontAwesomeIcon
            className="button__envelope-icon mr-3"
            icon={faEnvelope}
          />{" "}
          Invite
        </button>
      </div>
      <div className="managers-list">
        {isLoading &&
          <Icon
            icon="gear"
            classNames="spinner" />}

        {managersData &&
          <BootstrapTable
            keyField="id"
            data={searchedManagers}
            columns={isSmallScreen ? mobileColumns : columns}
            selectRow={({
              mode: 'checkbox',
              clickToSelect: isSmallScreen ? false : true,
              clickToExpand: isSmallScreen ? true : false,
              onSelect: (row, isSelect) => isSelect ? handleSelectRow(row) : handleDeselectRow(row),
              onSelectAll: (isSelect, rows) => isSelect ? handleSelectAll(rows) : handleDeselectAll(rows),
              sort: true,
              headerColumnStyle: () => ({ width: "5%" })
            })}
            defaultSortDirection="asc"
            bootstrap4={true}
            headerClasses="table-header"
            wrapperClasses="managers-list-wrapper"
            expandRow={expandRow(isSmallScreen)}
          />
        }
      </div>
    </div>
  );
};

export default PropertyManagerList;
