import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../icon/Icon';
import { ROUTES } from '../../constants/constants';
import { NAVIGATION } from '../../translations/messages';

import './Navigation.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleToggleMenu = this.handleToggleMenu.bind(this);

    this.state = {
      showMenu: false
    };
  }

  handleToggleMenu() {
    this.setState(({ showMenu }) => ({ showMenu: !showMenu }));
  }

  render() {
    const { intl } = this.props;
    return (
      <div>
        {!this.state.showMenu && (
          <div className="actions">
            <button
              type="button"
              aria-label="Show Menu"
              className="menu__btn action action--right"
              onClick={this.handleToggleMenu}>
              <Icon icon="menu" />
            </button>
          </div>
        )}

        {this.state.showMenu && (
          <nav className="menu" aria-expanded={this.state.showMenu}>
            <button
              type="button"
              aria-label="Close Menu"
              className="menu__bg"
              onClick={this.handleToggleMenu}
            />
            <div className="menu__groups">
              <dl>
                <button
                  className="menu__close-btn"
                  onClick={this.handleToggleMenu}
                  type="button">
                  <Icon icon="close" />
                </button>
                <dt className="menu__label">
                  <Icon icon="userOutline" />Tara Mckenzie
                </dt>
                <dd>
                  <NavLink
                    to={ROUTES.OUT_OF_OFFICE}
                    activeClassName="menu__link--active">
                    <strong>Out of Office</strong>
                    <span>Off</span>
                  </NavLink>
                  <NavLink
                    to={ROUTES.SETTINGS}
                    activeClassName="menu__link--active">
                    <strong>Settings</strong>
                  </NavLink>
                </dd>
                <dt className="menu__label">
                  <Icon icon="ticketOutline" />Tickets
                </dt>
                <dd>
                  <Link to={ROUTES.TICKETS}>
                    <strong>Open</strong>
                    <span>1</span>
                  </Link>
                  <Link to={ROUTES.CLOSED_TICKETS}>
                    <strong>Closed</strong>
                    <span>3</span>
                  </Link>
                </dd>
                <dt className="menu__label">
                  <Icon icon="notebookOutline" />Directory
                </dt>
                <dd>
                  <Link to={ROUTES.TENANTS}>
                    <strong>Tenants</strong>
                  </Link>
                  <Link to={ROUTES.PROPERTY_MANAGERS}>
                    <strong>Property Managers</strong>
                  </Link>
                </dd>
                <dt className="menu__label">
                  <Icon icon="commentOutline" />Links for Demo
                </dt>
                <dd>
                  <Link to={ROUTES.ROOT}>
                    <strong>{intl.formatMessage(NAVIGATION.HOME)}</strong>
                    <span>Property Manager</span>
                  </Link>
                  <Link to={ROUTES.TICKETS}>
                    <strong>Home</strong>
                    <span>JOIN Staff</span>
                  </Link>
                </dd>
              </dl>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

Navigation.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Navigation);
