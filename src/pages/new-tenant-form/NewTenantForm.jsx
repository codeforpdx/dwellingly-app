import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/input/Input';
import Icon from '../../components/icon/Icon';
// import SearchForm from '../../components/search-form/SearchForm';
import { ROLES, ROUTES } from '../../constants/constants';
import { dummyUser, properties, propertyManagers } from '../../data';

import './NewTenantForm.scss'

class NewTenantForm extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddingNewPropertyManager = this.handleAddingNewPropertyManager.bind(this);
    this.handleAddingNewProperty = this.handleAddingNewProperty.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      user: dummyUser,
      addingNewProperty: false,
      addingNewPropertyManager: false
    }
  }

  handleSearch(event) {
    const { target } = event;
    const { id } = target;
    const { value } = target;
    this.setState({
      [id]: value
    })
  }

  handleAddingNewPropertyManager() {
    this.setState(prevState => ({addingNewPropertyManager: !prevState.addingNewPropertyManager}))
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
    this.setState({ propertyName: '' })
    this.setState({ propertyManagerName: '' })
  }

  render() {
    const { user, propertyName, propertySelected, propertyManagerSelected, addingNewProperty, addingNewPropertyManager, propertyManagerName } = this.state;
    const propertySearched = properties.filter(property => {
      const propertyNameAndAddress = `${property.name} ${property.address}`.toLowerCase();
      return propertyNameAndAddress.includes(propertyName)
    })
    const propertyManagerSearched = propertyManagers.filter(manager => {
      const managerNameAndPhone = `${manager.name} ${manager.number}`.toLowerCase();
      return managerNameAndPhone.includes(propertyManagerName)
    })
    const manager = propertyManagerSearched.find(manager => manager.id === propertyManagerSelected)
    const property = propertySearched.find(property => property.id === propertySelected);
    return (
      <div className="admin page">
        {user.role !== ROLES.ADMIN && <Redirect to={ROUTES.ROOT}/>}
        <div>
          <div className="width-wrapper">
            <h1 className="newTenantFormHeading">Add a New Tenant</h1>

            {/* Add new tenant form section
            ======================================= */}
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

            {/* Add new property form
            ======================================= */}
            <h2 className="newTenantFormHeading">Property</h2>
            <fieldset>
              <Input
                id="propertyName"
                placeholder="Search Property Name"
                label="Property"
                type="text"
                onChange={this.handleSearch}
                value={this.state.propertyName} />
            </fieldset>
            <div className="propertySearchResults">
              {propertyName !== '' && (
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
              )))}
              {(!propertySelected &&
                !addingNewProperty) && (
                <div className="addNewLink" onClick={this.handleAddingNewProperty} role="presentation">
                  <span className="addIcon"><Icon icon="plus"/></span>
                  Add new Property
                </div>
              )}
              {(addingNewProperty &&
                !propertySelected) && (
                <fieldset>
                  <div className="propertyFormCloseButton">
                    Add new property
                    <span onClick={this.handleAddingNewProperty} role="presentation">
                      <Icon icon="close"/>
                    </span>
                  </div>
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
                </fieldset>
              )}
              {propertySelected ?
                <div className="newTenantProperty">
                  <div>
                    <h3>{property.name.length > 0 ? property.name : null}</h3>
                    <p>{property.address.length > 0 ? property.address : null}</p>
                  </div>
                </div>
              : null}
              {propertyManagerSelected && (
                <div className="newTenantProperty">
                  <div>
                    <h3>{manager.name.length > 0 && manager.name}</h3>
                    <p>{manager.number.length > 0 && manager.number}</p>
                  </div>
                </div>
              )}
              {propertySelected && (
                <div className="addNewLink" onClick={this.handleAddingNewPropertyManager} role="presentation">
                  <span className="addIcon"><Icon icon="plus"/></span>
                  Add new manager
                </div>
              )}
            </div>

            {/* Add new property manager form
            ======================================= */}
            {(addingNewPropertyManager &&
              propertySelected &&
              !propertyManagerSelected) && (
              <div>
                <h2 className="newTenantFormHeading">Property Manager</h2>
                <fieldset>
                  <Input
                    id="propertyManagerName"
                    placeholder="Search Manager Name"
                    label="Property Manager"
                    type="text"
                    onChange={this.handleSearch}
                    value={this.state.propertyManagerName} />
                </fieldset>
                <div className="propertySearchResults">
                  {propertyManagerName !== '' ?
                    propertyManagerSearched.map(manager => (
                    <div key={manager.id} className="propertyResult">
                      <button
                        id="propertyManagerSelect"
                        type="button"
                        name="propertyManagerSelected"
                        onClick={this.handleChange}
                        value={manager.id}>
                        {manager.name} {manager.number}
                      </button>
                    </div>
                  )) : null}
                  {(propertyManagerName === '' &&
                    !propertyManagerSelected) && (
                    <fieldset>
                      <div className="propertyFormCloseButton">
                        Add new manager
                        <span onClick={this.handleAddingNewPropertyManager} role="presentation">
                          <Icon icon="close"/>
                        </span>
                        </div>
                      <Input
                        id="newPropertyManagerName"
                        placeholder="Name"
                        label="Name"
                        type="text" />
                      <Input
                        id="newPropertyManagerPhone"
                        placeholder="ex. 503-555-1234"
                        label="Phone"
                        type="tel" />
                      <Input
                        id="newPropertyManagerEmail"
                        placeholder="email@email.com"
                        label="Email"
                        type="text" />
                    </fieldset>
                  )}
                </div>
              </div>
            )}
            {/* Add Unit Input
            ======================================= */}
            {propertySelected && (
              <div>
                <h2 className="newTenantFormHeading">Unit</h2>
                <Input
                  id="propertyUnit"
                  placeholder="Unit # / ABC..."
                  label="Unit"
                  type="text"/>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default NewTenantForm;
