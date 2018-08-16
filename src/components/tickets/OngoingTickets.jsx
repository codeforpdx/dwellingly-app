import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Notes from '../notes/Notes';
import { CARD_TYPES } from '../../constants/constants';
import { formatDateFromString } from '../../utils';

function OngoingTickets({ match, tickets }) {
  return (
    <div>
      {tickets &&
        tickets.length > 0 &&
        tickets.map(
          ({ id, sent, sender, tenant, notes, issue, status, urgency }) => {
            const sentDate = formatDateFromString(sent);
            return (
              <Link key={id} to={`${match.url}/ongoing/${id}`}>
                <Card types={[CARD_TYPES.TICKET]}>
                  <Card.Top>
                    <Card.Content>
                      <div className="card__summary">
                        <time className="meta ptr" dateTime={sentDate}>
                          {sentDate}
                        </time>
                        {status && <p className="progress status">{status}</p>}
                        <p className="title">{tenant.name}</p>
                        <p className="meta">{issue}</p>
                      </div>
                    </Card.Content>
                  </Card.Top>
                  <Card.Bottom>
                    <Card.Content>
                      <div className="card__contact container">
                        <div className="container--left">
                          <h4>Sender</h4>
                          <p>{sender.name}</p>
                        </div>
                        {urgency && (
                          <div className="container--right">
                            <h4>Urgency</h4>
                            <p
                              className={`status status--${urgency.toLowerCase()}`}>
                              {urgency}
                            </p>
                          </div>
                        )}
                      </div>
                      <Notes summary notes={notes} />
                    </Card.Content>
                  </Card.Bottom>
                </Card>
              </Link>
            );
          }
        )}
      {!tickets ||
        (tickets.length === 0 && (
          <div>
            <p>Empty state goes here...</p>
          </div>
        ))}
    </div>
  );
}

OngoingTickets.propTypes = {
  match: PropTypes.shape({}).isRequired,
  tickets: PropTypes.arrayOf(PropTypes.shape({}))
};

OngoingTickets.defaultProps = {
  tickets: []
};

export default OngoingTickets;
