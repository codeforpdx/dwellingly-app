import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import { CARD_TYPES } from '../../constants/';
import Icon from '../icon/Icon';
import './TicketModal.scss';

class TicketModal extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="ticket-window-modal">
        <div className="ticket-modal-container">
          <Card types={[CARD_TYPES.TICKET]}>
            <Card.Top>
              <Card.Content id="ticket-modal-card-content">
                <div className="card__summary">
                  <div className="close-icon-container">
                    <button type="button" onClick={this.props.onClose}>
                      <Icon id="close-icon"  icon="close"/></button>
                  </div>
                  <div className="ticket-modal-title-container">
                    <Icon icon="comment"/>
                    <h3 id="ticket-modal-title" className="title">10 Property Damage</h3>
                  </div>
                  <h5 id="ticket-modal-subtitle" className="meta">There were 10 Property Damage tickets opened from 01/01/2018 - 12/31/2018</h5>
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
}

export default TicketModal