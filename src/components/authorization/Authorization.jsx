import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ROLES } from '../../constants/constants';
import { getUserRoleString } from '../../utils';

// mock data
import { dummyUser } from '../../data';

function Authorization(allowedRoles) {
  return WrappedComponent =>
    class WithAuthorization extends Component {
      constructor(props) {
        super(props);

        this.user = dummyUser;
      }

      render() {
        const { role } = this.user;
        const roleStr = getUserRoleString(role, ROLES);
        if (allowedRoles.includes(roleStr)) {
          return <WrappedComponent {...this.props} />;
        }

        return <Redirect to="/" />;
      }
    };
}

export default Authorization;
