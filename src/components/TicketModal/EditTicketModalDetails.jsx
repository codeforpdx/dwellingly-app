import React, { useState, useEffect, useContext } from 'react';
import "./TicketModal.scss";
import SearchableDropDown from "../../components/SearchableDropDown/SearchableDropDown";
import { fetchAllTenants } from './EditTicketModalFetches';
import UserContext from '../../UserContext';


export default function TicketModalDetails({ ticket, handleIsEditing, handleSubmit }) {
  const { created_at, author, assigned_staff } = ticket;
  const userContext = useContext(UserContext);

  const [tenant, setTenant] = useState(ticket.tenant);
  const [assigned, setAssigned] = useState(ticket.assigned);
  const [urgency, setUrgency] = useState(ticket.urgency);
  const [tenantArray, setTenantArray] = useState([]);
  const [managerArray, setManagerArray] = useState([]);

  useEffect(() => {
    const { user } = userContext;

    fetchAllTenants(user)
      .then(tArray => setTenantArray(tArray));

    fetchAllManagers(user)
      .then(mArray => setManagerArray(mArray));

  }, [])

  const handleCancel = () => {
    handleIsEditing(false);
  }

  const handleSave = () => {
    let data = {};
    if (tenant !== ticket.tenant) data.tenant_id = tenant;
    if (urgency !== ticket.urgency) data.urgency = urgency;
    if (author !== ticket.author) data.author_id = author;
    handleSubmit(data);
  }


  return (
    <div>
      <div className="ticket-details-left">
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
      <div className="ticket-details-right">
        <div className="ticket-details-section">
          <p className="ticket-detail-label">URGENCY</p>
          <select
            id="urgency"
            value={urgency}
            onChange={({ target }) => setUrgency(target.value)}>
            <option value="Low">LOW</option>
            <option value="Medium">MEDIUM</option>
            <option value="High">HIGH</option>
          </select>
        </div>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">SENT</p>
          <p>{created_at}</p>
        </div>
        <div className="ticket-details-save">
          <button
            className="button is-secondary is-rounded ml-4 is-small"
            onClick={handleCancel}>
            Cancel
        </button>
          <button
            className="button is-primary is-rounded ml-4 is-small"
            onClick={handleSave}>
            SAVE
        </button>
        </div>
      </div>
    </div >
  )
}