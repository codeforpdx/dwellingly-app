import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import ArchivedTickets from '../../components/tickets/ArchivedTickets';
import Icon from '../../components/icon/Icon';
import { backURL } from '../../utils';

// mock data
import { archives } from '../../data';

class Archive extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { match } = this.props;
    const backUrl = backURL(match.url, 'ongoing');
    return (
      <div className="page page--light">
        <Header>
          {() => (
            <div>
              <Navigation />
              <div className="actions">
                <Link
                  title="Go Back"
                  className="action action--left"
                  to={backUrl}>
                  <Icon icon="arrowLeft" />
                </Link>
              </div>
              <Header.Label label="Archive" type="basic" />
            </div>
          )}
        </Header>

        <section className="main">
          <div className="message">
            <p className="width-wrapper">
              Tickets that you marked as resolved or were closed by JOIN and are
              older than 60 days.
            </p>
          </div>
          <div className="cards width-wrapper">
            <ArchivedTickets tickets={archives} />
          </div>
        </section>
      </div>
    );
  }
}

Archive.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
};

export default Archive;
