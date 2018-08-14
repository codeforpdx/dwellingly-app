import React from 'react';
import PropTypes from 'prop-types';
import { formatPhoneNumber } from '../../utils';

function ContactsList({ items }) {
  return (
    <div className="list-group list-group--contacts-list">
      {items &&
        items.length > 0 &&
        items.map(item => {
          const { id, title, number01, number02 } = item;
          return (
            <div
              key={id}
              className="list-group__item list-group__item--contact">
              <p>{title}</p>
              <p className="list-group__contact-numbers">
                {number01 && (
                  <a
                    key={number01}
                    className="list-group__contact-number"
                    href={formatPhoneNumber(number01)}>
                    {number01}
                  </a>
                )}
                {number02 && (
                  <a
                    key={number02}
                    className="list-group__contact-number"
                    href={formatPhoneNumber(number02)}>
                    {number02}
                  </a>
                )}
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
