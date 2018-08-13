import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from '../icon/Icon';
import { ROUTES } from '../../constants/constants';

function StaffMenu({ handleToggleMenu, type, user }) {
  return (
    <dl>
      {type === 'mobile' &&
        handleToggleMenu && (
          <button
            className="menu__close-btn"
            onClick={handleToggleMenu}
            type="button">
            <Icon icon="close" />
          </button>
        )}
      <dt className="menu__label">
        <Icon icon="userOutline" />
        {user.name}
      </dt>
      <dd>
        <NavLink to={ROUTES.OUT_OF_OFFICE} activeClassName="menu__link--active">
          <strong>Out of Office</strong>
          <span>Off</span>
        </NavLink>
        <NavLink to={ROUTES.SETTINGS} activeClassName="menu__link--active">
          <strong>Settings</strong>
        </NavLink>
      </dd>
      <dt className="menu__label">
        <Icon icon="ticketOutline" />Tickets
      </dt>
      <dd>
        <NavLink to={ROUTES.TICKETS} activeClassName="menu__link--active">
          <strong>Open</strong>
          <span>1</span>
        </NavLink>
        <NavLink
          to={ROUTES.CLOSED_TICKETS}
          activeClassName="menu__link--active">
          <strong>Closed</strong>
          <span>3</span>
        </NavLink>
      </dd>
      <dt className="menu__label">
        <Icon icon="notebookOutline" />Directory
      </dt>
      <dd>
        <NavLink to={ROUTES.TENANTS} activeClassName="menu__link--active">
          <strong>Tenants</strong>
        </NavLink>
        <NavLink
          to={ROUTES.PROPERTY_MANAGERS}
          activeClassName="menu__link--active">
          <strong>Property Managers</strong>
        </NavLink>
      </dd>
    </dl>
  );
}

StaffMenu.propTypes = {
  // intl: intlShape.isRequired,
  handleToggleMenu: PropTypes.func,
  type: PropTypes.string,
  user: PropTypes.shape({}).isRequired
};

StaffMenu.defaultProps = {
  handleToggleMenu: undefined,
  type: 'mobile'
};

export default StaffMenu;
