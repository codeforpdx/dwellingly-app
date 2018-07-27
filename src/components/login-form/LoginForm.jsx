import React from 'react';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
import { Input } from '../input/Input';
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
    const { email, password, submit, error } = this.state;
    const disableForm = email === '' || !password;

    return (
      <section className="main">
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
              value={email}
              variants={['full']}
            />
            <Input
              id="login-password"
              label="Password"
              name="password"
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
              value={password}
              variants={['full']}
            />
          </fieldset>
          <div className="form-meta">
            <button
              className="btn btn--lg btn--strong btn--block"
              disabled={disableForm && submit}
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
        {error && <p>{error}</p>}
      </section>
    );
  }
}

LoginForm.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(LoginForm);
