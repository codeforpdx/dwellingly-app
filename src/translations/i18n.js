import enLocaleData from "react-intl/locale-data/en";
import esLocaleData from "react-intl/locale-data/es";
import enTranslationMessages from "./en.json";
import esTranslationMessages from "./es.json";
import { addLocaleData } from "react-intl";
import { SETTINGS } from "../constants/constants";

addLocaleData( [
  ...enLocaleData,
  ...esLocaleData,
] );

export const formatTranslationMessages = ( locale, messages ) => {
  const defaultFormattedMessages = locale !== SETTINGS.DEFAULT_LOCALE
    ? formatTranslationMessages( SETTINGS.DEFAULT_LOCALE, enTranslationMessages )
    : {};
  return Object.keys( messages ).reduce( ( formattedMessages, key ) => {
    const formattedMessage = !messages[ key ] && locale !== SETTINGS.DEFAULT_LOCALE
      ? defaultFormattedMessages[ key ]
      : messages[ key ];
    return Object.assign( formattedMessages, { [ key ]: formattedMessage } );
  }, {} );
};

export const appLocales = [
  "en", // US English
  "es" // Spanish
];

export const translationMessages = {
  en: formatTranslationMessages( "en", enTranslationMessages ),
  es: formatTranslationMessages( "es", esTranslationMessages ),
};