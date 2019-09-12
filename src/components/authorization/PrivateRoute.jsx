import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { ROUTES } from '../../constants/constants';

// We also need to check props to see if there's a user!

// console.log('user role: ', userRole, doesRoleExist);

function PrivateRoute({ user, component: Component, ...rest }) {
  // Check cookie to see if there's a role
  const cookies = new Cookies();
  // console.log(cookies);
  const userRole = cookies.get('messengerUserRole');
  // const userRole = user ? user.role : null;
  let doesRoleExist = false;
  const isRoleArray =
    userRole &&
    (userRole.isAdmin || userRole.isPropertyManager || userRole.isStaff);
  if (userRole && isRoleArray) {
    doesRoleExist = true;
  }
  return (
    <Route
      {...rest}
      render={props =>
        doesRoleExist && !rest.isFetchingAuthorization ? (
          <Component user={user} {...props} />
        ) : (
          <Redirect
            to={{ pathname: ROUTES.LOGIN, state: { from: props.location } }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  user: PropTypes.objectOf(Object),
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})])
    .isRequired,
  location: PropTypes.shape({}),
};

PrivateRoute.defaultProps = {
  user: undefined,
  location: undefined,
};

const mapStateToProps = ({ user }) => ({
  user: user.user,
  userCreated: user.userCreated,
  isCreatingUser: user.isCreatingUser,
  isFetchingAuthorization: user.isFetchingAuthorization,
  isFetchingUserData: user.isFetchingUserData,
  haveUser: user.haveUser,
  accountSource: user.accountSource,
});

export default connect(mapStateToProps)(PrivateRoute);
