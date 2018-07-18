import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
import { FORMS } from '../../translations/messages';

import './SignUpForm.scss';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      submit: false,
      error: null,
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

  handleError(error) {
    this.setState({ error });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submit: true });
    auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password);
  }

  render() {
    const { intl } = this.props;
    // There should be some better password rules, let's burn that bridge when we come to it...
    const passwordsDoNotMatch = this.state.password
      && this.state.passwordConfirm
      && this.state.password !== this.state.passwordConfirm;

    const disableForm = (this.state.email === '' || !this.state.password || !this.state.passwordConfirm || passwordsDoNotMatch);

    return (
      <div className="dashboard">
        <h2>
          Login with email and password
        </h2>
        <form name="loginEmail" method="POST" onSubmit={this.handleSubmit} className="signupForm">
          <label htmlFor="email">
            Email
            <input name="email" type="email" value={this.state.email} onChange={this.handleInputChange} />
          </label>
          <label htmlFor="password">
            Password
            <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
          </label>
          <label htmlFor="passwordConfirm">
            Confirm Password
            <input name="passwordConfirm" type="password" value={this.state.passwordConfirm} onChange={this.handleInputChange} />
          </label>
          { this.state.submit }
          <input
            type="submit"
            value={intl.formatMessage(FORMS.SUBMIT)}
            disabled={disableForm}
          />
        </form>
        { passwordsDoNotMatch
          && (
            <p>
              Please make sure your passwords match
            </p>
          )
        }
        { this.state.error
          && (
          <p>
            {this.state.error}
          </p>
          )
        }
      </div>
    );
  }
}

SignUpForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SignUpForm);
