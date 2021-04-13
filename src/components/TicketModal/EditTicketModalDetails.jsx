import React, { useState, useEffect, useContext } from 'react';
import * as axios from 'axios';
import UserContext from '../../UserContext';
import Toast from '../../utils/toast';
import RoleEnum from '../../Enums/RoleEnum';
import "./TicketModal.scss";

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

export default function TicketModalDetails({ ticket, handleEditDetails, getTickets, updateSelectedTicket }) {
  const { created_at } = ticket;
  const userContext = useContext(UserContext);


  const [sender, setSender] = useState(ticket.sender);
  const [tenant, setTenant] = useState(ticket.tenant);
  const [assigned, setAssigned] = useState(ticket.assigned);
  const [urgency, setUrgency] = useState(ticket.urgency.toUpperCase());
  const [tenantArray, setTenantArray] = useState([]);
  // const [userArray, setUserArray] = useState([]);
  const [managerArray, setManagerArray] = useState([]);

  const fetchAllTenants = () => {
    axios
      .get(`/api/tenants`, {}, makeAuthHeaders(userContext))
      .then(({ data }) => {
        const filteredTenants = data.tenants.filter(tenant => !tenant.archived)
        setTenantArray(filteredTenants)
      })
      .catch((error) => {
        Toast(error.message, "error");
      });
  }

  const fetchAllManagers = () => {
    axios
      .get(`/api/user?r=${RoleEnum.PROPERTY_MANAGER}`, {}, makeAuthHeaders(userContext))
      .then(({ data }) => {
        console.log(data.users)
        setManagerArray(data.users)
      })
      .catch((error) => {
        Toast(error.message, "error");
      });
  }

  // const fetchAllUsers = () => {
  //   axios
  //     .get(`/api/users`, {}, makeAuthHeaders(userContext))
  //     .then(({ data }) => {
  //       data.users ?
  //         setUserArray(data.users)
  //         : setTenantArray([])
  //     })
  //     .catch((error) => {
  //       Toast(error.message, "error");
  //     });
  // }

  useEffect(() => {
    fetchAllTenants();
    fetchAllManagers();
    // fetchAllUsers();

  }, [])

  const handleSubmit = () => {

    handleEditDetails();
    let update = {};
    if (tenant !== ticket.tenant) update.tenantID = tenant;
    if (assigned !== ticket.assigned) update.assignedUserID = assigned;
    if (urgency !== ticket.urgency) update.urgency = urgency;

    if (update !== {}) {
      axios.put(`/api/tickets/${ticket.id}`, update, makeAuthHeaders(userContext))
        .then(({ data }) => {
          updateSelectedTicket(data)

          getTickets(userContext);
        })
        .catch((error) => {
          Toast(error.message, "error");
          console.log(error)
        })
    }
  }



  return (
    <div>
      <div style={{ float: "left" }}>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">SENDER</p>
          <p>{sender}</p>
          {/* <select
            id="sender"
            value={sender}
            onChange={(event) => setSender(event.target.value)}
          >
            {userArray ? userArray.map(user => {
              return <option value={user.id}>{`${user.firstName} ${user.lastName}`}</option>
            }) : null
            }
          </select> */}
        </div>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">TENANT</p>
          <select
            id="tenant"
            value={tenant}
            onChange={({ target }) => setTenant(target.value)}
          >
            {tenantArray ? tenantArray.map(tenant => (
              <option
                key={`tenant_${tenant.id}`}
                value={tenant.id}>
                {`${tenant.firstName} ${tenant.lastName}`}
              </option>
            )) : null
            }
          </select>
        </div>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">ASSIGNEE</p>
          <select
            id="assigned"
            value={assigned}
            onChange={({ target }) => setAssigned(target.value)}
          >
            {managerArray ? managerArray.map(manager => (
              <option
                key={`manager_${manager.id}`}
                value={manager.id}>
                {`${manager.firstName} ${manager.lastName}`}
              </option>
            )) : null
            }
          </select>
        </div>
      </div>
      <div
        className="ticket-details-section"
        style={{ float: "right", textAlign: "right" }}
      >
        <div className="ticket-details-section">
          <p className="ticket-detail-label">URGENCY</p>
          <select
            id="urgency"
            value={urgency}
            onChange={({ target }) => setUrgency(target.value)}>
            <option value="LOW">LOW</option>
            <option value="MED">MED</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">SENT</p>
          <p>{created_at}</p>
        </div>
        <button
          className="button is-primary is-rounded ml-4 is-small"
          onClick={() => handleSubmit()}>
          SAVE
        </button>
      </div>
    </div >
  )
}