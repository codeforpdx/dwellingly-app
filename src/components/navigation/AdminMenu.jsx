import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from '../icon/Icon';
import { ROUTES } from '../../constants/constants';

function AdminMenu({ handleToggleMenu, type, user }) {
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
        <NavLink to={ROUTES.ADMIN} activeClassName="menu__link--active">
          <strong>
            Admin Dashboard
          </strong>
        </NavLink>
        {/* <NavLink to={ROUTES.OUT_OF_OFFICE} activeClassName="menu__link--active">
          <strong>
            <Icon icon="gear" /> Out of Office
          </strong>
          <span>Off</span>
        </NavLink> */}
      </dd>
      <dt className="menu__label">
        <Icon icon="plus" /> Add New
      </dt>
      <dd>
        <NavLink to={ROUTES.ADD_TENANT} activeClassName="menu__link--active">
          <strong>
            Tenant
          </strong>
        </NavLink>
        <NavLink to={ROUTES.ADD_PROPERTY} activeClassName="menu__link--active">
          <strong>
            Property
          </strong>
        </NavLink>
        <NavLink to={ROUTES.ADD_PROPERTY_MANAGER} activeClassName="menu__link--active">
          <strong>
            Property Manager
          </strong>
        </NavLink>
      </dd>
      <dt className="menu__label">
        <Icon icon="userOutline" /> Manage
      </dt>
      <dd>
        <NavLink to={ROUTES.TENANTS} activeClassName="menu__link--active">
          <strong>
            {/* <Icon icon="userOutlineNoBottom" /> */}Tenants
          </strong>
        </NavLink>
        <NavLink
          to={ROUTES.PROPERTIES}
          activeClassName="menu__link--active">
          <strong>
            {/* <Icon icon="building" /> */} Properties
          </strong>
        </NavLink>
        <NavLink
          to={ROUTES.PROPERTY_MANAGERS}
          activeClassName="menu__link--active">
          <strong>
            {/* <Icon icon="userOutlineNoBottom" /> */} Property Managers
          </strong>
        </NavLink>
      </dd>
      <dt>
        <NavLink
          to={`${ROUTES.TICKETS}/open`}>
          <strong>
            <Icon icon="ticketOutline" /> Tickets
          </strong>
        </NavLink>
      </dt>
      {/* <dt className="menu__label">
        <NavLink
          to={`${ROUTES.TICKETS}/open`}>
          <strong>
            <Icon icon="ticketOutline" /> Reports
          </strong>
        </NavLink>
      </dt> */}
      <dt>
        <NavLink to={ROUTES.SETTINGS} activeClassName="menu__link--active">
          <strong>
            <Icon icon="gear" /> Settings
          </strong>
        </NavLink>
      </dt>
    </dl>
  );
}

AdminMenu.propTypes = {
  // intl: intlShape.isRequired,
  handleToggleMenu: PropTypes.func,
  type: PropTypes.string,
  user: PropTypes.shape({}).isRequired
};

AdminMenu.defaultProps = {
  handleToggleMenu: undefined,
  type: 'mobile'
};

export default AdminMenu;
