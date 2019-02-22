import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';
import { IntlProvider, intlShape, injectIntl } from 'react-intl';
import { mount, shallow } from 'enzyme';

// const messages = require('../locales/en'); // en.json
const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
export function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node) {
    return shallow(nodeWithIntlProp(node), { context: { intl } });
  }

  export function mountWithIntl(node) {
    return mount(nodeWithIntlProp(node), {
      context: { intl },
      childContextTypes: { intl: intlShape }
    });
  };

// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: shape({}) },
});

export function mountWrap(node) {
  return mount(node, createContext());
}
