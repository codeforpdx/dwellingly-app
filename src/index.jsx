import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { translationMessages } from './translations/i18n';
import { SETTINGS, ROUTES } from './constants/constants';
import store, { history } from './store';
import { getCookie, setCookie } from './utils';
import registerServiceWorker from './registerServiceWorker';

// CSS
import './index.scss';

// Components, if any

// Pages
import Emergency from './pages/emergency/Emergency';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

const lang = getCookie('language');
let validLang = SETTINGS.VALID_LOCALES.find(locale => locale === lang);

if (!validLang) {
  setCookie('language', SETTINGS.DEFAULT_LOCALE, SETTINGS.DAYS_LOCALE_SAVED);
  validLang = SETTINGS.DEFAULT_LOCALE;
}

// Render the thing!
ReactDOM.render(
  <IntlProvider locale={validLang} messages={translationMessages[validLang]}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={ROUTES.EMERGENCY} component={Emergency} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.ROOT} component={Home} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);
registerServiceWorker();
