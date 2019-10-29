import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
import { LOGIN } from '../../translations/messages';

const Logout = ({ intl, clearCookie }) => (
  <button
    type="button"
    className="btn btn--lg btn--transparent btn--strong"
    onClick={() => {
      auth.doSignOut();
      clearCookie();
    }}>
    {intl.formatMessage(LOGIN.LABEL_LOGOUT)}
  </button>
);

Logout.propTypes = {
  intl: intlShape.isRequired,
  clearCookie: PropTypes.func.isRequired
};

export default injectIntl(Logout);
