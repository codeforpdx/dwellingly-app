import React, { Component } from 'react';
import Card from '../card/Card';
import { CARD_TYPES } from '../../constants/';
import Icon from '../icon/Icon';
import './TicketModal.scss';

export const TicketModal = (props) => {
    if(!props.show || !props.ticket) {
      return null;
    }
    const { assigned, issue, opened, sender,
      status, tenant, updated, urgency} = props.ticket;

    return (
      <div className="ticket-window-modal">
        <div className="ticket-modal-container">
          <Card types={[CARD_TYPES.TICKET]}>
            <Card.Top>
              <Card.Content>
                <div className="card__summary">
                  <div className="close-icon-container">
                    <button type="button" onClick={props.onClose}>
                      <Icon id="close-icon"  icon="close"/></button>
                  </div>
                  <div className="ticket-modal-title-container">
                    <Icon icon="comment"/>
                    <h3 id="ticket-modal-title" className="subtitle">{status.toUpperCase()}</h3>
                  </div>
                  <h5 id="ticket-modal-issue" className="meta">{issue}</h5>
                  <hr/>
                  <div>
                    <div style={{ float: "left" }}>
                      <div className="ticket-details-section">
                        <p className="ticket-detail-label">SENDER</p>
                        <p>{sender}</p>
                      </div>
                      <div className="ticket-details-section">
                        <p className="ticket-detail-label">TENANT</p>
                        <p>{tenant}</p>
                      </div>
                    </div>
                    <div className="ticket-details-section" style={{ float: "right", textAlign: "right" }}>
                      <div className="ticket-details-section">
                        <p className="ticket-detail-label">URGENCY</p>
                        <p>{urgency.toUpperCase()}</p>
                      </div>
                      <div className="ticket-details-section">
                        <p className="ticket-detail-label">SENT</p>
                        <p>{opened}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card.Top>
            <Card.Bottom>
              <Card.Content>
                <div className="reports-ticket-card">
                  <ul className="reports-ticket-card-list">
                    <li className="reports-ticket-card-issue-status">RESOLVED</li>
                    <li className="reports-ticket-card-tenant">Megan Collins</li>
                    <li className="reports-ticket-card-sender">Sender: Tara McKenzie</li>
                  </ul>
                  <p>03/12/18</p>
                </div>
              </Card.Content>
            </Card.Bottom>
          </Card>
        </div>
      </div>
    );
}