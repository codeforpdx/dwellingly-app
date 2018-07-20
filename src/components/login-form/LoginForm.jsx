import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
import { FORMS } from '../../translations/messages';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      email: '',
      password: '',
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
    auth.doSignInWithEmailAndPassword(this.state.email, this.state.password);
  }

  render() {
    const { intl } = this.props;

    const disableForm = (this.state.email === '' || !this.state.password);

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
          { this.state.submit }
          <input
            type="submit"
            value={intl.formatMessage(FORMS.SUBMIT)}
            disabled={disableForm}
          />
        </form>
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

LoginForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(LoginForm);
