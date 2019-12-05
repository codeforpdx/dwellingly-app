import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
import { LOGIN } from '../../translations/messages';
import Icon from '../icon/Icon';

const LoginWithGoogle = ({ intl }) => (
  <div className="form-meta">
    <button
      type="button"
      className="btn btn--lg btn--strong"
      onClick={auth.doSignInWithGoogle}>
      <Icon icon="google" /> {intl.formatMessage(LOGIN.LABEL_GOOGLE_LOGIN)}
    </button>
  </div>
);

LoginWithGoogle.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(LoginWithGoogle);
