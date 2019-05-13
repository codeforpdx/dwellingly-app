// REACT
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

// REDUX, I18N, and OTHER STUFF
import { IntlProvider } from 'react-intl';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Cookies from 'universal-cookie';
import Authorization from './components/authorization/Authorization';
import PrivateRoute from './components/authorization/PrivateRoute';

// LOCAL STUFF
import { translationMessages } from './translations/i18n';
import { SETTINGS, ROUTES, ROLES } from './constants/constants';
import store, { history } from './store';
import { getUserRoleString } from './utils';
import { setUserDetails } from './dux/user';
import registerServiceWorker from './registerServiceWorker';

// CSS
import './index.scss';

// Components, if any
import Navigation from './components/navigation/Navigation';
// import UserControls from './components/user-controls/UserControls';

// Pages
import Admin from './pages/admin/Admin';
import Archive from './pages/tenant-details/Archive';
import EmergencyNumbers from './pages/admin/EmergencyNumbers';
import Emergency from './pages/emergency/Emergency';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NewIssueForm from './pages/new-issue-form/NewIssueForm';
import NewTenantForm from './pages/new-tenant-form/NewTenantForm';
// import NewPropertyForm from './pages/new-property-form/NewPropertyForm';
// import NewStaffMemberForm from './pages/new-staff-member-form/NewStaffMemberForm';
import OutOfOffice from './pages/settings/OutOfOffice';
import PrivacyPolicy from './pages/privacy-policy/PrivacyPolicy';
import Properties from './pages/properties/Properties';
// import PropertyDashboard from './pages/property-dashboard/PropertyDashboard';
import PropertyDetails from './pages/property-details/PropertyDetails';
import PropertyManagers from './pages/property-managers/PropertyManagers';
// import PropertyManagerDashboard from './pages/property-manager-dashboard/PropertyManagerDashboard';
import PropertyManagerDetails from './pages/property-manager-details/PropertyManagerDetails';
// import PropertyManagerDetailsTwo from './pages/property-manager-details-two/PropertyManagerDetailsTwo';
import PropertyManagerTenantsDirectory from './pages/property-managers/PropertyManagerTenantsDirectory';
import Settings from './pages/settings/Settings';
import Signup from './pages/signup/Signup';
import Tenants from './pages/tenants/Tenants';
import TenantDetails from './pages/tenant-details/TenantDetails';
import TermsConditions from './pages/terms-conditions/TermsConditions';
import Tickets from './pages/tickets/Tickets';
import WaitingForRole from './pages/waiting-for-role/WaitingForRole';

// Code Samples/Docs
import CardSamples from './pages/code-samples/CardSamples';
import HeaderSamples from './pages/code-samples/HeaderSamples';

// mock data
// import { dummyUser } from './data';

// const user = dummyUser;

// const select = state => state.user;
// let currentValue;
// const handleChange = () => {
//   const previousValue = currentValue;
//   currentValue = select(store.getState());
//
//   if (previousValue !== currentValue) {
//     console.log(
//       'User was this: ',
//       previousValue,
//       'Now its this: ',
//       currentValue
//     );
//   }
// };
//
// const unsubscribe = store.subscribe(handleChange);
// unsubscribe();

// Set up cookie stuff for translation
const cookies = new Cookies();
const lang = cookies.get('language');

let validLang = SETTINGS.VALID_LOCALES.find(locale => locale === lang);

if (!validLang) {
  cookies.set('language', SETTINGS.DEFAULT_LOCALE, SETTINGS.DAYS_LOCALE_SAVED);
  validLang = SETTINGS.DEFAULT_LOCALE;
}

// const PropertyManagerUser = Authorization([ROLES.ADMIN, ROLES.PROPERTY_MANAGER]);
const StaffUser = Authorization([ROLES.ADMIN, ROLES.STAFF]);
const AdminUser = Authorization([ROLES.ADMIN]);
// if (role) {
// console.log(user.role);
// userRole =
// }
// Render the thing!

class App extends Component {
  constructor(props) {
    super(props);

    this.userRole = null;
  }

  componentDidMount() {
    const uid = cookies.get('messengerUserId');
    if (uid && this.props !== null) {
      this.props.setUserDetails(uid);
    }
  }

  componentDidUpdate() {
    if (this.props.user && this.props.user.user) {
      this.userRole = getUserRoleString(this.props.user.user.role, ROLES);
    }
  }

  render() {
    const role = this.userRole;
    return (
      <div className={`app ${role}`}>
        <Navigation type="desktop" user={this.props.user.user} desktopOnly />
        {/* <UserControls /> */}
        <Switch>
          <PrivateRoute
            path={ROUTES.ADMIN_EMERGENCY_NUMBERS}
            component={AdminUser(Emergency)}
          />
          <PrivateRoute
            path={ROUTES.ADMIN_EMERGENCY}
            component={AdminUser(EmergencyNumbers)}
          />
          <PrivateRoute path={ROUTES.SETTINGS} exact component={Settings} />
          <PrivateRoute
            path={ROUTES.OUT_OF_OFFICE}
            component={StaffUser(OutOfOffice)}
          />
          <PrivateRoute
            path={`${ROUTES.PROPERTIES}`}
            component={AdminUser(Properties)}
          />
          <PrivateRoute
            path={`${ROUTES.PROPERTIES}/:id`}
            component={PropertyDetails}
          />
          <PrivateRoute
            path={`${ROUTES.PROPERTY_MANAGERS}/:id/tenants`}
            exact
            component={StaffUser(PropertyManagerTenantsDirectory)}
          />
          <PrivateRoute
            path={`${ROUTES.PROPERTY_MANAGERS}/:id`}
            component={StaffUser(PropertyManagerDetails)}
          />
          <PrivateRoute
            path={ROUTES.PROPERTY_MANAGERS}
            component={StaffUser(PropertyManagers)}
          />
          <PrivateRoute
            path={`${ROUTES.TENANTS}/all`}
            exact
            component={Tenants}
          />
          <PrivateRoute
            path={ROUTES.ADD_TENANT}
            component={AdminUser(NewTenantForm)}
          />
          <PrivateRoute
            path={`${ROUTES.TENANTS}/:id/archive`}
            component={Archive}
          />
          <PrivateRoute
            path={`${ROUTES.TENANTS}/:id/issue`}
            exact
            component={NewIssueForm}
          />
          <PrivateRoute
            path={`${ROUTES.TENANTS}/:id`}
            component={TenantDetails}
          />
          <PrivateRoute path={ROUTES.TENANTS} component={Tenants} />
          <PrivateRoute path={ROUTES.TICKETS} component={StaffUser(Tickets)} />
          <PrivateRoute
            path={ROUTES.AWAITING_ROLE}
            component={WaitingForRole}
          />
          <PrivateRoute path={ROUTES.ADMIN} component={AdminUser(Admin)} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.PRIVACY} component={PrivacyPolicy} />
          <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path={ROUTES.SIGNUP} component={Signup} />
          <Route path={ROUTES.TERMS_CONDITIONS} component={TermsConditions} />
          <Route path="/code-samples/card" component={CardSamples} />
          <Route path="/code-samples/header" component={HeaderSamples} />
          <PrivateRoute path={ROUTES.ROOT} component={Home} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  setUserDetails: uid => dispatch(setUserDetails(uid)),
});

App.propTypes = {
  setUserDetails: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user: PropTypes.shape({
      role: PropTypes.shape({}),
    }),
  }),
};
App.defaultProps = {
  user: {
    user: {
      role: null,
    },
  },
};
const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

ReactDOM.render(
  <IntlProvider locale={validLang} messages={translationMessages[validLang]}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConnectedApp />
      </ConnectedRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
