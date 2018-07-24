import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ROUTES } from '../../constants/constants';
import AppComponent from '../../components/app/App';
import HeaderComponent from '../../components/header/Header';
import UserControls from '../../components/user-controls/UserControls';

import AdminPage from '../admin/Admin';
import CounterPage from '../tally/Tally';
import LoginPage from '../login/Login';
import SignupPage from '../signup/Signup';
import UnknownPage from '../unknown/Unknown';

import './Home.scss';

const Home = () => (
  <div className="home">
    <HeaderComponent />
    <div className="joinContent">
      <UserControls />
      <Switch>
        <Route exact path={ROUTES.ROOT} component={AppComponent} />
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
        <Route exact path={ROUTES.SIGNUP} component={SignupPage} />
        <Route exact path={ROUTES.COUNTING} component={CounterPage} />
        <Route component={UnknownPage} />
      </Switch>
    </div>
  </div>
);

export default Home;
