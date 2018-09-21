import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { ROUTES } from '../../constants/constants';

const cookies = new Cookies();
const userRole = cookies.get('role');
console.log(userRole);

function PrivateRoute({ user, component: Component, ...rest }) {
  return (
    <Route
      {...rest}

      render={props =>
        user && user.role && (user.role.isStaff || user.role.isAdmin || user.role.isPropertyManager) ? (
          <Component {...props} />
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
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})])
    .isRequired,
  location: PropTypes.shape({})
};

PrivateRoute.defaultProps = {
  location: undefined
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


export default connect(
  mapStateToProps,
)(PrivateRoute);