import React from 'react';
import LoginForm from '../../components/login-form/LoginForm';
import Header from '../../components/header/Header';

const Login = () => (
  <div className="page">
    <Header label="Login" type="basic" />
    <LoginForm />
  </div>
);

export default Login;
