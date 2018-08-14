import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import PropertyManagersList from '../../components/list/PropertyManagersList';

class PropertyManagersDirectory extends Component {
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
              <Header.Label label="Property Manager Directory" type="basic" />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <PropertyManagersList url="property-managers" items={[]} />
        </section>
      </div>
    );
  }
}

export default PropertyManagersDirectory;
