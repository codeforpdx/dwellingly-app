import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import Spinner from '../../components/spinner/Spinner';
import ForgotPasswordForm from '../../components/forgot-password-form/ForgotPasswordForm';
import { ROUTES } from '../../constants/constants'; 
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
          <div className="width-wrapper">
            <p className="align-left">{this.props.intl.formatMessage(FORGOT_PASSWORD.INSTRUCTIONS_GENERAL)}</p>
          </div>
          <div className="width-wrapper">
            <h2 className="align-left">{this.props.intl.formatMessage(FORGOT_PASSWORD.HEADER_EMAIL)}</h2>
          </div>
          { !this.props.isResettingPassword && !this.props.passwordResetComplete &&
            <ForgotPasswordForm
            error={this.props.error} />
          }
          { this.props.isResettingPassword &&
            <Spinner />
          }
          { !this.props.isResettingPassword && this.props.passwordResetComplete &&
            <p>Password request submitted. Please check your email!</p>
          }
          <div className="width-wrapper">
            <Link to={ROUTES.LOGIN}>{this.props.intl.formatMessage(FORGOT_PASSWORD.RETURN_TO_LOGIN)}</Link>
          </div>
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

const mapStateToProps = ({ user }) => ({
  isResettingPassword: user.isResettingPassword,
  passwordResetComplete: user.passwordResetComplete,
  error: user.error,
});

ForgotPassword.propTypes = {
  intl: intlShape.isRequired,
  isResettingPassword: PropTypes.bool.isRequired,
  passwordResetComplete: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    
  }),
};


ForgotPassword.defaultProps = {
  error: null
};

export default connect(
  mapStateToProps,
)(injectIntl(ForgotPassword));

