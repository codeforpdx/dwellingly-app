import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { auth } from '../../firebase';
import Input from '../input/Input';
// import { fakeAuth } from '../../utils';

import { FORMS, FORGOT_PASSWORD } from '../../translations/messages';

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      submit: false,
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


  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submit: true });
    auth.doPasswordReset(this.state.email);
  }

  render() {
    const { intl } = this.props;
    const { email } = this.state;
    const disableForm = email === '';

    return (
      <section className="width-wrapper">
        <form
          name="forgotPasswordEmail"
          onSubmit={this.handleSubmit}
          className="forgotPasswordForm">
          <fieldset>
            <Input
              id="forgot-password-email"
              label={intl.formatMessage(FORMS.EMAIL_LABEL)}
              name="email"
              onChange={this.handleChange}
              placeholder={intl.formatMessage(FORMS.EMAIL_PLACEHOLDER)}
              type="email"
              value={this.state.email}
              variants={['full']}
            />
          </fieldset>
          <div className="form-meta">
            <button
              className="btn btn--strong"
              disabled={disableForm && !this.state.submit}
              type="submit">
              {intl.formatMessage(FORGOT_PASSWORD.LABEL_SUBMIT)}
            </button>
          </div>
        </form>
        {this.props.error && <p>{this.props.error.message}</p>}
      </section>
    );
  }
}

ForgotPasswordForm.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.shape({ state: PropTypes.shape({}) }),
  error: PropTypes.string
};

ForgotPasswordForm.defaultProps = {
  location: {},
  error: null
};

export default injectIntl(ForgotPasswordForm);
