import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import Icon from '../../components/icon/Icon';
import { backURL } from '../../utils';

class WaitingForRole extends Component {
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
          <p>HEY WE ARE AWAITING A ROLE</p>
        </section>
      </div>
    );
  }
}

WaitingForRole.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
};

export default WaitingForRole;
