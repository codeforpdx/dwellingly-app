import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginForm } from './views/login';
import { Home } from './views/home';
import { Dashboard } from './views/dashboard';
import { Home } from './views/home';
import { Dashboard } from './views/dashboard';
import { Terms } from './views/terms';
import { PrivateRoute, auth } from './Auth';
import Header from './components/Header/index';

export const UserContext = React.createContext();

// const parseJwt = ( token ) => {
//   var base64Payload = token.split( '.' )[1];
//   var base64 = base64Payload.replace( '-', '+' ).replace( '_', '/' );
//   return JSON.parse( atob( base64 ) );
// }

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userSession: {
        isAuthenticated: false,
        accessJwt: '',
        refreshJwt: '',
        userId: '',
        userFirst: '',
        userLast: '',
        userEmail: ''
      }
    }
  }

  login = (username, password) => {
    console.log("attempting to login");
    auth.authenticate(username, password)
      .then( response => {
        if (response) {
          //let parsedJwt = parseJwt(response.access_token);
          this.setState({
            isAuthenticated: true,
            accessJwt: response.accessToken,
            refreshJwt: response.refreshToken,
            /*
            userId: parsedJwt.userId,
            userFirst: parsedJwt.userFirst,
            userLast: parsedJwt.userLast,
            userEmail: parsedJwt.userEmail
            */
          }, () => {
            console.log("Got here");
            window.location.replace("/dashboard");
          });
        }
      })
    .catch( (error) => {
      console.alert("Failed to login");
    })
  }

  logout = () => {
    auth.signout()
      .then( () => {
        this.setState({
          isAuthenticated: false,
          accessJwt: '',
          refreshJwt: '',
          userId: '',
          userFirst: '',
          userLast: '',
          userEmail: ''
        })
        window.location.replace('/login');
      });
  }

  render() {
    return (
      <UserContext.Provider value={{ user: { ...this.state.userSession }, login: this.login, logout: this.logout }} >
        <BrowserRouter>
          <div className='App'>
            <Header />

            <Switch>
              <Route exact path='/login' component={LoginForm} />
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
