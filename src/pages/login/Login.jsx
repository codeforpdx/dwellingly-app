import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import LoginForm from '../../components/login/LoginForm';
import LoginWithGoogle from '../../components/login/LoginWithGoogle';
import Spinner from '../../components/spinner/Spinner';
import { COMMON, LOGIN, TERMS, PRIVACY } from '../../translations/messages';
import { SETTINGS } from '../../constants/constants';

import './Login.scss';

class Login extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="main page page--login">
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label 
                label={this.props.intl.formatMessage(LOGIN.TITLE, {org: SETTINGS.ORGANIZATION, appname: SETTINGS.APP_NAME})} 
                type="basic" />
            </div>
          )}
        </Header>
        { this.props.haveUser &&
          <p>WE HAVE AN ACTIVE USER (pretend we redirected away from this, we will do that once this is figured out)</p>
        }
        { !this.props.isFetchingAuthorization && ! this.props.isFetchingUserData && !this.props.haveUser &&
          <LoginForm />
        }
        { (this.props.isFetchingAuthorization || this.props.isFetchingUserData) &&
          <Spinner />
        }
        { this.props.error && this.props.error.message.length > 0 &&
          <p className="error">
            { this.props.error.message }
          </p>
        }
        { !this.props.isFetchingAuthorization && ! this.props.isFetchingUserData && !this.props.haveUser &&
          <section className="width-wrapper">
            <div className="allCaps separator">{this.props.intl.formatMessage(COMMON.CONJUNCTION_OR)}</div>
            <h2 className="align-left">{this.props.intl.formatMessage(LOGIN.INSTRUCTIONS_GOOGLE)}</h2>
            <LoginWithGoogle />
          </section>
        }
        <section className="width-wrapper">
          <p className="login-conditions align-left">{this.props.intl.formatMessage(LOGIN.INSTRUCTIONS)} <Link to="/terms-conditions">{this.props.intl.formatMessage(TERMS.TITLE)}</Link> {this.props.intl.formatMessage(COMMON.CONJUNCTION_AND)} <Link to="/privacy-policy">{this.props.intl.formatMessage(PRIVACY.TITLE_STANDALONE)}</Link>.</p>
         </section>
       </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  isFetchingAuthorization: user.isFetchingAuthorization,
  isFetchingUserData: user.isFetchingUserData,
  haveUser: user.haveUser,
  error: user.error
});

Login.propTypes = {
  intl: intlShape.isRequired,
  isFetchingAuthorization: PropTypes.bool.isRequired,
  isFetchingUserData: PropTypes.bool.isRequired,
  haveUser: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    code: PropTypes.string,
    message: PropTypes.string
  }),
};

Login.defaultProps = {
  error: {
    code: null,
    message: null,
  }
}

export default connect(
  mapStateToProps,
)(injectIntl(Login));
