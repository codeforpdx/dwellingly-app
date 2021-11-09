import React from "react";
import 'react-toastify/dist/ReactToastify.min.css';
import "./App.scss";
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { LoginForm } from "./views/Login";
import SignupForm from "./views/Signup";
import { NavMenu } from "./views/NavigationMenu";
import { Dashboard } from "./views/Dashboard";
import { RequestAccess } from "./views/RequestAccess";
import Properties from "./views/PropertyList";
import EditProperty from "./views/EditProperty";
import Tenants from "./views/TenantList";
import Terms from "./views/Terms";
import TicketList from "./views/TicketList";
import Settings from "./views/Settings";
import ForgotPassword from "./views/ForgotPassword";
import EmergencyContacts from "./views/EmergencyContactList";
import AddEmergencyContact from "./views/AddEmergencyContact";
import PrivacyPolicy from "./views/PrivacyPolicy";
import {
  PrivateRoute,
  auth,
  parseJwt,
  checkForStoredAccessToken,
  checkForStoredRefreshToken,
} from "./Auth";
import Header from "./views/Header";
import Footer from "./views/Footer";
import { AddProperty } from "./views/AddProperty/index";
import EditPropertyManager from "./views/EditPropertyManager";
import { JoinStaffList } from "./views/JoinStaffList";
import { AddStaffMember } from "./views/AddStaffMember";
import AddTenant from "./views/AddTenant";
import AddPropertyManager from './views/AddPropertyManager';
import UserContext from "./contexts/UserContext";
import EditTenant from "./views/EditTenant";
import ChangePassword from "./views/ChangePassword";
import { ToastContainer } from 'react-toastify';
import NoMatch from "./views/NoMatch";
import AddTicket from "./views/AddTicket";
import Toast from "./utils/toast";
import PropertyManagerList from "./views/PropertyManagerList";

var refreshTimeout;

export class App extends React.Component {
  constructor(props) {
    super(props);

    if (checkForStoredAccessToken()) {
      let parsedJwt = parseJwt(window.localStorage['dwellinglyAccess']);
      this.state = {
        userSession: {
          isAuthenticated: true,
          accessJwt: window.localStorage["dwellinglyAccess"],
          refreshJwt: window.localStorage["dwellinglyRefresh"],
          identity: parsedJwt.sub,
          firstName: parsedJwt.firstName,
          lastName: parsedJwt.lastName,
          email: parsedJwt.email,
          phone: parsedJwt.phone
        }
      };
    }
    else {
      this.state = {
        userSession: {
          isAuthenticated: false,
          accessJwt: '',
          refreshJwt: '',
          identity: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        }
      };
    }
  }

  componentDidMount() {
    if (checkForStoredAccessToken()) {
      let parsedJwt = parseJwt(window.localStorage['dwellinglyAccess']);
      this.setState(
        {
          userSession: {
            isAuthenticated: true,
            accessJwt: window.localStorage["dwellinglyAccess"],
            refreshJwt: window.localStorage["dwellinglyRefresh"],
            identity: parsedJwt.sub,
            firstName: parsedJwt.firstName,
            lastName: parsedJwt.lastName,
            email: parsedJwt.email,
            phone: parsedJwt.phone
          },
        },
        () => {
          this.refreshJwtPeriodically();
        }
      );
    } else if (checkForStoredRefreshToken()) {
      this.refreshJwtPeriodically();
    }
  }

  setUser = (newContext) => {
    return this.setState(newContext);
  };

  login = (email, password) => {
    auth.authenticate(email, password)
      .then(response => {
        if (response) {
          window.localStorage['dwellinglyAccess'] = response.data.access_token;
          window.localStorage['dwellinglyRefresh'] = response.data.refresh_token;
          let parsedJwt = parseJwt(response.data.access_token);
          this.setState({
            userSession: {
              isAuthenticated: true,
              accessJwt: response.data.access_token,
              refreshJwt: response.data.refresh_token,
              identity: parsedJwt.sub,
              firstName: parsedJwt.firstName,
              lastName: parsedJwt.lastName,
              email: parsedJwt.email,
              phone: parsedJwt.phone
            }
          }, () => {
            // Call to refresh the access token 3 minutes later
            setTimeout(this.refreshJwtPeriodically, 180000);
          });
        } else {
          this.notify('Failed to login', 'warn');
        }
      });
  };

  refreshJwtPeriodically = () => {
    auth.refreshAccess(window.localStorage['dwellinglyRefresh'])
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
          setTimeout(this.refreshJwtPeriodically, 180000);
        });
        localStorage.setItem("dwellinglyAccess", response.data.access_token);
      })
      .catch(error => {
        console.log("Failed to refresh access token: " + error);
      });
  };

  logout = () => {
    auth.signout()
      .then(() => {
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
        });
      });
  };

  apiCall = (verb, url, data, toastMessages) => (
    axios({
      method: verb,
      url: `${process.env.REACT_APP_PROXY}/api${url}`,
      data: data,
      headers: {
        'Authorization': `Bearer ${this.state.userSession.accessJwt}`
      }
    })
    .then(response => {
      // Display the passed in success message if provided. Otherwise, do not display success toast.
      toastMessages.success && Toast(toastMessages.success, "success");
      return Promise.resolve(response);
    })
    .catch(error => {
      // Display the passed in error message if provided. Otherwise, display default error toast.
      Toast(toastMessages.error ?? error.message, "error");
      return Promise.reject(error);
    })
  );

  render() {
    return (
      <UserContext.Provider
        value={{ user: { ...this.state.userSession },
        handleSetUser: this.setUser,
        refreshJWT: this.refreshJwtPeriodically,
        login: this.login,
        logout: this.logout,
        apiCall: this.apiCall }} >
        <BrowserRouter>
          <div className='App'>
            {this.state.userSession.isAuthenticated
              && <><NavMenu />
                <Header /></>}

            <Switch>
              <Route exact path='/login' component={LoginForm} />
              <Route exact path='/signup' component={SignupForm} />
              <Route exact path='/terms' component={Terms} />
              <Route exact path='/privacypolicy' component={PrivacyPolicy} />
              <Route exact path='/forgot-password' component={ForgotPassword} />
              <PrivateRoute exact path='/' component={() => <Redirect to="/dashboard" />} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/home' component={() => <Redirect to="/dashboard" />} />
              <PrivateRoute exact path='/add/tenant' component={AddTenant} />
              <PrivateRoute exact path='/add/property' component={() => <AddProperty showPageTitle={true}/>} />
              <PrivateRoute exact path='/add/manager' component={AddPropertyManager} />
              <PrivateRoute exact path='/add/ticket' component={AddTicket} />
              <PrivateRoute exact path='/manage/tenants' component={Tenants} />
              <PrivateRoute exact path='/manage/tenants/:id' component={EditTenant} />
              <PrivateRoute exact path='/add/emergencycontact' component={AddEmergencyContact} />
              <PrivateRoute exact path='/edit/emergencycontact/:id' component={AddEmergencyContact} />
              <PrivateRoute exact path='/manage/properties' component={Properties} />
              <PrivateRoute exact path='/manage/properties/:id' component={EditProperty} />
              <PrivateRoute exact path='/manage/managers' component={PropertyManagerList} />
              <PrivateRoute exact path='/manage/managers/:id' component={EditPropertyManager} />
              <PrivateRoute exact path='/manage/tickets' component={TicketList} />
              <PrivateRoute exact path='/staff' component={JoinStaffList} />
              <PrivateRoute exact path='/staff/add' component={AddStaffMember} />
              <PrivateRoute exact path='/emergency' component={EmergencyContacts} />
              <PrivateRoute exact path='/settings' component={Settings} />
              <PrivateRoute exact path='/changePassword' component={ChangePassword} />
              <PrivateRoute exact path='/request-access/:id' component={RequestAccess} />
              <Route path='*' component={NoMatch} />
            </Switch>
            {this.state.userSession.isAuthenticated
              && <Footer />}
          </div>
        </BrowserRouter>
        <ToastContainer
          position="bottom-right"
          toastClassName="toast"
          pauseOnFocusLoss
          autoClose={4000}
          hideProgressBar
          pauseOnHover
          closeOnClick
          newestOnTop
          rtl={false}
          draggable
        />
      </UserContext.Provider>
    );
  }
}

export default App;
