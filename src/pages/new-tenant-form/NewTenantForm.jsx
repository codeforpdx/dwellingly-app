import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/input/Input';
import Icon from '../../components/icon/Icon';
import Search from '../../components/search/Search';
import { ROLES, ROUTES } from '../../constants/constants';
import { dummyUser, properties, propertyManagers } from '../../data';

import './NewTenantForm.scss'

class NewTenantForm extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddingNewPropertyManager = this.handleAddingNewPropertyManager.bind(this);
    this.handleSelectionFromSearch = this.handleSelectionFromSearch.bind(this);
    this.handleAddingNewProperty = this.handleAddingNewProperty.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      user: dummyUser,
      addingNewProperty: false,
      addingNewPropertyManager: false,
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

  handleSelectionFromSearch(searchedObj) {
    if(Object.keys(searchedObj).includes("address")) {
      this.setState({ propertySelected: searchedObj })
    } else {
      this.setState({ propertyManagerSelected: searchedObj })
      this.setState({ addingNewPropertyManager: false })
    }
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
    // this.setState({ propertyManagerName: '' })
  }

  render() {
    const { user, propertySelected, propertyManagerSelected, addingNewProperty, addingNewPropertyManager } = this.state;
    return (
      <div className="admin page">
        {user.role !== ROLES.ADMIN && <Redirect to={ROUTES.ROOT}/>}
        <div>
          <div className="width-wrapper">
            <h1 className="newTenantFormHeading">Add a New Tenant</h1>

            {/* Add new tenant form section
            ======================================= */}
            <section className="newTenantFormSection">
              <h2 className="newTenantFormHeading">Tenant</h2>
              <fieldset>
                <Input
                  id="fullName"
                  name="tenantName"
                  label="Name"
                  type="text"
                  onChange={this.handleChange} />
                <Input
                  id="phoneNumber"
                  name="tenantPhone"
                  label="Phone"
                  type="tel"
                  placeholder="ex. 503-555-1234"
                  onChange={this.handleChange} />
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
            </section>

            {/* Add new property form
            ======================================= */}
            <section className="newTenantFormSection">
              <h2 className="newTenantFormHeading">Property</h2>
              <fieldset>
                <Search
                  id="propertyName"
                  label="Property Search"
                  onSearchSelection={this.handleSelectionFromSearch}
                  searchData={properties} />
              </fieldset>
            </section>
            <div className="propertySearchResults">
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
                    name="newPropertyName"
                    placeholder="Property Name"
                    label="Property Name"
                    type="text" />
                  <Input
                    id="newPropertyAddress"
                    name="newPropertyAddress"
                    placeholder="Property Address"
                    label="Street Address"
                    type="text" />
                  <Input
                    id="newPropertyCity"
                    name="newPropertyCity"
                    placeholder="City"
                    label="City"
                    type="text" />
                  <Input
                    id="newPropertyZip"
                    name="newPropertyZip"
                    placeholder="Zip"
                    label="Zip"
                    type="number" />
                </fieldset>
              )}
              {propertySelected ?
                <div className="newTenantProperty">
                  <div>
                    <h3>{propertySelected.name.length > 0 ? propertySelected.name : null}</h3>
                    <p>{propertySelected.address.length > 0 ? propertySelected.address : null}</p>
                  </div>
                  <div className="editPropertyDetails">
                    <span className="editIcon">
                      <Icon icon="pencil"/>
                    </span>
                    <p>edit</p>
                  </div>
                </div>
              : null}
              {propertyManagerSelected && (
                <div className="newTenantProperty">
                  <div>
                    <h3>{propertyManagerSelected.name.length > 0 && propertyManagerSelected.name}</h3>
                    <p>{propertyManagerSelected.number.length > 0 && propertyManagerSelected.number}</p>
                  </div>
                  <div className="editPropertyDetails">
                    <span className="editIcon">
                      <Icon icon="pencil"/>
                    </span>
                    <p>edit</p>
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
              <section className="newTenantFormSection">
                <h2 className="newTenantFormHeading">Property Manager</h2>
                <fieldset>
                  <Search
                    id="propertyManagerName"
                    label="Property Manager Search"
                    onSearchSelection={this.handleSelectionFromSearch}
                    searchData={propertyManagers} />
                </fieldset>
                <div className="propertySearchResults">
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
                </div>
              </section>
            )}
            {/* Add Unit Input
            ======================================= */}
            {propertySelected && (
              <section className="newTenantFormSection">
                <h2 className="newTenantFormHeading">Unit</h2>
                <Input
                  id="propertyUnit"
                  placeholder="Unit # / ABC..."
                  label="Unit"
                  type="text"/>
              </section>
            )}
            <section className="newTenantFormSection">
              <button type="submit" className="btn">Save</button>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default NewTenantForm;
