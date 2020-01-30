import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { LoginForm } from './pages/login';
import { Home } from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <div className='App-navbar'>
            <ul>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/signup'>Signup</Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/signup' />
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
