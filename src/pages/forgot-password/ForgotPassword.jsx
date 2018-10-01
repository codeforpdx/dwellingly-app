import React, { Component } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import ForgotPasswordForm from '../../components/forgot-password-form/ForgotPasswordForm';
import { COMMON, FORGOT_PASSWORD } from '../../translations/messages';

class ForgotPassword extends Component {
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
                label={this.props.intl.formatMessage(FORGOT_PASSWORD.TITLE)}
                type="basic" />
            </div>
          )}
        </Header>
       
        <section className="main">
          <ForgotPasswordForm />
          <div className="width-wrapper">
            <div className="allCaps separator">{this.props.intl.formatMessage(COMMON.CONJUNCTION_OR)}</div>
            <h2>{this.props.intl.formatMessage(FORGOT_PASSWORD.HEADER_GOOGLE)}</h2>
            <p><a href="https://accounts.google.com/signin/recovery" target="_blank" rel="noopener noreferrer">{this.props.intl.formatMessage(FORGOT_PASSWORD.LINK_GOOGLE)}</a></p>
          </div>
         </section>
       </div>
    );
  }
}

ForgotPassword.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ForgotPassword);
