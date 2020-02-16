import React from 'react';

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
