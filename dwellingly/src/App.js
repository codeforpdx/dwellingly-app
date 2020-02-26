import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { LoginForm } from './views/login';
import { Home } from './views/home';
import { Dashboard } from './views/dashboard';
import { Home } from './views/home';
import { Dashboard } from './views/dashboard';
import { PrivateRoute } from './Auth';
import { Terms } from './views/terms';
import Header from './components/Header/index';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />

        <Switch>
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/terms' component={Terms} />
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
