import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../UserContext';
import useMountEffect from '../../utils/useMountEffect';
import DashboardModule from '../../components/DashboardModule';
import Collapsible from '../../components/Collapsible';
import Modal from '../../components/Modal';
import RequestItem from '../../components/RequestItem';
import NewStaffItem from '../../components/NewStaffItem';
import RoleEnum from '../../Enums/RoleEnum';
import axios from 'axios';

import './dashboard.scss';

export const Dashboard = (props) => {
  const [modalActive, setModalActive] = useState({
    visible: false,
    id: NaN,
  });
  const [staffList, setStaffList] = useState([]);
  const [unstaffedTenants, setUnstaffedTenants] = useState([]);
  const [widgetData, setWidgetData] = useState([]);
  const [areStaffAssigned, setAreStaffAssigned] = useState(false);
  const [usersPending, setUsersPending] = useState([]);
  const history = useHistory();
  const userContext = useContext(UserContext);

  useMountEffect(() => {
    userContext.apiCall('get', '/tenants', {}, {})
      .then(({ data }) => {
        const unstaffed = data.tenants.filter(tenant => !tenant.staff);
        if(!unstaffed.length) return;

        setUnstaffedTenants(unstaffed);
        return userContext.apiCall('get', `/user?r=${RoleEnum.ADMIN}`, {}, {})
          .then(({ data }) => setStaffList(data.users));
      });

    userContext.apiCall('get', '/widgets', {}, {})
      .then(({ data }) => {
        // format open tickets data
        const newTickets = data.opentickets.new;
        const inProgressTickets = data.opentickets.inProgress;
        const openTicketsData = [[
          {
            "stat": newTickets.allNew.stat,
            "desc": "New"
          },
          {
            "stat": newTickets.unseen24Hrs.stat,
            "desc": "Unseen for > 24 hours"
          },

        ],
        [
          {
            "stat": inProgressTickets.allInProgress.stat,
            "desc": "New"
          },
          {
            "stat": inProgressTickets.inProgress1Week.stat,
            "desc": "Unseen for > 24 hours"
          },
        ]];

        var managersData = [];

        if (data.managers.length > 0) {
          managersData = [
            ...data.managers.map((manager) => [
              {
                "id": manager.id,
                "stat": manager.date,
                "desc": `${manager.firstName} ${manager.lastName}`,
                "subtext": manager.propertyName
              }
            ])
          ]
        }

        // no managers, no problem!
        else {
          managersData.push([{
            "id": "",
            "stat": "",
            "desc": "No new users",
            "subtext": "",
          }])
        }

        setWidgetData({ openTicketsData, managersData });
      });

    getPendingUsers();
  });

  const getPendingUsers = () => {
    userContext.apiCall('get', '/users/pending', {}, {})
      .then(({ data }) => setUsersPending(data.users));
  };

  const handleAddClick = (id) => {
    const path = '/request-access/' + id;
    history.push(path, usersPending.find(u => u.id === id));
  };

  const handleDeclineClick = (id) => {
    setModalActive({
      visible: true,
      id: id,
    });
  };

  const handleDenyAccess = async (doDeny) => {
    //Hide modal on button click
    setModalActive({ ...modalActive, visible: false });
    // If decline access request is confirmed, delete requesting user from the database

    if(doDeny) {
      const requestorId = modalActive.id;
      userContext.apiCall('delete', `/user/${requestorId}`, {}, { error: "There was an error processing your request. Please try again later" })
        .then(response => {
          getPendingUsers();
        });
    }
  };

  const handleStaffAssignmentChange = ({ target }, tenantId) => {
    const updatedTenants = unstaffedTenants.map(tenant => {
      if(tenant.id === tenantId) {
        tenant.staff = target.value;
        setAreStaffAssigned(true);
      }
      return tenant;
    });
    setUnstaffedTenants(updatedTenants);
  };

  const handleStaffAssignment = () => {
    if(!areStaffAssigned) return;

    const tenantUpdateReqs = unstaffedTenants
      .filter(({ staff }) => staff)
      .map(({ id, staff }) => userContext.apiCall('put', `/tenants/${id}`, { 'staffIDs': [staff] }, {}));

    axios.all(tenantUpdateReqs)
      .then(axios.spread((...responses) => {
        const stillUnstaffed = unstaffedTenants.filter(tenant => {
          const isTenantUnchanged = !(responses.find(({ data }) => data.id === tenant.id));
          return isTenantUnchanged;
        });
        setUnstaffedTenants(stillUnstaffed);
      }));
  };

  return (
    <>
      <div className='main-container'>
        <div>
          <h2 className="page-title">Admin Dashboard</h2>
          <div className="dashboard__modules_container">
            <DashboardModule
              title="Open Tickets"
              link="/manage/tickets"
              data={widgetData.openTicketsData}
            />
            <DashboardModule
              title="New Property Managers"
              link="/manage/managers"
              data={widgetData.managersData}
              isDate={true}
            />
          </div>
          <Collapsible
            title="New Staff Assignments"
            count={unstaffedTenants.length}
          >
            <div className="dashboard__assignments_container">
              {
                unstaffedTenants.map(tenant => (
                  <NewStaffItem key={tenant.id} {...tenant} handleStaffAssignmentChange={handleStaffAssignmentChange} staffList={staffList} />
                ))
              }
              <div className="dashboard__assignments_button_container">
                <button
                  className={`button is-primary is-rounded`}
                  disabled={!areStaffAssigned}
                  onClick={handleStaffAssignment}
                >
                  SAVE ASSIGNMENTS
                </button>
              </div>
            </div>
          </Collapsible>
          <Collapsible
            title="Request for Access"
            count={usersPending.length}
          >
            {
              usersPending.map((requestItemData, index) => {
                return (<RequestItem key={`requestItem--${index}`} data={requestItemData} onDeclineClick={handleDeclineClick} onAddClick={handleAddClick} />);
              })
            }
          </Collapsible>
        </div>

        {modalActive.visible && <Modal
          content={"Are you sure you want to decline access?"}
          hasButtons={true}
          confirmButtonHandler={() => handleDenyAccess(true)}
          cancelButtonHandler={() => handleDenyAccess(false)}
          confirmText="Yes"
          cancelText="No"
          closeHandler={() => setModalActive({ ...modalActive, visible: false })}
        />}
      </div>
    </>
  );
};
