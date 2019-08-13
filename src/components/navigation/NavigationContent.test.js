import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import NavigationContent from './NavigationContent';

describe('NavigationContent Component', () => {
  it('renders button when type=mobile', () => {
    const props = {
    type: 'mobile',
    user: {},
    handleToggleMenu: jest.fn,
  }
    const NavigationContentComponent = renderer.create(
      <IntlProvider>
        <MemoryRouter>
          <NavigationContent {...props} />
        </MemoryRouter>
      </IntlProvider>
      ).toJSON();
    expect(NavigationContentComponent).toMatchSnapshot();
  });
});
