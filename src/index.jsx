// REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

// REDUX, I18N, and OTHER STUFF
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

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
import EmergencyNumbers from './pages/admin/EmergencyNumbers';
import Emergency from './pages/emergency/Emergency';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import OutOfOffice from './pages/settings/OutOfOffice';
import Settings from './pages/settings/Settings';
import Tickets from './pages/tickets/Tickets';


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

// Render the thing!
ReactDOM.render(
  <IntlProvider locale={validLang} messages={translationMessages[validLang]}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
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
              path={ROUTES.TICKETS}
              component={StaffUser(Tickets)}
            />
            <Route path={ROUTES.LOGIN} component={Login} />
            <PrivateRoute path={ROUTES.ADMIN} component={AdminUser(Admin)} />
            <PrivateRoute path={ROUTES.ROOT} component={Home} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);
registerServiceWorker();
