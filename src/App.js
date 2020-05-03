import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginForm } from './views/login';
import { NavMenu } from './components/NavigationMenu/navigationMenu.js';
import { Dashboard } from './views/dashboard';
import { RequestAccess } from './views/requestAccess';
import { Properties } from './views/properties';
import { Terms } from './views/terms';
import { PrivateRoute, auth, parseJwt, checkForStoredAccessToken, checkForStoredRefreshToken } from './Auth';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import { AddProperty } from './views/addProperty';
import { JoinStaff } from './views/joinStaff';


export const UserContext = React.createContext();
var refreshTimeout;

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
    if( checkForStoredAccessToken() ) {
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
      }, () => {
        this.refreshJwtPeriodically();
      });
    } else if( checkForStoredRefreshToken() ) {
      this.refreshJwtPeriodically();
    }
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
          }, () => {
          // Call to refresh the access token 3 minutes later
          setTimeout( this.refreshJwtPeriodically, 180000 )
        });
        } else {
          alert("Failed to login");
        }
      });
  }

  refreshJwtPeriodically = () => {
    auth.refreshAccess( window.localStorage[ 'dwellinglyRefresh' ] )
        .then((response) => {
          this.setState({
            userSession: {
              ...this.state.userSession,
              isAuthenticated: true,
              accessJwt: response.data.access_token,
              /*
              userId: parsedJwt.userId,
              userFirst: parsedJwt.userFirst,
              userLast: parsedJwt.userLast,
              userEmail: parsedJwt.userEmail
              */
            }
          }, () => {
            refreshTimeout && clearTimeout(refreshTimeout);
            // Call to refresh the access token 3 minutes later
            setTimeout( this.refreshJwtPeriodically, 180000 );
          })
        })
        .catch( error => {
          console.log( "Failed to refresh access token: " + error );
        } );
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
              <PrivateRoute exact path='/home' component={Dashboard} />
              <PrivateRoute exact path='/add/tenant' component={Dashboard} />
              <PrivateRoute exact path='/add/property' component={AddProperty}/>
              <PrivateRoute exact path='/add/manager' component={Dashboard} />
              <PrivateRoute exact path='/manage/tenants' component={Dashboard} />
              <PrivateRoute exact path='/manage/properties' component={Properties} />
              <PrivateRoute exact path='/manage/managers' component={Dashboard} />
              <PrivateRoute exact path='/tickets' component={Dashboard} />
              <PrivateRoute exact path='/reports' component={Dashboard} />
              <PrivateRoute exact path='/staff' component={JoinStaff} />
              <PrivateRoute exact path='/emergency' component={Dashboard} />
              <PrivateRoute exact path='/settings' component={Dashboard} />
              <PrivateRoute exact path='/request-access/:id' component={RequestAccess} />
            </Switch>
            {this.state.userSession.isAuthenticated
              && <Footer />}
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
