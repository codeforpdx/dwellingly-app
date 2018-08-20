import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import Header from '../header/Header';
import Input from '../input/Input';
import { ROUTES } from '../../constants/constants';
import { FORMS } from '../../translations/messages';

import './EmergencyNumberForm.scss';

class FormCreateEmergencyNumber extends React.Component {
  static handleSubmit(event) {
    if (event) event.preventDefault();
    return <Redirect to={ROUTES.ADMIN} />;
  }

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      title: '',
      number01: '',
      number02: '',
      sortOrder: 0,
      submit: false,
      error: null
    };
  }

  handleInputChange(event) {
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

  render() {
    const { intl } = this.props;

    const disableForm = (this.state.title === '' || !this.state.number01);

    return (
      <form
        name="createEmergencyNumber"
        method="POST"
        onSubmit={FormCreateEmergencyNumber.handleSubmit}
        className="page">
        <Header variant="form">
          {() => (
            <div>
              <div className="actions">
                <Link to="/" className="action action--strong action--left">
                  Cancel
                </Link>
              </div>
              <Header.Label label="Create Emergency Number" type="basic" />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <fieldset>
            <Input
              id="emergencyNumber-title"
              label="Title"
              onChange={this.handleInputChange}
              placeholder="Name or Organization"
              type="text"
              value={this.state.title}
            />
            <Input
              id="emergencyNumber-number01"
              label="Phone Number"
              onChange={this.handleInputChange}
              placeholder="ex. 503-555-1234"
              type="tel"
              value={this.state.number01}
            />
            <Input
              id="emergencyNumber-number02"
              label="Secondary Number"
              onChange={this.handleInputChange}
              placeholder="Optional"
              type="tel"
              value={this.state.number02}
            />
            <Input
              id="emergencyNumber-sortOrder"
              label="Sort Order"
              onChange={this.handleInputChange}
              placeholder="Optional"
              type="number"
              value={this.state.sortOrder}
            />
          </fieldset>
          {
            createEmergencyNumber => (
              <button
                type="submit"
                className="action action--strong action--right"
                disabled={disableForm}
                onClick={createEmergencyNumber}
              >
                {intl.formatMessage(FORMS.SUBMIT)}
              </button>
            )
          }

          { this.state.submit }
          { this.state.error
            && (
            <div className="form-meta">
              <p>
                {this.state.error}
              </p>
            </div>
            )
          }
        </section>
      </form>
    );
  }
}

FormCreateEmergencyNumber.propTypes = {
  intl: intlShape.isRequired,
};


export default withRouter(injectIntl(FormCreateEmergencyNumber));
