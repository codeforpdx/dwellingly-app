import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Header from '../../components/header/Header';
// import Icon from '../../components/icon/Icon';
import Input from '../../components/input/Input';
import Navigation from '../../components/navigation/Navigation';
import Search from '../../components/search/Search';

import './NewPropertyForm.scss';

import { propertyManagers } from '../../data';

class NewPropertyForm extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="admin page">
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label
                label="JOIN Messenger Administration"
                type="basic"
              />
            </div>
          )}
        </Header>
        <div>
          <div className="width-wrapper">
            <h2 className="admin--header align--left">
              Add a New Property
            </h2>
            <section className="newPropertyFormSection">
              <h2 className="newPropertyFormHeading">Property Information</h2>
              <fieldset>
                <Input
                  id="propertyName"
                  name="newPropertyName"
                  label="Name"
                  type="text"
                  placeholder="Name"
                  onChange={this.handleChange}
                />
                <Input
                  id="propertyAddress"
                  name="newPropertyAddress"
                  label="Address"
                  type="text"
                  placeholder="Address"
                  onChange={this.handleChange}
                />
                <Input
                  id="propertyCity"
                  name="newPropertyCity"
                  label="City"
                  type="text"
                  placeholder="City"
                  onChange={this.handleChange}
                />
                <Input
                  id="propertyState"
                  name="newPropertyState"
                  label="State"
                  type="text"
                  placeholder="State"
                  onChange={this.handleChange}
                />
                <Input
                  id="propertyZipcode"
                  name="newPropertyZipcode"
                  label="Zipcode"
                  type="text"
                  placeholder="Zipcode"
                  onChange={this.handleChange}
                />
                <Input
                  id="propertyUnits"
                  name="newPropertyUnits"
                  label="Units"
                  type="text"
                  placeholder="# of Units"
                  onChange={this.handleChange}
                />
              </fieldset>
            </section>
            <section className="newPropertyFormSection">
              <h2 className="newPropertyFormHeading">Assign Property Managers</h2>
              <fieldset>
                <Search
                  searchData={propertyManagers}
                  placeholder= "Search Property Managers"
                  filterSubset={['firstName', 'lastName']}
                  onSearchSelection={this.handleSelectionFromSearch}
                  multiple
                />
              </fieldset>
            </section>
            <section className="newPropertyFormSection">
              <button
                type="submit"
                className="btn">
                Save
              </button>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

// NewPropertyForm.propTypes = {
//   intl: intlShape.isRequired
// };

export default injectIntl(NewPropertyForm);
