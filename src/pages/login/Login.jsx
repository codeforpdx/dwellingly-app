import React, { Component } from 'react';
import LoginForm from '../../components/login-form/LoginForm';
import Header from '../../components/header/Header';

class Login extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="page">
        <Header label="Login" type="basic" />
        <LoginForm />
      </div>
    );
  }
}

export default Login;
