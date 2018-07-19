import React from 'react';
import { Switch, Route } from 'react-router-dom';
import firebase from 'firebase';

import { ROUTES } from '../../constants/constants';
import AppComponent from '../../components/app/App';
import HeaderComponent from '../../components/header/Header';

import CounterPage from '../tally/Tally';
import LoginPage from '../login/Login';
import SignupPage from '../signup/Signup';
import UnknownPage from '../unknown/Unknown';

import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('we got user!');
        console.log(user);
        this.setState({ userId: user.email });
      } else {
        // No user is signed in.
      }
    });
  }

  render() {
    return (
      <div className="home">
        <HeaderComponent />
        <div className="joinContent">
          { this.state.userId
            && (
              <span>
                Hello,&nbsp;
                { this.state.userId }
              </span>
            )
          }
          <Switch>
            <Route exact path={ROUTES.ROOT} component={AppComponent} />
            <Route exact path={ROUTES.LOGIN} component={LoginPage} />
            <Route exact path={ROUTES.SIGNUP} component={SignupPage} />
            <Route exact path={ROUTES.COUNTING} component={CounterPage} />
            <Route component={UnknownPage} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default Home;
