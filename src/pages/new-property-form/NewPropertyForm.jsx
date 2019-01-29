import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Header from '../../components/header/Header';
// import Icon from '../../components/icon/Icon';
import Input from '../../components/input/Input';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import Navigation from '../../components/navigation/Navigation';
import { propertyManagers, properties } from '../../data';
import Search from '../../components/search/Search';
import './NewPropertyForm.scss';

class NewPropertyForm extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.handleSelectionFromSearch = this.handleSelectionFromSearch.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.handleAddNewProperty = this.handleAddNewProperty.bind(this);

    this.toggleConfirmationModal = this.toggleConfirmationModal.bind(this);

    this.changeBackground = this.changeBackground.bind(this);

    this.state = {
      modalIsOpen: false,
      propertyManagerSelected: [],
      properties: {
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        numberOfUnits: ""
      },
      addClass: false
    };
  }

  toggleConfirmationModal() {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
    this.changeBackground()
  }

  changeBackground() {
		this.setState({addClass: true});
	}

  handleSearch(event) {
    const { target } = event;
    const { id } = target;
    const { value } = target;
    this.setState({
      [id]: value
    });
  }

  handleChange(event) {
    event.preventDefault();
    const { target } = event;
    const { name } = target;
    const { value } = target;
    const {properties} = this.state.properties;

    properties[name] = value;

    this.setState({
      properties
    });
  }
  //
  // handleSubmit(event) {
  //   const { target } = event;
  //   const { name } = target;
  //   const { value } = target;
  //
  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleSelectionFromSearch(nameSearched) {
    // if (Object.keys(nameSearched).includes('firstName')) {
    //   this.setState({ propertyManagerSelected: nameSearched });
    // } else {
      if (
        !this.state.propertyManagerSelected.find(({ id }) => id === nameSearched.id)
      ) {
        this.setState(prevState => ({
          propertyManagerSelected: [...prevState.propertyManagerSelected, nameSearched]
        }));
        console.log(this.state);
        console.log(nameSearched);
      } else {
        this.setState(prevState => ({
          propertyManagerSelected: prevState.propertyManagerSelected.filter(
            ({ id }) => id !== nameSearched.id
          )
        }));
      }
      this.setState(prevState => ({ propertyManagerSelected: prevState.propertyManagerSelected }))
  // console.log(this.state);
// }
  console.log(this.state);
  // console.log(nameSearched);
}

handleAddNewProperty(newProperty) {
  const newPropertyList =  this.state.properties;
  newPropertyList.push(newProperty);
  this.setState(prevState => ({
    properties: prevState.newPropertyList
  }));
}


  handleNewPropertyFormSubmit(event) {
  event.preventDefault();
  const propertyName = '';
  this.handleAddNewProperty({propertyName: propertyName.value});
    propertyName.value = '';
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
              <fieldset onSubmit={this.handleNewPropertyFormSubmit}>
                <Input
                  id="name"
                  name="name"
                  value={this.state.properties.name}
                  label="Name"
                  type="text"
                  placeholder="Property Name"
                  onChange={this.handleChange}
                />
                <Input
                  id="address"
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Property Address"
                  onChange={this.handleChange}
                />
                <Input
                  id="city"
                  name="city"
                  label="City"
                  type="text"
                  placeholder="City"
                  onChange={this.handleChange}
                />
                <Input
                  id="state"
                  name="state"
                  label="State"
                  type="text"
                  placeholder="State"
                  onChange={this.handleChange}
                />
                <Input
                  id="zipCode"
                  name="zipCode"
                  label="Zipcode"
                  type="text"
                  placeholder="Zip"
                  onChange={this.handleChange}
                />
                <Input
                  id="numberOfUnits"
                  name="numberOfUnits"
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
                  filterSubset={['firstName', 'lastName', 'name']}
                  onSearchSelection={this.handleSelectionFromSearch}
                  multiple
                />
              </fieldset>
            </section>
            <section className="newPropertyFormSection">
              <button onClick={this.toggleConfirmationModal}
                type="submit"
                className="btn">
                Save
              </button>
            </section>
          </div>
        </div>
        <ConfirmationModal
          show={this.state.modalIsOpen}
          onClose={this.toggleConfirmationModal}>
          <p>Are You Sure?</p>
        </ConfirmationModal>
      </div>
    );
  }
}

// NewPropertyForm.propTypes = {
//   intl: intlShape.isRequired
// };

export default injectIntl(NewPropertyForm);
