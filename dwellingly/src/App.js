import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
          <Route exact path='/' component={Home} />

          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/signup' />
          <Route exact path='/terms' component={Terms} />
          <Route exact path='/dashboard' component={Dashboard} />

          <Route exact path='/add/tenant' component={Dashboard} />
          <Route exact path='/add/property' component={Dashboard} />
          <Route exact path='/add/manager' component={Dashboard} />
          <Route exact path='/manage/tenants' component={Dashboard} />
          <Route exact path='/manage/properties' component={Dashboard} />
          <Route exact path='/manage/managers' component={Dashboard} />
          <Route exact path='/tickets' component={Dashboard} />
          <Route exact path='/reports' component={Dashboard} />
          <Route exact path='/staff' component={Dashboard} />
          <Route exact path='/emergency' component={Dashboard} />
          <Route exact path='/settings' component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;