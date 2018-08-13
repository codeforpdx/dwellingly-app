import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
// import { Input } from '../input/Input';
import Input from '../input/Input';
import { fakeAuth } from '../../utils';
import { FORMS } from '../../translations/messages';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);

    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false,
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
    // auth.doSignInWithEmailAndPassword(this.state.email, this.state.password);
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {
    const { intl } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { email, password, redirectToReferrer } = this.state;
    const disableForm = email === '' || !password;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <section className="main width-wrapper">
        <form
          name="loginEmail"
          method="POST"
          onSubmit={this.handleSubmit}
          className="signupForm">
          <fieldset>
            <Input
              id="login-email"
              label="Email"
              name="email"
              onChange={this.handleChange}
              placeholder="Email Address"
              type="email"
              value={this.state.email}
              variants={['full']}
            />
            <Input
              id="login-password"
              label="Password"
              name="password"
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
              value={this.state.password}
              variants={['full']}
            />
          </fieldset>
          <div className="form-meta">
            <button
              className="btn btn--lg btn--strong btn--block"
              disabled={disableForm && this.state.submit}
              type="submit">
              {intl.formatMessage(FORMS.SUBMIT)}
            </button>
            <br />
            <br />
            <Link to="/forgot-password">Forgot Password</Link>
            <br />
            <br />
            <br />
            <button
              type="button"
              className="btn btn--lg btn--strong btn--block"
              onClick={auth.doSignInWithGoogle}>
              Login With Google
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
