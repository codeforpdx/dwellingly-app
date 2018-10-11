import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/input/Input';
import Header from '../../components/header/Header';
import NewProperty from '../../components/new-property/NewProperty';
// import NewPropertyManager from '../../components/new-property-manager/NewPropertyManager';
import Icon from '../../components/icon/Icon';
import Search from '../../components/search/Search';
import Navigation from '../../components/navigation/Navigation';
// import MultiSelect from '../../components/multi-select/MultiSelect';
import { ROUTES } from '../../constants/constants';
import { dummyUser, properties, users, propertyManagers } from '../../data';

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
      staffMembersSelected: [],
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
      if(!this.state.staffMembersSelected.find(({id}) => id === searchedObj.id)) {
        this.setState(prevState => ({
          staffMembersSelected: [...prevState.staffMembersSelected, searchedObj]
        }))
      } else {
        this.setState(prevState => ({
          staffMembersSelected: prevState.staffMembersSelected.filter(({id}) => id !== searchedObj.id)
        }))
      }
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
  }

  render() {
    const { user, propertySelected, propertyManagerSelected, addingNewProperty, addingNewPropertyManager, newProperty } = this.state;
    return (
      <div className="admin page">
        {// If the user isn't an Admin, Redirect back to the Root Route
          !user.role.isAdmin && <Redirect to={ROUTES.ROOT}/>
        }
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label label="JOIN Messenger Administration" type="basic"/>
            </div>
          )}
        </Header>
        <div>
          <div className="width-wrapper">
            {/* Add new tenant form section
            ======================================= */}
            <h2 className="admin--header align--left">Add a New Tenant</h2>
            <section className="newTenantFormSection">
              <h2 className="newTenantFormHeading">Tenant Information</h2>
              <fieldset>
                <Input
                  id="firstName"
                  name="tenantFirstName"
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  onChange={this.handleChange} />
                <Input
                  id="lastName"
                  name="tenantLastName"
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  onChange={this.handleChange} />
                <Input
                  id="phoneNumber"
                  name="tenantPhone"
                  label="Phone"
                  type="tel"
                  placeholder="ex. 503-555-1234"
                  onChange={this.handleChange} />
              </fieldset>
            </section>

            {/* Add new property form
            ======================================= */}
            <section className="newTenantFormSection">
              <h2 className="newTenantFormHeading">Assign JOIN Staff</h2>
              <fieldset>
                <Search
                  searchData={users}
                  placeholder="Search JOIN Staff"
                  filterSubset={["firstName", "lastName"]}
                  onSearchSelection={this.handleSelectionFromSearch}
                  multiple />
              </fieldset>
            </section>
            <div className="newTenantFormSection">
              <h2 className="newTenantFormHeading">Property</h2>
              <fieldset>
                <Search
                  id="propertyName"
                  label="Property Search"
                  placeholder="Search Properties"
                  filterSubset={["name", "address"]}
                  onSearchSelection={this.handleSelectionFromSearch}
                  searchData={properties} />
              </fieldset>
              <div className="propertySearchResults">
                {(!propertySelected) && (
                  <div className="addNewLink">
                    <span className="addIcon" onClick={this.handleAddingNewProperty} role="presentation">
                      <Icon icon="plus"/>
                    </span>
                    Create New Property
                  </div>
                )}
              </div>
              {propertySelected ?
                <div className="card newTenantProperty">
                  <h3>
                    {
                      propertySelected.name.length > 0 ?
                        propertySelected.name :
                        newProperty.newPropertyName
                    }
                  </h3>
                  <p>
                    {
                      propertySelected.address.length > 0 ?
                        propertySelected.address :
                        newProperty.newPropertyAddress
                    }
                  </p>
                  <div className="propertySearchResults">
                    {(propertySelected && !propertyManagerSelected) && (
                      <div className="addNewLink" onClick={this.handleAddingNewPropertyManager} role="presentation">
                        <span className="addIcon"><Icon icon="plus"/></span>
                        Add new manager
                      </div>
                    )}
                  </div>
                  {propertySelected && addingNewPropertyManager && (
                    <div>
                      <Search
                        placeholder="Search Property Managers"
                        filterSubset={["firstName", "lastName"]}
                        searchData={propertyManagers} />
                    </div>
                  )}
                </div>
              : null}
              {addingNewProperty && (
                <form className="align--left">
                  {/* <div className="propertyFormCloseButton">
                    {!propertySelected ? "Add new property" : "Edit new property"}
                    <span onClick={this.handleAddingNewProperty} role="presentation">
                      <Icon icon="close"/>
                    </span>
                  </div> */}
                  <NewProperty
                    id="propertySelected"
                    data={propertyManagers}
                    placeholder="Search Property Managers"
                    onSearch={this.handleSelectionFromSearch}
                    onChange={this.handleChange}
                    onSave={this.handleAddingNewProperty} />
                </form>
              )}
              {propertyManagerSelected && (
                <div className="newTenantProperty">
                  {!addingNewPropertyManager && (
                    <div className="editPropertyDetails">
                      <span className="editIcon" onClick={this.handleAddingNewPropertyManager} role="presentation">
                        <Icon icon="pencil"/>
                      </span>
                      <p>edit</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Add Unit Input
            ======================================= */}
            {propertySelected && (
              <section className="newTenantFormSection">
                <h2 className="newTenantFormHeading">Unit</h2>
                <fieldset>
                  <Input
                    id="propertyUnit"
                    placeholder="Unit Number (Optional)"
                    label="Number"
                    type="text"/>
                  <Input
                    id="propertyOccupants"
                    placeholder="Total number of unit tenants"
                    label="Occupant"
                    type="number"/>
                </fieldset>
              </section>
            )}
            <section className="newTenantFormSection">
              <button type="submit" className="btn" disabled={!propertySelected}>Save</button>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default NewTenantForm;
