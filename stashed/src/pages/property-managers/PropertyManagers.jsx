import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import SearchForm from '../../components/search-form/SearchForm';
import PropertyManagersList from '../../components/list/PropertyManagersList';
import { getPropertyManagers } from '../../dux/propertyManagers';
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
    const { dispatch } = this.props;
    dispatch(getPropertyManagers())
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
            url={`${ROUTES.PROPERTY_MANAGER_DETAILS}`}
            items={propertyManagers}
          />
        </section>
      </div>
    );
  }
}

PropertyManagersDirectory.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(null)(PropertyManagersDirectory);
