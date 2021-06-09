import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import Input from '../input/Input';
import { auth } from '../../firebase';
import { SIGNUP, FORMS } from '../../translations/messages';

import './SignUpForm.scss';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
    };
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    auth.doCreateUserWithEmailAndPassword(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password
    );
  }

  render() {
    const { intl } = this.props;
    // There should be some better password rules, let's burn that bridge when we come to it...
    const passwordsDoNotMatch = this.state.password
      && this.state.passwordConfirm
      && this.state.password !== this.state.passwordConfirm;

    const disableForm = (this.state.email === '' || !this.state.password || !this.state.passwordConfirm || passwordsDoNotMatch);

    return (
      <div className="form form--signin">
        <h2 className="align-left">
          {intl.formatMessage(SIGNUP.CREATE_ACCOUNT_EMAIL)}
        </h2>
        <form name="loginEmail"  onSubmit={this.handleSubmit} className="signupForm">
          <fieldset>
            <Input
              id="signup-firstName"
              label={intl.formatMessage(FORMS.NAME_FIRST_LABEL)}
              name="firstName"
              onChange={this.handleInputChange}
              placeholder={intl.formatMessage(FORMS.NAME_FIRST_PLACEHOLDER)}
              required
              type="text"
              value={this.state.firstName}
              variants={['full']}
            />
            <Input
              id="signup-lastName"
              label={intl.formatMessage(FORMS.NAME_LAST_LABEL)}
              name="lastName"
              onChange={this.handleInputChange}
              placeholder={intl.formatMessage(FORMS.NAME_LAST_PLACEHOLDER)}
              required
              type="text"
              value={this.state.lastName}
              variants={['full']}
            />
            <Input
              id="signup-email"
              label={intl.formatMessage(FORMS.EMAIL_LABEL)}
              name="email"
              onChange={this.handleInputChange}
              placeholder={intl.formatMessage(FORMS.EMAIL_PLACEHOLDER)}
              required
              type="email"
              value={this.state.email}
              variants={['full']}
            />
            <Input
              id="signup-password"
              label={intl.formatMessage(FORMS.PASSWORD_LABEL)}
              name="password"
              onChange={this.handleInputChange}
              placeholder={intl.formatMessage(FORMS.PASSWORD_PLACEHOLDER)}
              required
              type="password"
              value={this.state.password}
              variants={['full']}
            />
            <Input
              id="signup-password-confirm"
              label={intl.formatMessage(FORMS.PASSWORD_CONFIRM_LABEL)}
              name="passwordConfirm"
              onChange={this.handleInputChange}
              placeholder={intl.formatMessage(FORMS.PASSWORD_CONFIRM_PLACEHOLDER)}
              required
              type="password"
              value={this.state.passwordConfirm}
              variants={['full']}
            />
          </fieldset>
          { passwordsDoNotMatch
            && (
              <p>
                {intl.formatMessage(FORMS.ERROR_MATCH_PASSWORD)}
              </p>
            )
          }
          <div className="form-meta">
            <button
              className="btn btn--strong"
              type="submit"
              disabled={disableForm}
            >
              {intl.formatMessage(FORMS.CREATE_ACCOUNT)}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SignUpForm);
