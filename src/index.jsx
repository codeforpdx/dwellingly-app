// REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

// REDUX, I18N, and OTHER STUFF
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Cookies from 'universal-cookie';
import Authorization from './components/authorization/Authorization';
import PrivateRoute from './components/authorization/PrivateRoute';

// LOCAL STUFF
import { translationMessages } from './translations/i18n';
import { SETTINGS, ROUTES, ROLES } from './constants/constants';
import store, { history } from './store';

import registerServiceWorker from './registerServiceWorker';

// CSS
import './index.scss';

// Components, if any
import Navigation from './components/navigation/Navigation';

// Pages
import Admin from './pages/admin/Admin';
import Archive from './pages/tenant-details/Archive';
import EmergencyNumbers from './pages/admin/EmergencyNumbers';
import Emergency from './pages/emergency/Emergency';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import OutOfOffice from './pages/settings/OutOfOffice';
import PrivacyPolicy from './pages/privacy-policy/PrivacyPolicy';
import PropertyDetails from './pages/property-details/PropertyDetails';
import PropertyManagers from './pages/property-managers/PropertyManagers';
import PropertyManagerDetails from './pages/property-manager-details/PropertyManagerDetails';
import Settings from './pages/settings/Settings';
import Signup from './pages/signup/Signup';
import Tenants from './pages/tenants/Tenants';
import TenantDetails from './pages/tenant-details/TenantDetails';
import TermsConditions from './pages/terms-conditions/TermsConditions';
import Tickets from './pages/tickets/Tickets';

// mock data
import { dummyUser } from './data';

// Set up cookie stuff for translation
const cookies = new Cookies();
const lang = cookies.get('language')
let validLang = SETTINGS.VALID_LOCALES.find(locale => locale === lang);

if (!validLang) {
  cookies.set('language', SETTINGS.DEFAULT_LOCALE, SETTINGS.DAYS_LOCALE_SAVED);
  validLang = SETTINGS.DEFAULT_LOCALE;
}

// const PropertyManagerUser = Authorization([ROLES.ADMIN, ROLES.PROPERTY_MANAGER]);
const StaffUser = Authorization([ROLES.ADMIN, ROLES.STAFF]);
const AdminUser = Authorization([ROLES.ADMIN]);
const userRole = dummyUser.role || '';

// Render the thing!
ReactDOM.render(
  <IntlProvider locale={validLang} messages={translationMessages[validLang]}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className={`app ${userRole}`}>
          <Navigation type="desktop" desktopOnly />
          <Switch>
            <PrivateRoute path={ROUTES.EMERGENCY} component={Emergency} />
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
              path={`${ROUTES.PROPERTIES}/:id`}
              component={PropertyDetails}
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
              path={`${ROUTES.TENANTS}/:id/archive`}
              component={Archive}
            />
            <PrivateRoute
              path={`${ROUTES.TENANTS}/:id`}
              component={TenantDetails}
            />
            <PrivateRoute path={ROUTES.TENANTS} component={Tenants} />
            <PrivateRoute
              path={ROUTES.TICKETS}
              component={StaffUser(Tickets)}
            />
            <PrivateRoute path={ROUTES.ADMIN} component={AdminUser(Admin)} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.PRIVACY} component={PrivacyPolicy} />
            <Route path={ROUTES.SIGNUP} component={Signup} />
            <Route path={ROUTES.TERMS_CONDITIONS} component={TermsConditions} />
            <PrivateRoute path={ROUTES.ROOT} component={Home} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);
registerServiceWorker();
