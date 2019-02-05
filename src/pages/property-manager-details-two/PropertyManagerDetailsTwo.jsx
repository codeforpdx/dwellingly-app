import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Navigation from '../../components/navigation/Navigation';
import './PropertyManagerDetailsTwo.scss';


class PropertyManagerDetailsTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.isSaveEnabled = this.isSaveEnabled.bind(this);
  }

  // handleChange(event) {
  //   const { target } = event;
  //   const { name } = target;
  //   const { value } = target;
  //   this.setState(prevState => ({
  //     users: { ...prevState.users, [name]: value}
  //   }));
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const { dispatch } = this.props;
  //   const { firstName, lastName, phone, email, role, title, ext } = this.state.users;
  // }

  render() {

    return(
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
              Contact
            </h2>
            <form id="contactDetails">
              <section className="contactDetailsSection">
                <Input
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  />
                <Input
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  />
                <Input
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  type="text"
                  placeholder="Phone Number"
                  onChange={this.handleChange}
                  />
              </section>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default PropertyManagerDetailsTwo;
