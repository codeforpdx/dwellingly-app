import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as axios from 'axios';
import UserContext from './contexts/UserContext';
import Toast from './utils/toast';

const token = document.getElementsByName(
  "csrf-token"
)[0].content;

export const auth = {
  isAuthenticated: false,
  async authenticate(email, password) {
    return axios.post(`/api/users/sign_in`, {
      email: email,
      password: password
    }, { headers: { "X-CSRF-Token": token } })
      .then((response) => {
        if(response){
          this.isAuthenticated = true;
          Toast("Successfully logged in.", "success");
          return response;
        }
      })
      .catch((error) => {
        Toast(error.response.data, "error");
        return null
      });
  },
  async signout() {
    return axios.delete(`/api/users/sign_out`, {headers: { "X-CSRF-Token": token }})
      .then((response) => {
        this.isAuthenticated = false;
        localStorage.removeItem( 'authenticated' );
        localStorage.removeItem( 'firstName' );
        localStorage.removeItem( 'lastName' );
        localStorage.removeItem( 'phone' );
        localStorage.removeItem( 'email' );
        Toast("Successfully logged out", "success");
        return Promise.resolve(response);
      })
      .catch((error) => {
        this.isAuthenticated = false;
        localStorage.removeItem( 'authenticated' );
        localStorage.removeItem( 'firstName' );
        localStorage.removeItem( 'lastName' );
        localStorage.removeItem( 'phone' );
        localStorage.removeItem( 'email' );
        Toast("Already signed out", "error");
        return Promise.resolve(error);
      })
  },
  async refreshAccess(refreshToken) {
    return axios.post(`${process.env.REACT_APP_PROXY}/api/refresh`, {},
      { headers: {"Authorization" : `Bearer ${refreshToken}`} }
    )
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
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