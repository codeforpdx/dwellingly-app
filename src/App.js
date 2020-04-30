import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginForm } from './views/login';
import { Home } from './views/home';
import { NavMenu } from './components/NavigationMenu/navigationMenu.js';
import { Dashboard } from './views/dashboard';
import { Properties } from './views/properties';
import { Tenants } from './views/tenants';
import { Terms } from './views/terms';
import { PrivateRoute, auth } from './Auth';
import Header from './components/Header/index';
import { AddProperty } from './views/addProperty';


export const UserContext = React.createContext();

const parseJwt = ( token ) => {
  var base64Payload = token.split( '.' )[1];
  var base64 = base64Payload.replace( '-', '+' ).replace( '_', '/' );
  return JSON.parse( atob( base64 ) );
}

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userSession: {
        isAuthenticated: false,
        accessJwt: '',
        refreshJwt: '',
        identity: '',
        firstName: '',
        lastName: '',
        email: ''
      }
    }
  }

  componentDidMount() {
    if( this.checkForStoredAccessToken() ) {
      let parsedJwt = parseJwt(window.localStorage[ 'dwellinglyAccess' ]);
      this.setState({
        userSession: {
          isAuthenticated: true,
          accessJwt: window.localStorage[ 'dwellinglyAccess' ],
          refreshJwt: window.localStorage[ 'dwellinglyRefresh' ],
          identity: parsedJwt.identity,
          firstName: parsedJwt.user_claims.firstName,
          lastName: parsedJwt.user_claims.lastName,
          email: parsedJwt.user_claims.email
        }
      });
    } else if( this.checkForStoredRefreshToken() ) {
      //refresh access token using refresh token
      console.log("Valid refresh token found");
    }
  }

  checkForStoredAccessToken = () => {
    var token = window.localStorage[ 'dwellinglyAccess' ];
    if(token) {
      var parsedToken = parseJwt(token);
      if(parsedToken.exp * 1000 > Date.now()) {
        return true;
      }
    }
    return false;
  }

  checkForStoredRefreshToken = () => {
    var token = window.localStorage[ 'dwellinglyRefresh' ];
    if(token) {
      var parsedToken = parseJwt(token);
      if(parsedToken.exp > Date.now()) {
        return true;
      }
    }
    return false;
  }

  login = (email, password) => {
    auth.authenticate(email, password)
      .then( response => {
        if (response) {
          window.localStorage[ 'dwellinglyAccess' ] = response.data.access_token;
          window.localStorage[ 'dwellinglyRefresh' ] = response.data.refresh_token;
          let parsedJwt = parseJwt(response.data.access_token);
          this.setState({
            userSession: {
              isAuthenticated: true,
              accessJwt: response.data.access_token,
              refreshJwt: response.data.refresh_token,
              identity: parsedJwt.identity,
              firstName: parsedJwt.user_claims.firstName,
              lastName: parsedJwt.user_claims.lastName,
              email: parsedJwt.user_claims.email
            }
          });
        }
      })
    .catch( (error) => {
      alert("Failed to login");
    })
  }

  logout = () => {
    auth.signout()
      .then( () => {
        this.setState({
          userSession: {
            isAuthenticated: false,
            accessJwt: '',
            refreshJwt: '',
            identity: '',
            firstName: '',
            lastName: '',
            email: ''
          }
        }, () => {
          window.location.replace('/login');
        })
      });
  }

  render() {
    return (
      <UserContext.Provider value={{ user: { ...this.state.userSession }, login: this.login, logout: this.logout }} >
        <BrowserRouter>
          <div className='App'>
            {this.state.userSession.isAuthenticated
              && <><NavMenu />
                  <Header /></>}
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <Route exact path='/login' component={LoginForm} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Route exact path='/terms' component={Terms} />

              <PrivateRoute exact path='/home' component={Dashboard}/>
              <PrivateRoute exact path='/add/tenant' component={Dashboard} />
              <PrivateRoute exact path='/add/property' component={AddProperty}/>
              <PrivateRoute exact path='/add/manager' component={Dashboard} />
              <PrivateRoute exact path='/manage/tenants' component={Tenants} />
              <PrivateRoute exact path='/manage/properties' component={Properties} />
              <PrivateRoute exact path='/manage/managers' component={Dashboard} />
              <PrivateRoute exact path='/tickets' component={Dashboard} />
              <PrivateRoute exact path='/reports' component={Dashboard} />
              <PrivateRoute exact path='/staff' component={Dashboard} />
              <PrivateRoute exact path='/emergency' component={Dashboard} />
              <PrivateRoute exact path='/settings' component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
