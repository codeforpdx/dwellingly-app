import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import './Tile.scss';

class Tile extends Component {
  render() {
    const { title, newTicketCount, unreadTicketCount } = this.props;
    return (
      <div className="admin__tile padding--1em">
        <div className="admin__tile--heading">
          <h3>{title}</h3>
          <Icon icon="arrowRight" />
        </div>
        <div className="admin__tile--body">
          <h3><span>{newTicketCount}</span> <span className="count--type">NEW</span></h3>
          <p><span>{unreadTicketCount}</span> <span className="count--type">Unseen for 24 hours</span></p>
        </div>
      </div>
    )
  }
}

Tile.propTypes = {
  title: PropTypes.string.isRequired,
  newTicketCount: PropTypes.string.isRequired,
  unreadTicketCount: PropTypes.string.isRequired
}

export default Tile
