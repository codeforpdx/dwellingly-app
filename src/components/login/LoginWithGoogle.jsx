import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
import { LOGIN } from '../../translations/messages';

const LoginWithGoogle = ({intl}) => (
    <button
    type="button"
    className="btn btn--lg btn--strong"
    onClick={auth.doSignInWithGoogle}>
      {intl.formatMessage(LOGIN.LABEL_GOOGLE_LOGIN)}
  </button>
);

LoginWithGoogle.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(LoginWithGoogle);