import React from 'react';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
import { NAVIGATION } from '../../translations/messages';
import { ROUTES } from '../../constants/constants';
import './Header.scss';

const Header = ({ intl }) => (
  <header className="appHeader">
    <div className="headerSection headerNav">
      <Link to={ROUTES.ROOT}>
        {intl.formatMessage(NAVIGATION.HOME)}
      </Link>
      &nbsp;
      <Link to={ROUTES.COUNTING}>
        {intl.formatMessage(NAVIGATION.COUNTER)}
      </Link>
    </div>
    <div className="headerSection headerLogin">
      <Link to={ROUTES.LOGIN}>
        {intl.formatMessage(NAVIGATION.LOGIN)}
      </Link>
      &nbsp;
      <Link to={ROUTES.SIGNUP}>
        {intl.formatMessage(NAVIGATION.SIGNUP)}
      </Link>
      <button type="button" onClick={auth.doSignOut}>
        Logout
      </button>
    </div>
  </header>
);

Header.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Header);
