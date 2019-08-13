import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Navigation from './Navigation';

describe('Navigation Component', () => {
  it('renders actions div if showMenu and desktopOnly are false', () => {
    const NavigationComponent = renderer.create(
      <IntlProvider>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </IntlProvider>
      ).toJSON();
    expect(NavigationComponent).toMatchSnapshot();
  });
});
