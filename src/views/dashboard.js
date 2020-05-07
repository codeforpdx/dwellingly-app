import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dwellinglylogo from '../assets/images/dwellingly_logo_white.png';
import { MODULE_DATA } from '../components/DashboardModule/data';
import DashboardModule from '../components/DashboardModule';
import Collapsible from '../components/Collapsible';
import RequestItem from '../components/RequestItem';
import axios from 'axios';
import UserContext from '../UserContext';

export const Dashboard = (props) => {
    const [modalActive, setModalActive] = useState(false);
    const [areStaffAssigned, setAreStaffAssigned] = useState(false);
    const [usersPending, setUsersPending] = useState([]);
    const [declinedUserId, setDeclinedUserId] = useState("");
    const [userPendingRequestCount, setUserPendingRequestCount] = useState(0);
    const history = useHistory();
    const userContext = useContext(UserContext);

    useEffect(() => {
        axios.post(
            "/users/role",
            { userrole: "pending" },
            { headers: { "Authorization": `Bearer ${userContext.user.accessJwt}` } })
            .then(res => {
                setUsersPending(res.data.users);
            });
    }, [userPendingRequestCount]);

    const handleAddClick = (id) => {
        const path = '/request-access/' + id;
        history.push(path, usersPending.find(u => u.id === id));
    };

    const handleDeclineClick = (id) => {
        setDeclinedUserId(id);
        setModalActive(true);
    };

    const handleDenyAccess = (doDeny) => {
        setModalActive(false);
        if (doDeny) {
            axios.delete(
            `/user/${declinedUserId}`,
            { headers: { "Authorization": `Bearer ${userContext.user.accessJwt}` } })
            .then(res => {
                setUserPendingRequestCount(c => c + 1);
            }).catch(error => {
                alert(error); // TODO: Proper error handling
            });
        }
    };

    const handleStaffAssignmentChange = () => {
        setAreStaffAssigned(true);
        //TODO: should handle which dropdowns are selected and check to make sure that not all values are none, in which case this state should be set to false
    };

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
                            count="3"
                        >
                            <div className="dashboard__assignments_container">
                                <div className="collapsible__row columns">
                                    <div className="collapsible__col column">Tenant Name</div>
                                    <div className="collapsible__col column">
                                        Meerkat Manner<br />
                                        <span className="subtext">Property Manager Name</span>
                                    </div>
                                    <div className="dashboard__colapsible_col column">
                                        <div className="select is-rounded">
                                            <select
                                                onChange={handleStaffAssignmentChange}
                                            >
                                                <option>None</option>
                                                <option>Staff Name</option>
                                                <option>Staff Name 2</option>
                                                <option>Staff Name 3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapsible__row columns">
                                    <div className="collapsible__col column">Tenant Name</div>
                                    <div className="collapsible__col column">
                                        Meerkat Manner<br />
                                        <span className="subtext">Property Manager Name</span>
                                    </div>
                                    <div className="dashboard__colapsible_col column">
                                        <div className="select is-rounded">
                                            <select>
                                                <option>None</option>
                                                <option>Staff Name</option>
                                                <option>Staff Name 2</option>
                                                <option>Staff Name 3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard__assignments_button_container">
                                    <button className={`${areStaffAssigned && 'active'} dashboard__save_assignments_button button is-rounded`}>SAVE ASSIGNMENTS</button>
                                </div>
                            </div>
                        </Collapsible>
                        <Collapsible
                            title="Request for Access"
                        >
                            {
                                usersPending.map((requestItemData, index) => {
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