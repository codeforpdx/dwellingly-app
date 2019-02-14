import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import { CARD_TYPES } from '../../constants/constants';
import './ReportsTicketModal.scss';

class ReportsTicketModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <Card types={[CARD_TYPES.TICKET]}>
        <Card.Top>
          <Card.Content>
            <div className="card__summary">
              <time className="meta ptr">
                timetag
              </time>
              <p className="progress status">ptag</p>
              <p className="title">ptag</p>
              <p className="meta">ptag</p>
              </div>
            </Card.Content>
          </Card.Top>
          <Card.Bottom>
            <Card.Content>
              <div className="card__contact container">
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
    );
  }
}

ReportsTicketModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default ReportsTicketModal;
