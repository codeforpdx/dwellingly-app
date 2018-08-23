import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import LoginForm from '../../components/login/LoginForm';
import LoginWithGoogle from '../../components/login/LoginWithGoogle';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
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
        <LoginForm />
        <section className="width-wrapper">
          <div className="allCaps separator">{this.props.intl.formatMessage(COMMON.CONJUNCTION_OR)}</div>
          <h2 className="align-left">{this.props.intl.formatMessage(LOGIN.INSTRUCTIONS_GOOGLE)}</h2>
          <LoginWithGoogle />
        </section>
        <section className="width-wrapper">
          <p className="login-conditions align-left">{this.props.intl.formatMessage(LOGIN.INSTRUCTIONS)} <Link to="/terms-conditions">{this.props.intl.formatMessage(TERMS.TITLE)}</Link> {this.props.intl.formatMessage(COMMON.CONJUNCTION_AND)} <Link to="/privacy-policy">{this.props.intl.formatMessage(PRIVACY.TITLE_STANDALONE)}</Link>.</p>
         </section>
       </div>
    );
  }
}

Login.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Login);
