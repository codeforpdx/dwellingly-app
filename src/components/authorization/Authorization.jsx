import React from 'react';
import { Redirect } from 'react-router-dom';
// import Cookies from 'universal-cookie';
// import { ROLES } from '../../constants/constants';
// import { getUserRoleString } from '../../utils';

const Authorization = (/* allowedRoles */) => WrappedComponent => props => {
  // const cookies = new Cookies();
  // const userRole = cookies.get('messengerUserRole');
  // const roleStr = getUserRoleString(userRole, ROLES);
  if (true) {
    return <WrappedComponent {...props} />;
  }

  return <Redirect to="/" />;
};

export default Authorization;
