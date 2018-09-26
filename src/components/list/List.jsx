import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ContactsList from './ContactsList';
import TicketsList from './TicketsList';
import { formatPhoneNumber } from '../../utils';

import './List.scss';

function List({ url, items, className, showStaff, showNumber, history }) {
  return (
    <div className={`list-group ${className}`}>
      {items &&
        items.length > 0 &&
        items.map(item => {
          const { id, name, address, phone, ticketsStatus, staff } = item;
          // have to "cheat" here and use a button instead of link because of nested <a> tags (phone number)
          const ElementNodeName = url ? 'button' : 'div';
          const urlPath =
            url.indexOf(':id') !== -1 ? url.replace(':id', id) : `${url}/${id}`;
          return (
            <ElementNodeName
              key={id}
              onClick={() => (url ? history.push(urlPath) : null)}
              className="list-group__item list-group__item--basic">
              <div className="contact-group contact-group--basic">
                {ticketsStatus && (
                  <div
                    className={`contact-group__status contact-group__status--${ticketsStatus}`}
                  />
                )}
                <h3 className="title">{name}</h3>
                <p
                  className={`${
                    showStaff && staff && staff.length > 0 ? 'small' : ''
                  }`}>
                  {address}
                </p>
                {showStaff &&
                  staff &&
                  staff.length > 0 && (
                    <p className="small">
                      {staff.map(
                        ({ name }, i) =>
                          staff.length - 1 === i ? name : `${name}, `
                      )}
                    </p>
                  )}
              </div>
              {showNumber && (
                <div className="contact-group__number">
                  <a
                    className="small"
                    href={formatPhoneNumber(phone)}
                    onClick={e => e.stopPropagation()}>
                    {phone}
                  </a>
                </div>
              )}
            </ElementNodeName>
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

List.propTypes = {
  url: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
  showStaff: PropTypes.bool,
  showNumber: PropTypes.bool,
  history: PropTypes.shape({}).isRequired
};

List.defaultProps = {
  url: undefined,
  items: [],
  className: '',
  showStaff: false,
  showNumber: false
};

// requires "withRouter" for correct history object
const ListWithRouter = withRouter(List);

export { ListWithRouter as default, ContactsList, TicketsList };
