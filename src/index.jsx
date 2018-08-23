// REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

// REDUX, I18N, and OTHER STUFF
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Authorization from './components/authorization/Authorization';
import PrivateRoute from './components/authorization/PrivateRoute';

// LOCAL STUFF
import { translationMessages } from './translations/i18n';
import { SETTINGS, ROUTES, ROLES } from './constants/constants';
import store, { history } from './store';
import { getCookie, setCookie } from './utils';
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
import PropertyDetails from './pages/property-details/PropertyDetails';
import PropertyManagers from './pages/property-managers/PropertyManagers';
import PropertyManagerDetails from './pages/property-manager-details/PropertyManagerDetails';
import PropertyManagerTenantsDirectory from './pages/property-managers/PropertyManagerTenantsDirectory';
import Settings from './pages/settings/Settings';
import Tenants from './pages/tenants/Tenants';
import TenantDetails from './pages/tenant-details/TenantDetails';
import NewTenantForm from './pages/new-tenant-form/NewTenantForm';
import Tickets from './pages/tickets/Tickets';

// mock data
import { dummyUser } from './data';

// Apollo setup
const httpLink = createHttpLink({
  uri: SETTINGS.APOLLO_SERVER
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// Set up cookie stuff for translation
const lang = getCookie('language');
let validLang = SETTINGS.VALID_LOCALES.find(locale => locale === lang);

if (!validLang) {
  setCookie('language', SETTINGS.DEFAULT_LOCALE, SETTINGS.DAYS_LOCALE_SAVED);
  validLang = SETTINGS.DEFAULT_LOCALE;
}

// const PropertyManagerUser = Authorization([ROLES.ADMIN, ROLES.PROPERTY_MANAGER]);
const StaffUser = Authorization([ROLES.ADMIN, ROLES.STAFF]);
const AdminUser = Authorization([ROLES.ADMIN]);
const userRole = dummyUser.role || '';

// Render the thing!
ReactDOM.render(
  <IntlProvider locale={validLang} messages={translationMessages[validLang]}>
    <ApolloProvider client={client}>
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
                component={StaffUser(NewTenantForm)}
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
              <PrivateRoute path={ROUTES.ROOT} component={Home} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    </ApolloProvider>
  </IntlProvider>,
  document.getElementById('root')
);
registerServiceWorker();
