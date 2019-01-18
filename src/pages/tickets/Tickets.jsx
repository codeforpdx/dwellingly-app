import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import SearchForm from '../../components/search-form/SearchForm';
import TicketsList from '../../components/list/TicketsList';
import TicketModal from '../../components/modal/TicketModal';
import Icon from '../../components/icon/Icon';

// mock data
import { tickets } from '../../data';

class Tickets extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.tickets = tickets;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSearch(searchTerm) {
    // TODO: filter tickets list
    const filteredTickets = tickets.filter(
      ({ tenant, sender }) =>
        `${tenant.fullName} ${tenant.property &&
          tenant.property.addressOne} ${tenant.property &&
          tenant.property.addressTwo} ${tenant.property &&
          tenant.property.name} ${sender && sender.fullName}`
          .toUpperCase()
          .indexOf(searchTerm.toUpperCase()) !== -1
    );

    this.tickets =
      searchTerm && searchTerm.length > 0 ? filteredTickets : tickets;

    console.log(filteredTickets);
  }

  render() {
    const { match, location } = this.props;
    const { tickets } = this;

    // TODO: Replace with proper query to DB for CLOSED tickets
    const closedTickets = tickets.filter(({ status }) => status === 'Closed');

    // TODO: Replace with proper query to DB for OPEN tickets
    const openTickets = tickets.filter(({ status }) => status !== 'Closed');

    return (
      <div className="page">
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label label="Tickets" type="basic" />
              <SearchForm onSubmit={this.handleSearch} />
              <nav className="tabs tabs--dark tabs--no-border tabs--space-between tabs--icon-heavy">
                <ul className="width-wrapper">
                  <li className="tab">
                    <NavLink
                      to={`${location.pathname}?sort=date`}
                      activeClassName="tab--active">
                      <strong>
                        <Icon icon="calendar" />By Date
                      </strong>
                    </NavLink>
                  </li>
                  <li className="tab">
                    <NavLink
                      to={`${location.pathname}?sort=status`}
                      activeClassName="tab--active">
                      <strong>
                        <Icon icon="checkbox" />By Status
                      </strong>
                    </NavLink>
                  </li>
                  <li className="tab">
                    <NavLink
                      to={`${location.pathname}?sort=flagged`}
                      activeClassName="tab--active">
                      <strong>
                        <Icon icon="flagOutline" />Flagged
                      </strong>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <Route
            path={`${match.path}/open`}
            component={() => <TicketsList items={openTickets} match={match} />}
          />
          <Route
            path={`${match.path}/closed`}
            component={() => (
              <TicketsList items={closedTickets} match={match} />
            )}
          />
        </section>

        <Route path={`${match.path}/*/:ticket`} exact component={TicketModal} />
      </div>
    );
  }
}

Tickets.propTypes = {
  location: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired
};

export default Tickets;
