import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { translationMessages } from "./translations/i18n";
import { SETTINGS } from "./constants/constants";
import "./index.css";
import AppComponent from "./components/app/App";
import { getCookie, setCookie } from "./utils";
import registerServiceWorker from "./registerServiceWorker";

// get and validate language
const lang = getCookie( "language" );
let validLang = SETTINGS.VALID_LOCALES.find( locale => locale === lang );

if ( !validLang ) {
  setCookie( "language", SETTINGS.DEFAULT_LOCALE, SETTINGS.DAYS_LOCALE_SAVED );
  validLang = SETTINGS.DEFAULT_LOCALE;
}

// Render the thing!
ReactDOM.render(
  <IntlProvider
    locale={ validLang }
    messages={ translationMessages[ validLang ] }
  >
    <AppComponent />
  </IntlProvider>, document.getElementById( "root" ),
);
registerServiceWorker();
