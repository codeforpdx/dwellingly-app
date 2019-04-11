import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import List from '../../components/list/List';
import Icon from '../../components/icon/Icon';
import { ROLES, ROUTES } from '../../constants/constants';

// mock data
import { dummyUser, tenants, properties, propertyManagers } from '../../data';

class PropertyDetails extends Component {
  constructor(props) {
    super(props);

    this.isUserPropertyManager = this.isUserPropertyManager.bind(this);

    this.userRole = dummyUser.role;
    this.property = properties.find(
      ({ id }) => id === this.props.match.params.id
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  isUserPropertyManager() {
    return this.userRole === ROLES.PROPERTY_MANAGER;
  }

  render() {
    const { match, history } = this.props;
    const { name, address } = this.property;
    const filteredTenants = tenants.filter(tenant =>
      tenant.address.includes(name)
    );

    return (
      <div className="page">
        {this.property && (
          <div>
            <Header variant="tenant">
              {() => (
                <div>
                  <Navigation />
                  <div className="actions">
                    <button
                      type="button"
                      aria-label="Go Back"
                      className="action action--left"
                      onClick={() => history.push(ROUTES.PROPERTIES)}>
                      <Icon icon="arrowLeft" />
                    </button>
                  </div>
                  <Header.Label type="contact">
                    {() => (
                      <div>
                        <h1>
                          <Icon icon="building" />
                          {name}
                        </h1>
                        <p>{address}</p>
                      </div>
                    )}
                  </Header.Label>

                  <nav className="tabs">
                    <ul className="width-wrapper">
                      <li className="tab">
                        <NavLink
                          exact
                          to={`${match.url}`}
                          activeClassName="tab--active">
                          <strong>
                            <Icon icon="userOutlineNoBottom" />Tenants
                          </strong>
                          <span className="tab__count">
                            ({filteredTenants.length})
                          </span>
                        </NavLink>
                      </li>
                      <li className="tab">
                        <NavLink
                          exact
                          to={`${match.url}/property-managers`}
                          activeClassName="tab--active">
                          <strong>
                            <Icon icon="userOutlineNoBottom" />Property Managers
                          </strong>
                          <span className="tab__count">
                            ({propertyManagers.length})
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </Header>

            <section className="main width-wrapper">
              <Route
                path={`${match.path}`}
                exact
                component={() => (
                  <List
                    match={match}
                    url={`${ROUTES.TENANTS}/:id/ongoing`}
                    items={filteredTenants}
                  />
                )}
              />
              {/* Property Manager Details page should not be accessible by Property Managers */}
              {this.isUserPropertyManager ? (
                <Route
                  path={`${match.path}/property-managers`}
                  component={() => <List items={propertyManagers} showNumber />}
                />
              ) : (
                <Route
                  path={`${match.path}/property-managers`}
                  component={() => (
                    <List
                      url={`${ROUTES.PROPERTY_MANAGERS}/:id/ongoing`}
                      items={propertyManagers}
                      showNumber
                    />
                  )}
                />
              )}
            </section>
          </div>
        )}
      </div>
    );
  }
}

PropertyDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default PropertyDetails;
