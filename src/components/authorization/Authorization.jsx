import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// mock data
import { dummyUser } from '../../data';

function Authorization(allowedRoles) {
  return WrappedComponent =>
    class WithAuthorization extends Component {
      constructor(props) {
        super(props);

        this.state = {
          user: dummyUser
        };
      }

      render() {
        const { role } = this.state.user;
        if (allowedRoles.includes(role)) {
          return <WrappedComponent {...this.props} />;
        }

        return <Redirect to="/" />;
      }
    };
}

export default Authorization;
