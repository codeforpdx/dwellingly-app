import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import SearchForm from '../../components/search-form/SearchForm';
import PropertyManagersList from '../../components/list/PropertyManagersList';
import { ROUTES } from '../../constants/constants';

// mock data
import { propertyManagers } from '../../data';

class PropertyManagersDirectory extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSearch(event) {
    if (event) event.preventDefault();
    return this;
  }

  render() {
    return (
      <div className="page">
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label label="Property Managers Directory" type="basic" />
              <SearchForm onSubmit={this.handleSearch} />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <PropertyManagersList
            url={`${ROUTES.PROPERTY_MANAGERS}`}
            items={propertyManagers}
          />
        </section>
      </div>
    );
  }
}

export default PropertyManagersDirectory;
