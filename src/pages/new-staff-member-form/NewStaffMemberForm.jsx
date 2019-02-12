import React, { Component } from 'react';
import {auth} from '../../firebase';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Navigation from '../../components/navigation/Navigation';
import './NewStaffMemberForm.scss';

class NewStaffMemberForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        role: {
          isAdmin: false,
          isStaff: true,
          isPropertyManager: false,
        },
        title: "",
        ext: ""
      },
      isChecked: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);
    this.isSaveEnabled = this.isSaveEnabled.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    this.setState(prevState => ({
      users: { ...prevState.users, [name]: value}
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    auth.doCreateStaffUser(
      this.state.users.firstName,
      this.state.users.lastName,
      this.state.users.email,
      this.state.users.phone,
      this.state.users.password,
      this.state.users.role
    )
  }

  toggleCheckbox() {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
    this.makeAdmin();
  }

  makeAdmin() {
    this.setState(prevState => ({
      users: {...prevState.users, role: {
        ...prevState.users.role, isAdmin: !prevState.users.role.isAdmin
      }
    }
  }));
}

isSaveEnabled() {
  const staffFirstName = this.state.users.firstName;
  const staffLastName = this.state.users.lastName;
  const staffPhone = this.state.users.phone;
  const staffEmail = this.state.users.email;
  if(staffFirstName && staffLastName && staffPhone && staffEmail){
    return true;
  }
  return false;
}

render() {

  const isEnabled = this.isSaveEnabled();

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
            Add a New Staff Member
          </h2>
          <form id="new-staff-member-form" onSubmit={this.handleSubmit}>
            <section className="new-staff-member-form-section">
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
              <Input
                id="email"
                name="email"
                label="Email"
                type="text"
                placeholder="Email"
                onChange={this.handleChange}
                />
              <Input
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
                />
              <div className="make-admin">
                <label htmlFor="makeAdmin">Make Admin
                  <input className="admin-checkbox"
                    id="makeAdmin"
                    name="makeAdmin"
                    label="Make Admin"
                    type="checkbox"
                    onClick={this.toggleCheckbox}
                    />
                </label>
              </div>
              <button
                disabled={!isEnabled}
                type="submit"
                className="btn">
                Save
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  )
}
}

export default NewStaffMemberForm;
