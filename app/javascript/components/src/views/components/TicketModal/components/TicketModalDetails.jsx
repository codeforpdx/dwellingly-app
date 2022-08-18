import React from 'react';

export default function TicketModalDetails({ ticket }) {
  const { author, tenant, assigned_staff, urgency, created_at } = ticket;
  const assignees = assigned_staff.map(as => `${as.firstName} ${as.lastName}`).join(', ');

  return (
    <div>
      <div className="ticket-details-left">
        <div className="ticket-details-section">
          <p className="ticket-detail-label">AUTHOR</p>
          <p>{author}</p>
        </div>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">TENANT</p>
          <p>{tenant}</p>
        </div>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">ASSIGNEE</p>
          <p>{assignees}</p>
        </div>
      </div>
      <div
        className="ticket-details-right">
        <div className="ticket-details-section">
          <p className="ticket-detail-label">URGENCY</p>
          <p>{urgency.toUpperCase()}</p>
        </div>
        <div className="ticket-details-section">
          <p className="ticket-detail-label">SENT</p>
          <p>{created_at}</p>
        </div>
      </div>
    </div>
  )
}
