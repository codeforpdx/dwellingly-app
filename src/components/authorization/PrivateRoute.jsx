import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fakeAuth } from '../../utils';
import { ROUTES } from '../../constants/constants';

// TODO: replace with firebase auth
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated === true ? (
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
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({})
};

PrivateRoute.defaultProps = {
  location: undefined
};

export default PrivateRoute;
