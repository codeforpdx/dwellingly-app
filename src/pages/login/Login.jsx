import React from 'react';
import LoginEmailComponent from '../../components/login-form/LoginForm';
import { auth } from '../../firebase';

const Login = () => (
  <div>
    <h1>
      This is the login page
    </h1>
    <LoginEmailComponent />
    <div className="googleForm">
      <button type="button" onClick={auth.doSignInWithGoogle}>
        Login With Google
      </button>
    </div>
  </div>
);

export default Login;
