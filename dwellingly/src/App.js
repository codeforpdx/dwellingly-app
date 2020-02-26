import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { LoginForm } from './views/login';
import { Home } from './views/home';
import { Dashboard } from './views/dashboard';
import { PrivateRoute } from './Auth';
import Header from './components/Header/index';


function App() {
  return (


    <BrowserRouter>
      <div className='App'>
        <Header />
        <ul>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path='/login' component={LoginForm} />
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

// removed the header from here since we don't need it on the login screen
// add the header to the "home" component