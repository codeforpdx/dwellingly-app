import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
import { LOGIN } from '../../translations/messages';

const Logout = ({intl}) => (
    <button
    type="button"
    className="btn btn--lg btn--strong"
    onClick={auth.doSignOut}>
      {intl.formatMessage(LOGIN.LABEL_LOGOUT)}
  </button>
);

Logout.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Logout);