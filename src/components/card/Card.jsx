import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CARD_TYPES, STATUS_OPTIONS } from '../../constants/constants';
import Icon from '../icon/Icon';
import './Card.scss';

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
    // quickly convert STATUS_OPTIONS object to array
    const statuses = Object.keys(STATUS_OPTIONS).map(
      key => STATUS_OPTIONS[key]
    );
    return (
      <div>
        <div className="card__top">
          {React.Children.map(children, child =>
            React.cloneElement(child, { types, status })
          )}
          {types.includes(CARD_TYPES.STATUS) && (
            <select className="card__status" defaultValue={status}>
              <option>Set status&hellip;</option>
              {statuses.map(option => (
                <option key={option} value={option}>
                  {option}
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
    const { types, status } = this.props;
    const typesClasses =
      types.length > 0 ? types.map(type => `card--${type}`).join(' ') : null;
    return (
      <div className={`card ${typesClasses}`}>
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
  children: PropTypes.arrayOf(PropTypes.element),
  status: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string)
};

Card.defaultProps = {
  children: undefined,
  status: undefined,
  types: []
};

export default Card;
