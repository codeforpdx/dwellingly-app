// One top level component to make API calls, determine window size and view
// Desktop

// Collapsible list of Properties in table format - component?
// Collapsible list of Tenants in table format - component?
// Collapsible list of Tickets in table format - component?

// Call /api/users/:id to get user info, properties, and tenants
// Call /api/tenants/:id per tenant for tickets assigned to tenant or create a new API for tickets by Property Manager
// -- going to have the same issue for JOIN Staff?


// Mobile
// Breakpoint at 960 width

// 3 tabs (component) - Properties, Tenants, Tickets

import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { Link } from "react-router-dom";
import { formatDate } from '../../utils/date';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faUserGroup, faGear, faHouseUser, faBuilding, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import './styles.scss';

const tenantColumns = [
  {
    dataField: "fullName",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <Link key={row.fullName} to={`/manage/tenants/${row.id}`}>
          {row.fullName}
        </Link>
      );
    },
    text: "Tenants",
    sort: true,
  },
  {
    dataField: "lease.unitNum",
    text: "Unit",
    sort: true,
  },
  {
    dataField: "phone",
    text: "Phone",
    sort: true,
  },
];

const ticketColumns = [{
  dataField: 'id',
  text: 'Ticket',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'author',
  text: 'Sender',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'assigned',
  text: 'Assigned To',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'status',
  text: 'Status',
  sort: true,
  headerStyle: () => {
    return { width: "10%" };
  }
}, {
  dataField: 'created_at',
  text: 'Created',
  sort: true,
  headerStyle: () => {
    return { width: "15%" };
  }
}, {
  dataField: 'updated_at',
  text: 'Updated',
  sort: true,
  headerStyle: () => {
    return { width: "15%" };
  }
}];

const pmDashTabs = [
  {
    icon: faHouseUser,
    text: "Tenants"
  },
  {
    icon: faBuilding,
    text: "Properties"
  },
  {
    icon: faCircleExclamation,
    text: "Tickets"
  }
];


const DashboardPropertyManagerMobile = () => {
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  const [tickets, setTickets] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.apiCall('get', `/users/${userContext.user.id}`, {}, {})
      .then(({ data }) => {
        if (data) {
          mapTenants(data.tenants);
          mapProperties(data.properties);
        }
      });

    userContext.apiCall('get', '/tickets', {}, {})
      .then(({ data }) => {
        mapTickets(data);
      });
  }, []);

  const mapTenants = (tenants) =>
    setTenants(tenants.map(t => (
      {
        header: t.fullName,
        detail: t.propertyName,
        link: `/manage/tenants/${t.id}`
      }
    )));

  const mapProperties = (properties) =>
    setProperties(properties.map(p => (
      {
        header: p.name,
        detail: p.address,
        link: `/manage/properties/${p.id}`
      }
    )));

  const mapTickets = (tickets) =>
    setTickets(tickets.map(t => (
      {
        header: t.issue,
        detail: t.tenant,
        link: `/manage/tickets/${t.id}`
      }
    )));

  return (
    <div>
      <div className="navbar-brand bg-gradient mobile-dash-header">
        <div className="user-name-header">{userContext.user?.firstName} {userContext.user?.lastName}</div>
        <br />
        <div className="mobile-header-nav-container">
          <Link
            to="/emergency"
            className="dashboard-link">
            <FontAwesomeIcon size={"lg"} icon={faAsterisk} />
            <p>Emergency</p>
          </Link>
          <Link
            to="/staff"
            className="dashboard-link">
            <FontAwesomeIcon size={"lg"} icon={faUserGroup} />
            <p>JOIN</p>
          </Link>
          <Link
            to="/settings"
            className="dashboard-link">
            <FontAwesomeIcon size={"lg"} icon={faGear} />
            <p>Settings</p>
          </Link>
        </div>
      </div>
      <MobileTabSection tabSections={pmDashTabs} tabData={[tenants, properties, tickets]} />
    </div>
  );
};

export const MobileTabSection = (props) => {
  const { tabSections, tabData } = props;
  const [currentTab, setCurrentTab] = useState(0);

  const mapTabHeaders = () =>
    tabSections.map((tab, index) =>
      <button className={index === currentTab ? 'selected' : ''} key={tab.text} onClick={() => setCurrentTab(index)}>
        <FontAwesomeIcon size={"lg"} icon={tab.icon} />
        <span>{tab.text}</span>
      </button>
    )

  const mapTabData = (currentTab) =>
    tabData[currentTab].map(data =>
      <Link key={data.header} to={data.link} className="row-item">
        <p className="row-item-header">{data.header}</p>
        <p className="row-item-detail">{data.detail}</p>
      </Link>
    );

  return (
    <div className="mobile-tabs-container">
      <div className="mobile-tabs">
        {mapTabHeaders()}
      </div>
      <div className="mobile-tab-content">
        {mapTabData(currentTab)}
      </div>
    </div>
  )
}

export default DashboardPropertyManagerMobile;