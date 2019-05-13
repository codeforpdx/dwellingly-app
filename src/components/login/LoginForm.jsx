import React from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
import Input from '../input/Input';
import { FORMS, COMMON } from '../../translations/messages';

import Icon from '../icon/Icon';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);

    this.state = {
      email: '',
      password: '',
      // redirectToReferrer: false,
      submit: false,
      error: null
    };
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }

  handleError(error) {
    this.setState({ error });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submit: true });
    auth.doSignInWithEmailAndPassword(this.state.email, this.state.password);
  }

  render() {
    const { intl } = this.props;
    // const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { email, password } = this.state;
    const disableForm = email === '' || !password;

    // if (redirectToReferrer === true) {
    //   return <Redirect to={from} />;
    // }

    return (
      <section className="width-wrapper">
        <Icon className="icon--logo" icon="logo" />
        <h2 className="align--center">
          {intl.formatMessage(COMMON.APP_TITLE)}
        </h2>
        <form
          name="loginEmail"
          method="POST"
          onSubmit={this.handleSubmit}
          className="signupForm">
          <fieldset>
            <Input
              id="login-email"
              className="input--no-label"
              name="email"
              onChange={this.handleChange}
              placeholder={intl.formatMessage(FORMS.EMAIL_PLACEHOLDER)}
              type="email"
              value={this.state.email}
              variants={['full']}
            />
            <Input
              id="login-password"
              className="input--no-label"
              name="password"
              onChange={this.handleChange}
              placeholder={intl.formatMessage(FORMS.PASSWORD_PLACEHOLDER)}
              type="password"
              value={this.state.password}
              variants={['full']}
            />
          </fieldset>
          <div className="form-meta">
            <button
              className="btn btn--strong"
              disabled={disableForm && !this.state.submit}
              type="submit">
              {intl.formatMessage(FORMS.LOGIN)}
            </button>
          </div>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </section>
    );
  }
}

LoginForm.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.shape({ state: PropTypes.shape({}) })
};

LoginForm.defaultProps = {
  location: {}
};

export default injectIntl(LoginForm);
