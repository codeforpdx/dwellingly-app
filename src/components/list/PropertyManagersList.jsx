import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PropertyManagersList({ url, items }) {
  return (
    <div className="list-group">
      {items &&
        items.length > 0 &&
        items.map(item => {
          const { id, name, tickets, tenants } = item;
          return (
            <Link
              key={id}
              to={`${url}/${id}`}
              className="list-group__item list-group__item--basic">
              <div className="contact-group contact-group--basic">
                <h3 className="title">{name}</h3>
                <p>
                  {`${tenants.length} ${
                    tenants.length === 1 ? 'Tenant' : 'Tenants'
                  }`}{' '}
                  |{' '}
                  {`${tickets.length} ${
                    tickets.length === 1 ? 'Ticket' : 'Tickets'
                  }`}
                </p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

PropertyManagersList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  url: PropTypes.string.isRequired
};

PropertyManagersList.defaultProps = {
  items: []
};

export default PropertyManagersList;
