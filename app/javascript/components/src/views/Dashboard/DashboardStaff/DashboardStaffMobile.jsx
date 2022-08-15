import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faUserGroup, faGear, faHouseUser, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const pmDashTabs = [
  {
    icon: faHouseUser,
    text: "Tenants"
  },
  {
    icon: faCircleExclamation,
    text: "Tickets"
  }
];


const DashboardStaffMobile = () => {
  const [tenants, setTenants] = useState([]);
  const [tickets, setTickets] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.apiCall('get', `/users/${userContext.user.id}`, {}, {})
      .then(({ data }) => {
        if (data) {
          mapTenants(data.tenants);
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
      <MobileTabSection tabSections={pmDashTabs} tabData={[tenants, tickets]} />
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

export default DashboardStaffMobile;
