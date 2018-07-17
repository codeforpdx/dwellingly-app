import React from 'react';
import { Route } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';
import AppComponent from '../../components/app/App';
import HeaderComponent from '../../components/header/Header';

import CounterPage from '../tally/Tally';
import UnknownPage from '../unknown/Unknown';

const Home = () => (
  <div className="home">
    <HeaderComponent />
    <main>
      <Route exact path={ROUTES.ROOT} component={AppComponent} />
      <Route exact path={ROUTES.COUNTING} component={CounterPage} />
      <Route component={UnknownPage} />
    </main>
  </div>
);

export default Home;
