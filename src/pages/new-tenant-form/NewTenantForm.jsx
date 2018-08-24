import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/input/Input';
// import SearchForm from '../../components/search-form/SearchForm';
import { ROLES, ROUTES } from '../../constants/constants';
import { dummyUser, properties } from '../../data';

import './NewTenantForm.scss'

class NewTenantForm extends Component {
  constructor(props) {
    super(props);

    this.handlePropertySearch = this.handlePropertySearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      user: dummyUser,
      propertySearch: ''
    }
  }

  handlePropertySearch(event) {
    this.setState({propertySearch: event.target.value})
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { user, propertySearch, propertySelected } = this.state;
    const propertySearched = properties.filter(property => {
      const propertyNameAndAddress = `${property.name} ${property.address}`.toLowerCase();
      return propertyNameAndAddress.includes(propertySearch)
    })
    return (
      <div className="admin page">
        {user.role !== ROLES.ADMIN && <Redirect to={ROUTES.ROOT}/>}
        <div>
          <div className="width-wrapper">
            <h1>Add a New Tenant</h1>
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
                {propertySearch !== '' ?
                  propertySearched.map(property => (
                  <div key={property.id} className="propertyResult">
                    <button
                      id="propertySelect"
                      type="button"
                      name="propertySelected"
                      onClick={this.handleChange}
                      value={`${property.name} ${property.address}`}>
                      {property.name} {property.address}
                    </button>
                  </div>)) : null}
                {propertySelected ?
                  <div>
                    <h3>{propertySelected}</h3>
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
