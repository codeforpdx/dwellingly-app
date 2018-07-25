// REACT
import React from 'react';
import ReactDOM from 'react-dom';

// REDUX, I18N, and OTHER STUFF
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// LOCAL STUFF
import { translationMessages } from './translations/i18n';
import { SETTINGS } from './constants/constants';
import store, { history } from './store';
import { getCookie, setCookie } from './utils';
import registerServiceWorker from './registerServiceWorker';


// CSS
import './index.css';

// Components, if any

// Pages
import Home from './pages/home/Home';

// Apollo setup
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Set up cookie stuff for translation
const lang = getCookie('language');
let validLang = SETTINGS.VALID_LOCALES.find(locale => locale === lang);

if (!validLang) {
  setCookie('language', SETTINGS.DEFAULT_LOCALE, SETTINGS.DAYS_LOCALE_SAVED);
  validLang = SETTINGS.DEFAULT_LOCALE;
}

// Render the thing!
ReactDOM.render(
  <IntlProvider
    locale={validLang}
    messages={translationMessages[validLang]}
  >
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Home />
        </ConnectedRouter>
      </Provider>
    </ApolloProvider>
  </IntlProvider>, document.getElementById('root'),
);
registerServiceWorker();
