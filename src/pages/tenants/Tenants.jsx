import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';
import Header from '../../components/header/Header';
import Icon from '../../components/icon/Icon';
import Navigation from '../../components/navigation/Navigation';
import SearchForm from '../../components/search-form/SearchForm';
import List from '../../components/list/List';

// mock data
import { tenants } from '../../data';
import { ROUTES } from '../../constants/constants';

class Tenants extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.tenants = tenants;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSearch(event) {
    if (event) event.preventDefault();
    return this;
  }

  render() {
    const { match } = this.props;
    const { tenants } = this;
    return (
      <div className="page">
        <Header className="hero">
          {() => (
            <div>
              <Navigation />
              <Header.Label label="Tenants Directory" type="basic" />
              <SearchForm onSubmit={this.handleSearch} />

              <nav className="tabs tabs--centered">
                <ul className="width-wrapper">
                  <li className="tab">
                    <NavLink
                      to={ROUTES.TENANTS}
                      exact
                      activeClassName="tab--active">
                      <strong>My Tenants</strong>
                    </NavLink>
                  </li>
                  <li className="tab">
                    <NavLink
                      to={`${ROUTES.TENANTS}/all`}
                      activeClassName="tab--active">
                      <strong>All Tenants</strong>
                    </NavLink>
                  </li>
                  <li className="tab">
                    <NavLink
                      to={ROUTES.ADD_TENANT}
                      activeClassName="tab--active">
                      <Icon icon="plus" />
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <Route
            path={ROUTES.TENANTS}
            exact
            component={() => (
              <List
                match={match}
                url={`${ROUTES.TENANTS}/:id/ongoing`}
                items={tenants}
              />
            )}
          />
          <Route
            path={`${ROUTES.TENANTS}/all`}
            component={() => (
              <List
                match={match}
                url={`${ROUTES.TENANTS}/:id/ongoing`}
                exact
                items={tenants}
                showStaff
              />
            )}
          />
        </section>
      </div>
    );
  }
}

Tenants.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default Tenants;
