import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/input/Input';
import Icon from '../../components/icon/Icon';
// import SearchForm from '../../components/search-form/SearchForm';
import { ROLES, ROUTES } from '../../constants/constants';
import { dummyUser, properties } from '../../data';

import './NewTenantForm.scss'

class NewTenantForm extends Component {
  constructor(props) {
    super(props);

    this.handlePropertySearch = this.handlePropertySearch.bind(this);
    this.handleAddingNewProperty = this.handleAddingNewProperty.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      user: dummyUser,
      propertySearch: '',
      addingNewProperty: false
    }
  }

  handlePropertySearch(event) {
    this.setState({propertySearch: event.target.value})
  }

  handleAddingNewProperty() {
    this.setState(prevState => ({addingNewProperty: !prevState.addingNewProperty}))
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value
    });
    this.setState({ propertySearch: '' })
  }

  render() {
    const { user, propertySearch, propertySelected, addingNewProperty } = this.state;
    const propertySearched = properties.filter(property => {
      const propertyNameAndAddress = `${property.name} ${property.address}`.toLowerCase();
      return propertyNameAndAddress.includes(propertySearch)
    })
    const property = propertySearched.find(property => property.id === propertySelected);
    return (
      <div className="admin page">
        {user.role !== ROLES.ADMIN && <Redirect to={ROUTES.ROOT}/>}
        <div>
          <div className="width-wrapper">
            <h1 className="newTenantFormHeading">Add a New Tenant</h1>
            <h2 className="newTenantFormHeading">Tenant</h2>
            <fieldset>
              <Input
                id="fullName"
                label="Name"
                type="text" />
              <Input
                id="phoneNumber"
                label="Phone"
                type="tel"
                placeholder="ex. 503-555-1234" />
              <div className="input inline-input">
                <span className="inline-input__label">Outreach</span>
                <select id="outreachWorker">
                  <option>Staff Name</option>
                </select>
              </div>
              <div className="input inline-input">
                <span className="inline-input__label">Retention</span>
                <select id="retentionWorker">
                  <option>Staff Name</option>
                </select>
              </div>
            </fieldset>
            <h2 className="newTenantFormHeading">Property</h2>
            <fieldset>
              <Input
                id="propertyName"
                placeholder="Property Name"
                label="Property"
                type="text"
                onChange={this.handlePropertySearch}
                value={this.state.propertySearch} />
              <div className="propertySearchResults">
                {propertySearch !== '' && !addingNewProperty ?
                  propertySearched.map(property => (
                  <div key={property.id} className="propertyResult">
                    <button
                      id="propertySelect"
                      type="button"
                      name="propertySelected"
                      onClick={this.handleChange}
                      value={property.id}>
                      {property.name} {property.address}
                    </button>
                  </div>
                )) : null}
                {!propertySelected && propertySearch === '' && (
                  <div className="addNewPropertyLink" onClick={this.handleAddingNewProperty} role="presentation">
                    <span className="addIcon"><Icon icon="plus"/></span>
                    Add new Property
                  </div>
                )}
                {addingNewProperty && (
                  <div>
                    <Input
                      id="newPropertyName"
                      placeholder="Property Name"
                      label="Property Name"
                      type="text" />
                    <Input
                      id="newPropertyAddress"
                      placeholder="Property Address"
                      label="Street Address"
                      type="text" />
                    <Input
                      id="newPropertyCity"
                      placeholder="City"
                      label="City"
                      type="text" />
                    <Input
                      id="newPropertyZip"
                      placeholder="Zip"
                      label="Zip"
                      type="number" />
                  </div>
                )}
                {propertySelected ?
                  <div className="newTenantProperty">
                    <div>
                      <h3>{property.name.length > 0 ? property.name : null}</h3>
                      <p>{property.address.length > 0 ? property.address : null}</p>
                    </div>
                  </div>
                : null}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    )
  }
}

export default NewTenantForm;
