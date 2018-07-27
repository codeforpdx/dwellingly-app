import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import ContactsList from '../../components/list/ContactsList';
import Icon from '../../components/icon/Icon';

class Emergency extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { history } = this.props;
    return (
      <div className="page">
        <Header>
          {() => (
            <div className="width-wrapper">
              <Navigation />
              <div className="actions">
                <button
                  type="button"
                  aria-label="Go Back"
                  className="action action--left"
                  onClick={() => history.push('/')}>
                  <Icon icon="arrowLeft" />
                </button>
              </div>
              <Header.Label label="Emergency Numbers" type="basic" />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <div className="message message--light">
            <p>
              In the event of a life-threatening emergency with your JOIN
              tenants, please dial 911.<br />
              <br />
              <a
                href="tel:+911"
                className="btn btn--strong btn--lg btn--urgent">
                <Icon icon="phone" /> 911
              </a>
            </p>
          </div>
          <ContactsList items={[]} />
        </section>
      </div>
    );
  }
}

Emergency.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default Emergency;
