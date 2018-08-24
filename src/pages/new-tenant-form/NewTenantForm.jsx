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

    this.state = {
      user: dummyUser,
      property: properties,
      propertySearch: ''
    }
  }

  handlePropertySearch(event) {
    this.setState({propertySearch: event.target.value})
  }

  render() {
    const { user, property } = this.state;
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
                {property.map(property =>
                  property.name.toLowerCase().split('').map(propertyLetters =>
                  propertyLetters === this.state.propertySearch ?
                  <div className="propertyResult">
                    <h4>{property.name}</h4>
                    <p>{property.address}</p>
                  </div> : null
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    )
  }
}

export default NewTenantForm;
