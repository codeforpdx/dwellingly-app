import React from 'react';
import PropTypes from 'prop-types';
import { formatPhoneNumber } from '../../utils';

function ContactsList({ items }) {
  return (
    <div className="list-group list-group--contacts-list">
      {items &&
        items.length > 0 &&
        items.map(item => {
          const { id, name, numbers } = item;
          return (
            <div
              key={id}
              className="list-group__item list-group__item--contact">
              <p>{name}</p>
              <p className="list-group__contact-numbers">
                {numbers.map(number => (
                  <a
                    key={number}
                    className="list-group__contact-number"
                    href={formatPhoneNumber(number)}>
                    {number}
                  </a>
                ))}
              </p>
            </div>
          );
        })}
    </div>
  );
}

ContactsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({}))
};

ContactsList.defaultProps = {
  items: []
};

export default ContactsList;
