import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import { CARD_TYPES } from '../../constants/constants';
import Icon from '../icon/Icon';
import './ReportsTicketModal.scss';

class ReportsTicketModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="reports-window-modal">
        <div className="reports-modal-container">
          <Card types={[CARD_TYPES.TICKET]}>
            <Card.Top>
              <Card.Content id="reports-modal-card-content">
                <div className="card__summary">
                  <div className="close-icon-container">
                    <Icon id="close-icon" onClose={this.props.onClose} icon="close" />
                  </div>
                  <div className="reports-modal-title-container">
                    <Icon icon="comment"/>
                    <p id="reports-modal-title" className="title">10 Property Damage</p>
                  </div>
                  <p id="reports-modal-subtitle" className="meta">There were 10 Property Damage tickets opened from 01/01/2018 - 12/31/2018</p>
                </div>
              </Card.Content>
            </Card.Top>
            <Card.Bottom>
              <Card.Content>
                <div id="scroll-container" className="card__contact container">
                  <div className="container--left">
                    <h4>Sender</h4>
                    <p>ptag</p>
                  </div>
                  <div className="container--right">
                    <h4>Urgency</h4>
                    <p>
                      ptag
                    </p>
                  </div>
                </div>
              </Card.Content>
            </Card.Bottom>
          </Card>
        </div>
      </div>
    );
  }
}

ReportsTicketModal.propTypes = {
  // onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  // children: PropTypes.node.isRequired
};

export default ReportsTicketModal;
