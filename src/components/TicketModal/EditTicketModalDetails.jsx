import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../UserContext';
import Toast from '../../utils/toast';
import "./TicketModal.scss";
import SearchableDropDown from "../../components/SearchableDropDown/SearchableDropDown"
import { updateTicket, fetchAllTenants, fetchAllManagers } from './EditTicketModalFetches';

export default function TicketModalDetails({ ticket, handleEditDetails, getTickets, updateSelectedTicket }) {
  const { created_at, sender } = ticket;
  const userContext = useContext(UserContext);

  const [tenant, setTenant] = useState(ticket.tenant);
  const [assigned, setAssigned] = useState(ticket.assigned);
  const [urgency, setUrgency] = useState(ticket.urgency.toUpperCase());
  const [tenantArray, setTenantArray] = useState([]);
  const [managerArray, setManagerArray] = useState([]);

  useEffect(() => {
    const { user } = userContext;

    fetchAllTenants(user)
      .then(tArray => setTenantArray(tArray));

    fetchAllManagers(user)
      .then(mArray => setManagerArray(mArray));

  }, [])


  const handleSubmit = () => {
    let update = {};
    if (tenant !== ticket.tenant) update.tenantID = tenant;
    if (assigned !== ticket.assigned) update.assignedUserID = assigned;
    if (urgency !== ticket.urgency) update.urgency = urgency;
    if (sender !== ticket.sender) update.senderID = sender;

    if (update !== {}) {
      updateTicket(userContext.user, update, ticket.id)
        .then(data => {
          updateSelectedTicket(data)
          getTickets(userContext);
          Toast("Ticket updated successfully", "success")
        })
        .catch((error) => {
          Toast(error.message, "error");
          console.log(error)
        })
    }

    handleEditDetails();
  }


  return (
    <div>
      <div style={{ float: "left" }}>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">SENDER</p>
          <p>{sender}</p>
        </div>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">TENANT</p>
          <SearchableDropDown
            value={tenant}
            onChange={setTenant}
            array={tenantArray}
          />
        </div>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">ASSIGNEE</p>
          <SearchableDropDown
            value={assigned}
            onChange={setAssigned}
            array={managerArray}
          />
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
        <div className="ticket-details-save">
          <button
            className="button is-primary is-rounded ml-4 is-small"
            onClick={() => handleSubmit()}>
            SAVE
        </button>
        </div>
      </div>
    </div >
  )
}