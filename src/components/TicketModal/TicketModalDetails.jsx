import React from 'react';
import "./TicketModal.scss";

export default function TicketModalDetails({ ticket }) {
  const { author, tenant, assigned, urgency, created_at } = ticket;

  return (
    <div>
      <div style={{ float: "left" }}>
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
          <p>{assigned}</p>
        </div>
      </div>
      <div
        className="ticket-details-section"
        style={{ float: "right", textAlign: "right" }}
      >
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