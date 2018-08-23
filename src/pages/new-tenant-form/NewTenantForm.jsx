import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/input/Input';
import { ROLES, ROUTES } from '../../constants/constants';
import { dummyUser } from '../../data';

class NewTenantForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: dummyUser
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="admin page">
        {user.role !== ROLES.ADMIN && <Redirect to={ROUTES.ROOT}/>}
        <div>
          <div className="width-wrapper">
            <h1>Add a New Tenant</h1>
            <h2>Tenant</h2>
            <hr/>
            <Input id="name" name="fullName" label="Name" type="text"/>
          </div>
        </div>
      </div>
    )
  }
}

export default NewTenantForm;
