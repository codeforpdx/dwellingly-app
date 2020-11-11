import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../UserContext';
import useMountEffect from '../../utils/useMountEffect';
import Toast from "../../utils/toast"
import DashboardModule from '../../components/DashboardModule';
import Collapsible from '../../components/Collapsible';
import Modal from '../../components/Modal';
import RequestItem from '../../components/RequestItem';
import NewStaffItem from '../../components/NewStaffItem';
import RoleEnum from '../../Enums/RoleEnum';

import './dashboard.scss'

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

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
        axios
            .get("/api/tenants", makeAuthHeaders(userContext))
            .then(({ data }) => {
                const unstaffed = data.tenants.filter(tenant => !tenant.staff);
                if (!unstaffed.length) return;

                setUnstaffedTenants(unstaffed);
                const adminUsersObj = { "userrole": RoleEnum.ADMIN };
                return axios
                    .post("/api/users/role", adminUsersObj, makeAuthHeaders(userContext))
                    .then(({ data }) => setStaffList(data.users));
            })
            .catch(error => Toast(error, "error"));

        axios
            .get("/api/widgets", makeAuthHeaders(userContext))
            .then(({ data }) => {
                setWidgetData(data);
            })
            .catch(error => Toast(error, "error"));

        getPendingUsers();
    });

    const getPendingUsers = async () => {
        await axios
            .post("/api/users/role", { "userrole": RoleEnum.PENDING }, makeAuthHeaders(userContext))
            .then(({ data }) => setUsersPending(data.users))
            .catch(error => Toast(error, "error"));
    }

    const handleAddClick = (id) => {
        const path = '/request-access/' + id;
        history.push(path, usersPending.find(u => u.id === id));
    }

    const handleDeclineClick = (id) => {
        setModalActive({
            visible: true,
            id: id,
        });
    }

    const handleDenyAccess = async (doDeny) => {

        //Hide modal on button click
        setModalActive({ ...modalActive, visible: false });

        try {
            // If decline access request is confirmed, delete requesting user from the database 
            if (doDeny) {
                const requestorId = modalActive.id;
                axios.delete(`/api/user/${requestorId}`, makeAuthHeaders(userContext))
                    .then(response => {
                        getPendingUsers();
                    });

            }
        }
        catch(err){
            Toast("There was an error processing your request. Please try again later", "error");
        }
    }

    const handleStaffAssignmentChange = ({ target }, tenantId) => {
        const updatedTenants = unstaffedTenants.map(tenant => {
            if (tenant.id === tenantId) {
                tenant.staff = target.value;
                setAreStaffAssigned(true);
            }
            return tenant
        });
        setUnstaffedTenants(updatedTenants);
    }

    const handleStaffAssignment = () => {
        if (!areStaffAssigned) return;

        const tenantUpdateReqs = unstaffedTenants
            .filter(({ staff }) => staff)
            .map(({ id, staff }) => axios
                .put(
                    `/api/tenants/${id}`,
                    { 'staffIDs': [staff] },
                    makeAuthHeaders(userContext)
                ));

        axios.all(tenantUpdateReqs)
            .then(axios.spread((...responses) => {
                const stillUnstaffed = unstaffedTenants.filter(tenant => {
                    const isTenantUnchanged = !(responses.find(({ data }) => data.id === tenant.id));
                    return isTenantUnchanged;
                });
                setUnstaffedTenants(stillUnstaffed);
            }))
            .catch(errors => Toast(errors, "error"));
    }

    return (
        <>
            <div>
                <h2 className="page-title">Admin Dashboard</h2>
                <div className="dashboard__modules_container">
                    <DashboardModule
                        data={widgetData.opentickets}
                    />
                    <DashboardModule
                        data={widgetData.reports}
                    />
                    <DashboardModule
                        data={widgetData.managers}
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
                contentText={"Are you sure you want to decline access?"}
                hasButtons={true}
                yesButtonHandler={() => handleDenyAccess(true)}
                noButtonHandler={() => handleDenyAccess(false)}
                closeHandler={() => setModalActive({ ...modalActive, visible: false })}
            />}
        </>
    )
}
