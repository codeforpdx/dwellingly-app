import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';
import { UserContext } from '../App';
import { MODULE_DATA, ACCESS_REQUEST_DATA } from '../components/DashboardModule/data';
import DashboardModule from '../components/DashboardModule';
import Collapsible from '../components/Collapsible';
import RequestItem from '../components/RequestItem';
import NewStaffItem from '../components/NewStaffItem';

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

export const Dashboard = (props) => {
    const [modalActive, setModalActive] = useState(false);
    const [staffList, setStaffList] = useState([]);
    const [unstaffedTenants, setUnstaffedTenants] = useState([]);
    const [areStaffAssigned, setAreStaffAssigned] = useState(false);
    const history = useHistory();
    const session = useContext(UserContext);

    useEffect(() => {
      axios
          .get(`${process.env.REACT_APP_API_URL}/tenants`, makeAuthHeaders(session))
          .then(({ data }) => {
              const unstaffed = data.tenants.filter(tenant => !tenant.staff);
              setUnstaffedTenants(unstaffed);
          })
          .catch((error) => {
              alert(error);
              console.log(error);
          })
      const data = { "userrole": "admin" };
      axios
          .post(`${process.env.REACT_APP_API_URL}/users/role`, data, makeAuthHeaders(session))
          .then(({ data }) => {
              setStaffList(data.users);
            })
          .catch((error) => {
              alert(error);
              console.log(error);
          })
    }, [session]);

    const handleAddClick = (id) => {
        const path = '/request-access/' + id;
        history.push(path);
    }

    const handleDeclineClick = (id) => {
        //console.log('decline',id);
        setModalActive(true);
    }

    const handleDenyAccess = (doDeny) => {
        setModalActive(false);
        if (doDeny) {
            console.log('handle deny access');
            //TODO: handle deny access
        }
    }

    const handleStaffAssignmentChange = ({ target }, tenantId) => {
        const updatedTenants = unstaffedTenants.map(tenant => {
            if(tenant.id === tenantId) {
                tenant.staff = target.value;
                setAreStaffAssigned(true);
            }
            return tenant
        });
        setUnstaffedTenants(updatedTenants);
    }

    const handleStaffAssignment = () => {
        if(!areStaffAssigned) return;

        const tenantUpdateReqs = unstaffedTenants
            .filter(({ staff }) => staff)
            .map(({ id, staff }) => axios
            .put(
                `${process.env.REACT_APP_API_URL}/tenants/${id}`, 
                { 'staffIDs': [staff] }, 
                makeAuthHeaders(session)
            ));

        axios.all(tenantUpdateReqs)
            .then(axios.spread((...responses) => {
                const updatedTenants = unstaffedTenants.filter(tenant => {
                    const isTenantUpdated = responses.find(({ data }) => data.id === tenant.id);
                    // using filter to keep non-updated tenants, so negate the result
                    return !isTenantUpdated;
                });
                setUnstaffedTenants(updatedTenants);
            }))
            .catch((errors) => {
                alert(errors);
                console.log(errors);
            });
    }

    return (
        <>
            <div className="dashboard__container">
                <div className="dashboard__main_container">
                    <div className="dashboard__main">
                        <h2 className="page-title">Admin Dashboard</h2>
                        <div className="dashboard__modules_container">
                            <DashboardModule
                                data={MODULE_DATA.openTickets}
                            />
                            <DashboardModule
                                data={MODULE_DATA.reports}
                            />
                            <DashboardModule
                                data={MODULE_DATA.managers}
                            />
                        </div>
                        <Collapsible
                            title="New Staff Assignments"
                            count={unstaffedTenants.length}
                        >
                            <div className="dashboard__assignments_container">
                                {
                                    unstaffedTenants.map(tenant => (
                                        <NewStaffItem key={tenant.id} { ...tenant } handleStaffAssignmentChange={handleStaffAssignmentChange} staffList={staffList} />
                                    ))
                                }
                                <div className="dashboard__assignments_button_container">
                                    <button 
                                        className={`${areStaffAssigned && 'active'} dashboard__save_assignments_button button is-rounded`}
                                        onClick={handleStaffAssignment}
                                    >
                                        SAVE ASSIGNMENTS
                                    </button>
                                </div>
                            </div>
                        </Collapsible>
                        <Collapsible
                            title="Request for Access"
                            count={ACCESS_REQUEST_DATA.length}
                        >
                            {
                                ACCESS_REQUEST_DATA.map((requestItemData, index) => {
                                    return (<RequestItem key={`requestItem--${index}`} data={requestItemData} onDeclineClick={handleDeclineClick} onAddClick={handleAddClick} />);
                                })
                            }
                        </Collapsible>
                    </div>  
                </div>
            </div>
            <div className={`modal ${modalActive && 'is-active'}`}>
                <div className="modal-background" onClick={() => { handleDenyAccess(false) }}></div>
                <div className="modal-content">
                    <div className="modal__message_container">
                        <div className="modal__message">
                            <h4>Are you sure you want to decline access?</h4>
                        </div>
                        <div className="modal__button_container">
                            <button className="button is-primary is-rounded" onClick={() => { handleDenyAccess(true) }}>YES</button>
                            <button className="button is-dark is-rounded" onClick={() => { handleDenyAccess(false) }}>NO</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}