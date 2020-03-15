import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { LoginForm } from './views/login';
import { Home } from './views/home';
import Header from './components/Header';
import { NavMenu } from './components/NavigationMenu/navigationMenu.js';
import { Dashboard } from './views/dashboard';
import { Terms } from './views/terms';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <NavMenu />
        <Header />
        <Switch>
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/signup' />
          <Route exact path='/terms' component={Terms} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;