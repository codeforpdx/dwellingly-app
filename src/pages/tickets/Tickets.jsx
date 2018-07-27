import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import SearchForm from '../../components/search-form/SearchForm';
import TicketsList from '../../components/list/TicketsList';
import Icon from '../../components/icon/Icon';

class Tickets extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSearch(event) {
    if (event) event.preventDefault();
    // do stuff
    return this;
  }

  render() {
    const { match } = this.props;
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
                    <NavLink to={match.url} activeClassName="tab--active">
                      <strong>
                        <Icon icon="calendar" />By Date
                      </strong>
                    </NavLink>
                  </li>
                  <li className="tab">
                    <NavLink
                      to={`${match.url}?sort=status`}
                      activeClassName="tab--active">
                      <strong>
                        <Icon icon="checkbox" />By Status
                      </strong>
                    </NavLink>
                  </li>
                  <li className="tab">
                    <NavLink
                      to={`${match.url}?sort=flagged`}
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
          <TicketsList items={[]} />
        </section>
      </div>
    );
  }
}

Tickets.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default Tickets;
