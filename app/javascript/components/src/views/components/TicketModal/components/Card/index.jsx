import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CARD_TYPES, TICKET_STATUS_OPTIONS } from '../../../../../constants';
import Icon from '../../../icon/Icon';

/**
 * =======================================
 * CARD
 * =======================================
 * Contains compound components:
 *   Card.Top
 *   Card.Header
 *   Card.Content
 *   Card.Bottom
 */
class Card extends Component {
  static Top({ types, status, children }) {
    // quickly convert TICKET_STATUS_OPTIONS object to array
    const statuses = Object.keys(TICKET_STATUS_OPTIONS).map(key => ({
      key,
      value: TICKET_STATUS_OPTIONS[key]
    }));
    const closedArr = [TICKET_STATUS_OPTIONS.CLOSED];
    const openArr = [TICKET_STATUS_OPTIONS.NEW, TICKET_STATUS_OPTIONS.IN_PROGRESS];
    return (
      <div>
        <div className="card__top">
          {React.Children.map(children, child =>
            React.cloneElement(child, { types, status })
          )}
          {types.includes(CARD_TYPES.STATUS) && (
            <select className="card__status" defaultValue={status}>
              <option disabled>Set status&hellip;</option>
              {statuses.map(({ key, value }) => (
                <option
                  key={key}
                  value={value}
                  disabled={
                    value !== TICKET_STATUS_OPTIONS.CLOSED &&
                    ((closedArr.includes(status) && openArr.includes(value)) ||
                      (closedArr.includes(value) && openArr.includes(status)))
                  }>
                  {value}
                </option>
              ))}
            </select>
          )}
        </div>
        {types.includes(CARD_TYPES.TICKET) && (
          <div className="card--ticket__ticket">
            <div className="card--ticket__ticket-cutout card--ticket__ticket-cutout--left" />
            <div className="card--ticket__ticket-cutout card--ticket__ticket-cutout--right" />
          </div>
        )}
      </div>
    );
  }

  static Header({ close, label, types, status, isFlagged, toggleFlag }) {
    const labelIcon =
      label !== 'Compliment' && status !== 'Resolved' ? (
        <Icon icon="comment" />
      ) : (
        <Icon icon="heart" />
      );

    return (
      <header className="heading card__header">
        {close && (
          <button
            title="Close"
            aria-label="Close"
            type="button"
            className="action icon-only ptr"
            onClick={close}>
            <Icon icon="close" />
          </button>
        )}
        {types.includes(CARD_TYPES.STATUS) &&
          toggleFlag && (
            <button
              title="Toggle Flag"
              aria-label="Toggle Flag"
              type="button"
              className={`btn btn--strong card__flag pbr${
                isFlagged ? ' card__flag--flagged' : ''
              }`}
              onClick={toggleFlag}>
              <Icon icon="flagOutline" />
              Flag
            </button>
          )}
        {status &&
          status !== 'Closed' &&
          !types.includes(CARD_TYPES.STATUS) && (
            <h2 className="progress status">{status}</h2>
          )}
        <h1 className="title">
          {status !== 'Resolved' && labelIcon}
          {label}
        </h1>
      </header>
    );
  }

  static Content({ children }) {
    return <div className="card__content">{children}</div>;
  }

  static Bottom({ children }) {
    return <div className="card__bottom">{children}</div>;
  }

  render() {
    const { className, types, status } = this.props;
    const typesClasses =
      types.length > 0 ? types.map(type => `card--${type}`).join(' ') : '';
    return (
      <div className={`card ${typesClasses} ${className}`}>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            types,
            status
          })
        )}
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  className: PropTypes.string,
  status: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string)
};

Card.defaultProps = {
  children: undefined,
  className: '',
  status: undefined,
  types: []
};

export default Card;
