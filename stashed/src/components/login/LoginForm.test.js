import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
  it('renders correctly', () => {
    const LoginFormComponent = renderer.create(
      <IntlProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </IntlProvider>
      ).toJSON();
    expect(LoginFormComponent).toMatchSnapshot();
  });
});
