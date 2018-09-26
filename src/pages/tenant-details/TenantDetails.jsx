import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Route } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import Icon from '../../components/icon/Icon';
import OngoingTickets from '../../components/tickets/OngoingTickets';
import ClosedTickets from '../../components/tickets/ClosedTickets';
import TicketModal from '../../components/modal/TicketModal';

// mock data
import { archives, tenants, tickets } from '../../data';

class TenantDetails extends Component {
  constructor(props) {
    super(props);

    this.handleMoveToArchive = this.handleMoveToArchive.bind(this);

    this.tenant = tenants.find(({ id }) => id === this.props.match.params.id);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleMoveToArchive(id) {
    // TODO:
    this.archivedTenant = id;
    return this;
  }

  render() {
    const { match } = this.props;
    const { tenant } = this;
    const { name, address, staff } = tenant;
    return (
      <div className="page page--light">
        {tenant && (
          <div>
            <Header variant="tenant">
              {() => (
                <div>
                  <Navigation />
                  <div className="actions">
                    <Link
                      to="/"
                      title="Go Back"
                      className="action action--left">
                      <Icon icon="arrowLeft" />
                    </Link>
                  </div>
                  <Header.Label type="contact">
                    {() => (
                      <div>
                        <h1>
                          <Icon icon="userOutline" />
                          {name}
                        </h1>
                        <p className="secondary">{address}</p>
                        {staff && (
                          <p>
                            JOIN Staff:{' '}
                            {staff.map(
                              ({ name }, index) =>
                                `${name}${
                                  index !== staff.length - 1 ? ', ' : ''
                                }`
                            )}
                          </p>
                        )}
                        <div className="hero__wrapper__actions">
                          <Link
                            to={`${match.url}/issue`}
                            className="btn btn--lg btn--strong">
                            <Icon icon="commentOutline" />Issue
                          </Link>
                          <Link
                            to={`${match.url}/compliment`}
                            className="btn btn--lg btn--strong">
                            <Icon icon="heartOutline" />Compliment
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
                            <span className="tab__count">(1)</span>
                          </NavLink>
                        </li>
                        <li className="tab">
                          <NavLink
                            exact
                            to={`${match.url}/closed`}
                            activeClassName="tab--active">
                            <strong>Closed</strong>
                            <span className="tab__count">(3)</span>
                          </NavLink>
                        </li>
                      </ul>
                      <Link
                        className="tab__link tab__link--right"
                        to={`${match.url}/archive`}>
                        <Icon icon="archive" />
                      </Link>
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
                      archives={archives}
                      moveToArchive={this.handleMoveToArchive}
                      match={match}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/ongoing`}
                  component={() => (
                    <OngoingTickets match={match} tickets={tickets} />
                  )}
                />
              </div>
            </section>
            <Route
              path={`${match.path}/ongoing/:ticket`}
              component={TicketModal}
            />
            <Route
              path={`${match.path}/closed/:ticket`}
              component={TicketModal}
            />
          </div>
        )}
      </div>
    );
  }
}

TenantDetails.propTypes = {
  // history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default TenantDetails;
