import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../icon/Icon';
import { formatDateFromString } from '../../utils';

function TicketsList({ items }) {
  return (
    <div className="list-group">
      {items &&
        items.length > 0 &&
        items.map(item => {
          const {
            id,
            issue,
            tenant,
            sender,
            dateCreated,
            status,
            urgency,
            flagged
          } = item;
          const sentDate = formatDateFromString(dateCreated);
          let { property } = tenant;
          if (typeof property !== 'string') {
            property = `${property.addressOne} ${property.addressTwo}`;
          }

          return (
            <Link key={id} to={`tickets/${id}`} className="list-group__item">
              <div className="contact-group ">
                {status &&
                  urgency && (
                    <div
                      className={`contact-group__status contact-group__status--${urgency.toLowerCase()}`}
                    />
                  )}
                <h3 className="contact-group__name">{`${tenant.firstName} ${
                  tenant.lastName
                }`}</h3>
                <p className="contact-group__title title">
                  {issue !== 'Compliment' &&
                    issue !== 'Resolved' && <Icon icon="comment" />}
                  {issue === 'Compliment' && <Icon icon="heart" />}
                  {issue}
                </p>
                <p>
                  {property}
                  {tenant.lease &&
                    tenant.lease.unit &&
                    `, ${tenant.lease.unit}`}
                </p>
                {sender && (
                  <p>Sender: {`${sender.firstName} ${sender.lastName}`}</p>
                )}

                <div className="contact-group__meta ptr">
                  <time className="meta" dateTime={sentDate}>
                    {sentDate}
                  </time>
                  {/* status && <p className="status progress">{status}</p> */}
                </div>

                {Boolean(flagged) && (
                  <div className="contact-group__flag pbr">
                    <Icon icon="flag" />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      {items.length === 0 && (
        <div className="list-group__item list-group__item--empty">
          <p>Empty state goes here...</p>
        </div>
      )}
    </div>
  );
}

TicketsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      issue: PropTypes.string,
      tenant: PropTypes.shape({}),
      sender: PropTypes.shape({}),
      sent: PropTypes.string,
      status: PropTypes.string,
      urgency: PropTypes.string,
      flagged: PropTypes.string
    })
  )
};

TicketsList.defaultProps = {
  items: []
};

export default TicketsList;
