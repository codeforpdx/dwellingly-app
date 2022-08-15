import React from "react";
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { LoginForm } from "./src/views/Login";
import SignupForm from "./src/views/Signup";
import { NavMenu } from "./src/views/NavigationMenu";
import { RequestAccess } from "./src/views/RequestAccess";
import Properties from "./src/views/PropertyList";
import EditProperty from "./src/views/EditProperty";
import Tenants from "./src/views/TenantList";
import Terms from "./src/views/Terms";
import TicketList from "./src/views/TicketList";
import Settings from "./src/views/Settings";
import ForgotPassword from "./src/views/ForgotPassword";
import EmergencyContacts from "./src/views/EmergencyContactList/EmergencyContactList";
import AddEmergencyContact from "./src/views/AddEmergencyContact";
import PrivacyPolicy from "./src/views/PrivacyPolicy";
import {
  AdminRoute,
  StaffRoute,
  PropertyManagerRoute,
  PrivateRoute,
  auth,
} from "./src/Auth";
import Header from "./src/views/Header/Header";
import Footer from "./src/views/Footer";
import { AddProperty } from "./src/views/AddProperty/index";
import EditPropertyManager from "./src/views/EditPropertyManager";
import { JoinStaffList } from "./src/views/JoinStaffList/JoinStaffList";
import { AddStaffMember } from "./src/views/AddStaffMember";
import AddTenant from "./src/views/AddTenant";
import AddPropertyManager from './src/views/AddPropertyManager';
import UserContext from "./src/contexts/UserContext";
import EditTenant from "./src/views/EditTenant";
import ChangePassword from "./src/views/ChangePassword";
import { ToastContainer } from 'react-toastify';
import NoMatch from "./src/views/NoMatch";
import AddTicket from "./src/views/AddTicket";
import Toast from "./src/utils/toast";
import PropertyManagerList from "./src/views/PropertyManagerList";
import EditStaff from "./src/views/EditStaff";
import Dashboard from "./src/views/Dashboard/Dashboard";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getCurrentState();
    this.isOpen= false;
    this.isMobile= false;
    this.previousWidth = -1;
    this.tabletWidth = 960;
  }

  updateWidth() {
    const width = window.innerWidth;
    const isMobile = width <= this.tabletWidth;
    const wasMobile = this.previousWidth <= this.tabletWidth;

    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile,
        isMobile: isMobile
      });
    }

    this.previousWidth = width;
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this));
    this.setState(this.getCurrentState())
  }

  getCurrentState = () => {
    return {
      userSession: {
        isAuthenticated: window.localStorage["authenticated"],
        firstName: window.localStorage["firstName"],
        lastName: window.localStorage["lastName"],
        phone: window.localStorage["phone"],
        email: window.localStorage["email"],
        id: window.localStorage["id"],
        type: window.localStorage["type"],
        admin: window.localStorage["admin"] === "true",
        staff: window.localStorage["staff"] === "true",
        staff_level: window.localStorage["staff_level"] === "true",
        property_manager: window.localStorage["property_manager"] === "true"
      },
      isMobile: window.innerWidth <= this.tabletWidth,
    }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  setUser = (newContext) => {
    return this.setState(newContext);
  };

  login = (email, password) => {
    auth.authenticate(email, password)
      .then(response => {
        if (response) {
          const user = response.data
          window.localStorage["authenticated"] = true,
          window.localStorage["firstName"] = user.firstName
          window.localStorage["lastName"] = user.lastName
          window.localStorage["phone"] = user.phone
          window.localStorage["email"] = user.email,
          window.localStorage["id"] = user.id,
          window.localStorage["type"] = user.type,
          window.localStorage["admin"] = user.admin,
          window.localStorage["staff"] = user.staff,
          window.localStorage["staff_level"] = user.staff_level,
          window.localStorage["property_manager"] = user.property_manager
          this.setState({
            userSession: {
              isAuthenticated: true,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
              id: user.id,
              type: user.type,
              admin: user.admin,
              staff: user.staff,
              staff_level: user.staff_level,
              property_manager: user.property_manager
            }
          })
        }
      });
  };

  logout = () => {
    auth.signout()
      .then(() => {
        this.setState({
          userSession: {
            isAuthenticated: false,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            id: "",
            type: "",
            admin: false,
            staff: false,
            staff_level: false,
            property_manager: false
          }
        }, () => {
          window.location.replace("/login")
        })
      })
  }

  apiCall = (verb, url, data, toastMessages, setErrors) => (
    axios({
      method: verb,
      url: `/api${url}`,
      data: data,
      headers: {
        "X-CSRF-Token":  document.getElementsByName("csrf-token")[0].content
      }
    })
    .then(response => {
      toastMessages.success && Toast(toastMessages.success, "success");
      return Promise.resolve(response);
    })
    .catch(error => {
      // Display the passed in error message if provided. Otherwise, display default error toast.
      if (error.response.status === 401) {
        this.logout()
      }

      // If axios receives an error information in response.data
      // then display the error information in the form itself
      // and show an error message in Toast
      if (setErrors) {
        /* setErrors is a Formik function that should be passed
         * when the api is called in the component */
        const err = Object.entries(error.response.data).reduce(
          (errorObj, [key, value]) => {
            errorObj[key] = value.join(", ")
            return (errorObj)
          }, {}
        )
        setErrors(err)
      }

      Toast(toastMessages.error ?? error.message, "error");

      return Promise.reject(error);
    })
    // since we already display the erorr message. The caller does not need to catch the returned Promise.
    // catching the rejected Promise is optional. so catch for them and return false.
    .catch(error => {
      return false
    })
  );

  render() {
    return (
      <UserContext.Provider
        value={{ user: { ...this.state.userSession },
          handleSetUser: this.setUser,
          login: this.login,
          logout: this.logout,
          apiCall: this.apiCall }} >
        <BrowserRouter>
          <div className='App'>
            <><NavMenu toggle={this.toggle} isOpen={this.state.isOpen} isMobile={this.state.isMobile} />
              <Header toggle={this.toggle} isOpen={this.state.isOpen} isMobile={this.state.isMobile} /></>

            <Switch>
              <Route exact path='/login' component={LoginForm} />
              <Route exact path='/signup' component={SignupForm} />
              <Route exact path='/terms' component={Terms} />
              <Route exact path='/privacypolicy' component={PrivacyPolicy} />
              <Route exact path='/forgot-password' component={ForgotPassword} />
              <PrivateRoute exact path='/' component={() => <Redirect to="/dashboard" />} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/home' component={() => <Redirect to="/dashboard" />} />
              <StaffRoute exact path='/add/tenant' component={AddTenant} />
              <StaffRoute exact path='/add/property' component={() => <AddProperty showPageTitle={true} showAssignPropManagers={true}/>} />
              <StaffRoute exact path='/add/manager' component={AddPropertyManager} />
              <PropertyManagerRoute exact path='/add/ticket' component={AddTicket} />
              <PropertyManagerRoute exact path='/manage/tenants' component={Tenants} />
              <PropertyManagerRoute exact path='/manage/tenants/:id' component={EditTenant} />
              <StaffRoute exact path='/add/emergencycontact' component={AddEmergencyContact} />
              <StaffRoute exact path='/edit/emergencycontact/:id' component={AddEmergencyContact} />
              <PropertyManagerRoute exact path='/manage/properties' component={Properties} />
              <PropertyManagerRoute exact path='/manage/properties/:id' component={EditProperty} />
              <StaffRoute exact path='/manage/managers' component={PropertyManagerList} />
              <StaffRoute exact path='/manage/managers/:id' component={EditPropertyManager} />
              <PropertyManagerRoute exact path='/manage/tickets' component={TicketList} />
              <StaffRoute exact path='/staff' component={JoinStaffList} />
              <AdminRoute exact path='/staff/add' component={AddStaffMember} />
              <AdminRoute exact path='/manage/staff/:id' component={EditStaff} />
              <PropertyManagerRoute exact path='/emergency' component={EmergencyContacts} />
              <PrivateRoute exact path='/settings' component={Settings} />
              <PrivateRoute exact path='/changePassword' component={ChangePassword} />
              <PrivateRoute exact path='/request-access/:id' component={RequestAccess} />
              <Route path='*' component={NoMatch} />
            </Switch>
            <Footer isMobile={this.state.isMobile} />
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
