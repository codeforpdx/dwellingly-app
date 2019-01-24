import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Header from '../../components/header/Header';
// import Icon from '../../components/icon/Icon';
import Input from '../../components/input/Input';
import Navigation from '../../components/navigation/Navigation';
import { propertyManagers } from '../../data';
import Search from '../../components/search/Search';
import './NewPropertyForm.scss';

class NewPropertyForm extends Component {
  constructor(props) {
    super(props);

    // this.handleSearch = this.handleSearch.bind(this);

    this.handleSelectionFromSearch = this.handleSelectionFromSearch.bind(this);
    //
    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      propertyManagerSelected: []
    };
  }

  // handleSearch(event) {
  //   const { target } = event;
  //   const { id } = target;
  //   const { value } = target;
  //   this.setState({
  //     [id]: value
  //   });
  // }

  // handleChange(event) {
  //   const { target } = event;
  //   const { name } = target;
  //   const { value } = target;
  //
  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleSelectionFromSearch(searchedObj) {
    // if (Object.keys(searchedObj).includes('address')) {
    //   this.setState({ propertySelected: searchedObj });
    // } else {
      if (
        !this.state.propertyManagerSelected.find(({ id }) => id === searchedObj.id)
      ) {
        this.setState(prevState => ({
          propertyManagerSelected: [...prevState.propertyManagerSelected, searchedObj]
        }));
      } else {
        this.setState(prevState => ({
          propertyManagerSelected: prevState.propertyManagerSelected.filter(
            ({ id }) => id !== searchedObj.id
          )
        }));
      }
      // this.setState({ addingNewPropertyManager: false });
    // }
  }

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
                  placeholder="Property Name"
                  onChange={this.handleChange}
                />
                <Input
                  id="propertyAddress"
                  name="newPropertyAddress"
                  label="Address"
                  type="text"
                  placeholder="Property Address"
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
                  placeholder="Zip"
                  onChange={this.handleChange}
                />
                <Input
                  id="propertyUnits"
                  name="newPropertyUnits"
                  label="Units"
                  type="text"
                  placeholder="Units"
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
