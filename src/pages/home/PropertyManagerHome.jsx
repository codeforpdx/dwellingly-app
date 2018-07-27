import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Route } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import List from '../../components/list/List';
import Icon from '../../components/icon/Icon';
import { ROUTES } from '../../constants/constants';

// TODO: Replace content with actual user data

class PropertyManagerHome extends Component {
  render() {
    const { match, tenants, properties } = this.props;
    return (
      <div>
        <Header>
          {() => (
            <div>
              <Navigation />

              <Header.Label type="contact">
                {() => (
                  <div>
                    <h1>Tara Mckenzie</h1>
                    <div className="contact-quick-links">
                      <Link
                        to={ROUTES.EMERGENCY}
                        className="contact-quick-links__link">
                        <Icon icon="asterisk" />
                        <span>Emergency</span>
                      </Link>
                      <a className="contact-quick-links__link" href="#join">
                        <Icon icon="users" />
                        <span>JOIN</span>
                      </a>
                      <Link
                        to={ROUTES.SETTINGS}
                        className="contact-quick-links__link">
                        <Icon icon="gear" />
                        <span>Settings</span>
                      </Link>
                    </div>
                  </div>
                )}
              </Header.Label>

              <nav className="tabs">
                <ul className="width-wrapper">
                  <li className="tab">
                    <NavLink
                      exact
                      to={ROUTES.ROOT}
                      activeClassName="tab--active">
                      <strong>
                        <Icon icon="userOutlineNoBottom" />Tenants
                      </strong>
                      <span className="tab__count">({tenants.length})</span>
                    </NavLink>
                  </li>
                  <li className="tab">
                    <NavLink
                      exact
                      to={ROUTES.PROPERTIES}
                      activeClassName="tab--active">
                      <strong>
                        <Icon icon="building" />Properties
                      </strong>
                      <span className="tab__count">({properties.length})</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <Route
            exact
            path={ROUTES.ROOT}
            component={() => (
              <List match={match} url={ROUTES.TENANTS} items={tenants} />
            )}
          />
          <Route
            path={ROUTES.PROPERTIES}
            component={() => (
              <List match={match} url={ROUTES.PROPERTIES} items={properties} />
            )}
          />
        </section>
        {/* end main */}
      </div>
    );
  }
}

PropertyManagerHome.propTypes = {
  match: PropTypes.shape({}).isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({})),
  tenants: PropTypes.arrayOf(PropTypes.shape({}))
};

PropertyManagerHome.defaultProps = {
  properties: [],
  tenants: []
};

export default PropertyManagerHome;
