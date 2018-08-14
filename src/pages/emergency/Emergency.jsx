import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import Icon from '../../components/icon/Icon';
import EmergencyContactsList from '../../components/emergency/EmergencyContactsList';

class Emergency extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="page">
        <Header>
          {() => (
            <div>
              <Navigation />
              <div className="actions">
                <Link to="/" title="Go Back" className="action action--left">
                  <Icon icon="arrowLeft" />
                </Link>
              </div>
              <Header.Label label="Emergency Numbers" type="basic" />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <EmergencyContactsList />
        </section>
      </div>
    );
  }
}

export default Emergency;
