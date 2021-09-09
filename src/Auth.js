import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as axios from 'axios';
import UserContext from './UserContext';
import Toast from './utils/toast';

export const parseJwt = ( token ) => {
  if( token !== null && token !== undefined ) {
    var base64Payload = token.split( '.' )[1];
    var base64 = base64Payload.replace( '-', '+' ).replace( '_', '/' );
    return JSON.parse( atob( base64 ) );
  } else {
    return '';
  }
}

export const checkForStoredAccessToken = () => {
  var token = window.localStorage[ 'dwellinglyAccess' ];
  if(token !== null && token !== undefined) {
    var parsedToken = parseJwt(token);
    // The multiply by 1000 is so that the JWT exp date and JS Date.now() match in millisecond length
    if(!parsedToken.exp || parsedToken.exp * 1000 > Date.now()) {
      return true;
    }
  }
  return false;
}

export const checkForStoredRefreshToken = () => {
  var token = window.localStorage[ 'dwellinglyRefresh' ];
  if(token !== null && token !== undefined) {
    var parsedToken = parseJwt(token);
    // The multiply by 1000 is so that the JWT exp date and JS Date.now() match in millisecond length
    if(!parsedToken.exp || parsedToken.exp * 1000 > Date.now()) {
      return true;
    }
  }
  return false;
}

export const auth = {
  isAuthenticated: false,
  async authenticate(email, password) {
    return axios.post(`${process.env.REACT_APP_PROXY}api/login`, {
      email: email,
      password: password
    })
      .then((response) => {
        if(response){
          this.isAuthenticated = true;
          Toast("Successfully logged in.", "success");
          return response;
        }
      })
      .catch((error) => {
        Toast("Failure signing in", "error");
        return Promise.reject(error);
      });
  },
  async signout() {
    return new Promise((resolve, reject) => {
      resolve();
    })
      .then((response) => {
        localStorage.removeItem( 'dwellinglyAccess' );
        localStorage.removeItem( 'dwellinglyRefresh' );
        this.isAuthenticated = false;
        Toast("Successfully logged out", "success");
        return Promise.resolve(response);
      })
      .catch((error) => {
        Toast("Failure signing out", "error");
        return Promise.reject(error);
      })
  },
  async refreshAccess(refreshToken) {
    return axios.post("/api/refresh", {},
      { headers: {"Authorization" : `Bearer ${refreshToken}`} }
    )
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        console.log("Failure getting new access token using refresh token: " + refreshToken);
        return Promise.reject(error);
      });
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    { context => {
      return <Route {...rest} render={(props) => (
        context.user.isAuthenticated
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    }}
  </UserContext.Consumer>
)