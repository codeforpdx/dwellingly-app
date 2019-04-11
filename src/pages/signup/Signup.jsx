import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import SignupFormComponent from '../../components/signup-form/SignUpForm';
import LoginWithGoogle from '../../components/login/LoginWithGoogle';
import Spinner from '../../components/spinner/Spinner';
import { COMMON, PRIVACY, SIGNUP, TERMS } from '../../translations/messages';
import { SETTINGS } from '../../constants/constants';

import './Signup.scss';

const Signup = ({isFetchingAuthorization, isFetchingUserData, haveUser, error, intl}) => (
  <div className="main page page--signin">
    <Header>
      {() => (
        <div>
          <Navigation />
          <Header.Label 
            label={intl.formatMessage(SIGNUP.TITLE, {org: SETTINGS.ORGANIZATION, appname: SETTINGS.APP_NAME})} 
            type="basic" />
        </div>
      )}
    </Header>
    <section className="signup--email width-wrapper">
      { !isFetchingAuthorization && !isFetchingUserData &&
        <SignupFormComponent />
      }
      { (isFetchingAuthorization || isFetchingUserData) &&
        <Spinner />
      }
      { haveUser &&
        <span>
          We have a user!
        </span>
      }
    </section>
    { error && error.message.length > 0 &&
      <p className="error">
        { error.message }
      </p>
    }
    <section className="signup--google width-wrapper">
      <div className="allCaps separator">{intl.formatMessage(COMMON.CONJUNCTION_OR)}</div>
      <h2 className="align-left">
        {intl.formatMessage(SIGNUP.INSTRUCTIONS_GOOGLE)}
      </h2>
      <LoginWithGoogle />
    </section>
    <section className="width-wrapper">
      <p className="signup-conditions align-left">{intl.formatMessage(SIGNUP.INSTRUCTIONS)} <Link to="/terms-conditions">{intl.formatMessage(TERMS.TITLE)}</Link> {intl.formatMessage(COMMON.CONJUNCTION_AND)} <Link to="/privacy-policy">{intl.formatMessage(PRIVACY.TITLE_STANDALONE)}</Link>.</p>
    </section>
  </div>
);

const mapStateToProps = ({ user }) => ({
  isFetchingAuthorization: user.isFetchingAuthorization,
  isFetchingUserData: user.isFetchingUserData,
  haveUser: user.haveUser,
  error: user.error,
});

Signup.propTypes = {
  intl: intlShape.isRequired,
  isFetchingAuthorization: PropTypes.bool.isRequired,
  isFetchingUserData: PropTypes.bool.isRequired,
  haveUser: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    code: PropTypes.string,
    message: PropTypes.string
  }),
};

Signup.defaultProps = {
  error: {
    code: null,
    message: null,
  }
}

export default connect(
  mapStateToProps,
)(injectIntl(Signup));

