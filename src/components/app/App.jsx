import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';
import { COMMON } from '../../translations/messages';
import logo from '../../assets/images/logo.svg';
import './App.scss';

export const App = ({ intl }) => {
  const year = new Date();
  const currentYear = year.getFullYear();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
          {intl.formatMessage(COMMON.APP_TITLE)}
          &nbsp;for&nbsp;
          {currentYear}
        </h1>
      </header>
      <p>
        {intl.formatMessage(COMMON.QUESTION) }
      </p>
      <p>
        { intl.formatMessage(COMMON.ANSWER) }
      </p>
      <Link to={ROUTES.SIGNUP}>
        Sign up
      </Link>
    </div>
  );
};

App.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(App);
