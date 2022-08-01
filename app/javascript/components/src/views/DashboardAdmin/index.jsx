import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import useMountEffect from '../../utils/useMountEffect';
import DashboardModule from './components/DashboardModule';
import Collapsible from '../components/Collapsible';
import Modal from '../components/Modal';
import RequestItem from './components/RequestItem';
import NewStaffItem from './components/NewStaffItem';
import axios from 'axios';

import './styles/index.scss';

export const DashboardAdmin = (props) => {
  const [modalActive, setModalActive] = useState({
    visible: false,
    id: NaN,
  });
  const [staffList, setStaffList] = useState([]);
  const [unstaffedTenants, setUnstaffedTenants] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [areStaffAssigned, setAreStaffAssigned] = useState(false);
  const [usersPending, setUsersPending] = useState([]);
  const history = useHistory();
  const userContext = useContext(UserContext);

  useMountEffect(() => {
    userContext.apiCall('get', '/dashboard', {}, {})
      .then(({ data }) => {
        const tickets = formatTickets(data.tickets)
        const propertyManagers = formatPropertyManagers(data.managers)

        setDashboard({ tickets, propertyManagers })
        setUsersPending(data.pending_users)
        setStaffList(data.staff)
        setUnstaffedTenants(data.tenants)
      });
  });

  // Not sure if this is needed. But you can re-request all unstaffed tenants with one call.
  const getUnstaffedTenants = () => {
    userContext.apiCall('get', '/tenants?unstaffed=unstaffed', {}, {})
      .then(({ data }) => setUnstaffedTenants(data.tenants))
  }

  const getPendingUsers = () => {
    userContext.apiCall('get', '/unauthorized_users', {}, {})
      .then(({ data }) => setUsersPending(data))
  }

  const formatTickets = (tickets) => {
    return [
      {
        "id": 0,
        "stat": tickets.new.total_count,
        "desc": "New",
        "subtextStat": tickets.new.latent_count,
        "subtext": "Unseen for >24 hours"
      },
      {
        "id": 1,
        "stat": tickets.in_progress.total_count,
        "desc": "In Progress",
        "subtextStat": tickets.in_progress.latent_count,
        "subtext": "Still in progress for >1 week"
      },
    ]
  }

  const formatPropertyManagers = managers => {
    let propertyManagers = []

    managers.forEach( (manager) => {
      propertyManagers.push({
        "id": manager.id,
        "stat": manager.date,
        "desc": `${manager.first_name} ${manager.last_name}`,
        "subtext": manager.property_name
      })
    })

    if (propertyManagers.length === 0) {
      propertyManagers.push({
        "id": 0,
        "stat": "",
        "desc": "No new users",
        "subtext": "",
      })
    }
    return propertyManagers
  }

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
      userContext.apiCall('delete', `/unauthorized_users/${requestorId}`, {}, { error: "There was an error processing your request. Please try again later" })
        .then(response => {
          getPendingUsers();
        });
    }
  };

  const handleStaffAssignmentChange = ({ target }, tenantId) => {
    const updatedTenants = unstaffedTenants.map(tenant => {
      if(tenant.id === tenantId) {
        tenant.staff_ids = [target.value];
        setAreStaffAssigned(true);
      }
      return tenant;
    });
    setUnstaffedTenants(updatedTenants);
  };

  const handleStaffAssignment = () => {
    if(!areStaffAssigned) return;

    const tenantUpdateReqs = unstaffedTenants
      .filter(({ staff_ids }) => staff_ids)
      .map(tenant => userContext.apiCall(
        'put',
        `/tenants/${tenant.id}`,
        tenant,
        { success: "Update successful!" }
      ));

    axios.all(tenantUpdateReqs)
      .then(axios.spread((...responses) => {
        const stillUnstaffed = unstaffedTenants.filter(tenant => {
          const isTenantUnchanged = !(responses.find(({ data }) => data.id === tenant.id));
          return isTenantUnchanged;
        });
        setUnstaffedTenants(stillUnstaffed);
      }));
  }

  return (
    <>
      <div className='main-container'>
        <div>
          <h2 className="page-title">Admin Dashboard</h2>
          <div className="dashboard__modules_container">
            <DashboardModule
              title="Open Tickets"
              link="/manage/tickets"
              data={dashboard.tickets}
            />
            <DashboardModule
              title="New Property Managers"
              link="/manage/managers"
              data={dashboard.propertyManagers}
            />
          </div>
          <Collapsible
            title="New Staff Assignments"
            count={unstaffedTenants.length}
          >
            <div>
              {
                unstaffedTenants.slice(0, 5).map(tenant => (
                  <NewStaffItem
                    key={tenant.id}
                    tenant={tenant}
                    handleStaffAssignmentChange={handleStaffAssignmentChange}
                    staffList={staffList}
                  />
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
          titleText={"Are you sure you want to decline access?"}
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
