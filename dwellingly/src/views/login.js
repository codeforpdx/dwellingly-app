import React from 'react';
import { Form, Field, Formik } from 'formik';
import { tempAuth } from '../Auth';
import dwellinglyLogo from '../assets/images/dwellingly_logo.png';


export class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <form action='' method=''>
          Username:
          <input type='text' name='username' />
          Password:
          <input type='password' name='password' />
          <input type='submit' name='submit' />
        </form>
      </div>
    );
  }
}
