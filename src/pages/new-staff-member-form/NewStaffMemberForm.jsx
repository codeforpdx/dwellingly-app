import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Navigation from '../../components/navigation/Navigation';
import './NewStaffMemberForm.scss';


class NewStaffMemberForm extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }

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
              Add a New Staff Member
            </h2>
            <form id="newStaffMemberForm">
              <section className="newStaffMemberFormSection">
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
                  id="phoneNumber"
                  name="phoneNumber"
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
                <div className="make-admin">
                  <label htmlFor="makeAdmin">Make Admin
                <input className="adminCheckbox"
                    id="makeAdmin"
                    name="makeAdmin"
                    label="Make Admin"
                    type="checkbox"
                    onChange={this.handleChange}
                    />
                  </label>
                </div>
                <button
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
