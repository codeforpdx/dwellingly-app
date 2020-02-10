import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const tempAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      login()
        .then( () => {
            this.isAuthenticated = true;
            console.log("Successfully logged in.");
        })
        .catch( () => {
            alert("Failure signing in");
        })
    },
    signout() {
      logout()
        .then( () => {
            this.isAuthenticated = false;
            console.log("Successfully logged out.");
            window.location.replace('/login');
        })
        .catch( () => {
            alert("Failure signing out");
        })
    }
  }

const login = () => {
  return new Promise( (resolve, reject) => {

  })
}

const logout = () => {
    return new Promise( (resolve, reject) => {

    });
}
  
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      tempAuth.isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )