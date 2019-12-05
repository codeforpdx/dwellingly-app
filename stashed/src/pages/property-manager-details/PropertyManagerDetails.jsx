import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Route } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import Icon from '../../components/icon/Icon';
import OngoingTickets from '../../components/tickets/OngoingTickets';
import ClosedTickets from '../../components/tickets/ClosedTickets';
import TicketModal from '../../components/modal/TicketModal';
import { ROUTES } from '../../constants/constants';
import { formatPhoneNumber } from '../../utils';

// mock data
import { propertyManagers, tickets } from '../../data';

class PropertyManagerDetails extends Component {
  constructor(props) {
    super(props);

    this.pm = propertyManagers.find(
      ({ id }) => id === this.props.match.params.id
    );

    this.tempTickets = this.pm.tickets
      ? this.pm.tickets.map(ticket => tickets.find(({ id }) => id === ticket))
      : [];
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { match } = this.props;
    const { name, number } = this.pm;

    // TODO: Replace with proper query to DB for CLOSED tickets
    const closedTickets = this.tempTickets.filter(
      ({ status }) => status === 'Closed'
    );

    // TODO: Replace with proper query to DB for ONGOING tickets
    const ongoingTickets = this.tempTickets.filter(
      ({ status }) => status !== 'Closed'
    );

    return (
      <div className="page page--light">
        {this.pm && (
          <div>
            <Header>
              {() => (
                <div>
                  <Navigation />
                  <div className="actions">
                    <Link
                      to={ROUTES.PROPERTY_MANAGERS}
                      title="Go Back"
                      className="action action--left">
                      <Icon icon="arrowLeft" />
                    </Link>
                  </div>
                  <Header.Label type="contact">
                    {() => (
                      <div>
                        <h1>{name}</h1>
                        <p>
                          <a href={formatPhoneNumber(number)}>{number}</a>
                        </p>
                        <div className="hero__wrapper__actions">
                          <Link
                            to={`${match.url}/tenants`}
                            className="btn btn--lg btn--strong">
                            <Icon icon="userOutline" />Tenant List
                          </Link>
                        </div>
                      </div>
                    )}
                  </Header.Label>

                  <nav className="tabs">
                    <div className="width-wrapper">
                      <ul>
                        <li className="tab">
                          <NavLink
                            exact
                            to={`${match.url}/ongoing`}
                            activeClassName="tab--active">
                            <strong>Ongoing</strong>
                            <span className="tab__count">
                              ({ongoingTickets.length})
                            </span>
                          </NavLink>
                        </li>
                        <li className="tab">
                          <NavLink
                            exact
                            to={`${match.url}/closed`}
                            activeClassName="tab--active">
                            <strong>Closed</strong>
                            <span className="tab__count">
                              ({closedTickets.length})
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              )}
            </Header>

            <section className="main width-wrapper">
              <div className="cards">
                <Route
                  path={`${match.path}/closed`}
                  component={() => (
                    <ClosedTickets
                      archives={closedTickets}
                      moveToArchive={this.handleMoveToArchive}
                      match={match}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/ongoing`}
                  component={() => (
                    <OngoingTickets match={match} tickets={ongoingTickets} />
                  )}
                />
              </div>
            </section>
            <Route
              path={`${match.path}/:status/:ticket`}
              component={TicketModal}
            />
          </div>
        )}
      </div>
    );
  }
}

PropertyManagerDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default PropertyManagerDetails;
