import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Header from '../header/Header';
import Input from '../input/Input';
import { ROUTES } from '../../constants/constants';
// import { FORMS } from '../../translations/messages';

import { creatingEmergencyNumber } from '../../dux/emergencyNumbers';

import './EmergencyNumberForm.scss';

class FormCreateEmergencyNumber extends React.Component {
  static handleSubmit(event) {
    if (event) event.preventDefault();
    return <Redirect to={ROUTES.ADMIN_EMERGENCY_NUMBERS} />;
  }

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNumberObjectChange = this.handleNumberObjectChange.bind(this);
    this.handleSubmittingNewEmergencyNumber = this.handleSubmittingNewEmergencyNumber.bind(this);
    this.handleAddingNewPhoneNumber = this.handleAddingNewPhoneNumber.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      addingNewNumber: false,
      contact: '',
      subtext: '',
      phoneNumberOne: {
        subtext: '',
        number: '',
        ext: '',
      },
      phoneNumberTwo: {
        subtext: '',
        number: '',
        ext: '',
      },
      phoneNumberThree: {
        subtext: '',
        number: '',
        ext: '',
      },
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

  handleNumberObjectChange(event) {
    const { target } = event;
    const { name } = target;
    const { parentElement } = target;
    const { value } = target;
    const targetName = name;
    const parentName = parentElement.name;
    this.setState(prevState => ({
      [parentName]: {
        ...prevState[parentName],
        [targetName]: value
      }
    }))
  }

  handleAddingNewPhoneNumber() {
    this.setState(prevState => ({addingNewNumber: !prevState.addingNewNumber}))
  }

  handleError(error) {
    this.setState({ error });
  }

  handleSubmittingNewEmergencyNumber() {
    const { dispatch } = this.props;
    const { contact, subtext, phoneNumberOne, phoneNumberTwo, phoneNumberThree } = this.state;
    dispatch(creatingEmergencyNumber({
      contact,
      subtext,
      phoneNumberOne,
      phoneNumberTwo,
      phoneNumberThree
    }));
  }

  render() {
    // const { intl } = this.props;
    const { contact, phoneNumberOne } = this.state;
    const disableForm = contact === '' || !phoneNumberOne;

    return (
      <form
        onSubmit={FormCreateEmergencyNumber.handleSubmit}
        className="page">
        <Header variant="basic">
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
              label="Contact Name"
              onChange={this.handleInputChange}
              placeholder="Name or Organization"
              type="text"
              name="contact"
              value={this.state.contact}
            />
            <Input
              id="emergencyNumber-subtext"
              label="Contact Info"
              onChange={this.handleInputChange}
              placeholder="Info about the number"
              type="text"
              name="subtext"
              value={this.state.subtext}
            />
            <fieldset name="phoneNumberOne" onChange={this.handleNumberObjectChange}>
              <Input
                id="emergencyNumber-number01"
                label="Phone Number"
                placeholder="ex. 503-555-1234"
                name="number"
                type="tel"
                value={this.state.phoneNumberOne.number}
              />
              <Input
                id="emergencyNumber-subtext01"
                label="Phone Number Title"
                placeholder="Optional"
                name="subtext"
                type="text"
                value={this.state.phoneNumberOne.subtext}
              />
              <Input
                id="emergencyNumber-ext01"
                label="Ext:"
                placeholder="Optional"
                name="ext"
                type="text"
                value={this.state.phoneNumberOne.ext}
              />
            </fieldset>
          </fieldset>
            <button
              type="button"
              className="align--left btn"
              onClick={this.handleAddingNewPhoneNumber}>
                Add new number
            </button>
          {this.state.addingNewNumber && (
            <fieldset name="phoneNumberTwo" onChange={this.handleNumberObjectChange}>
              <Input
                id="emergencyNumber-number02"
                label="Phone Number"
                placeholder="ex. 503-555-1234"
                name="number"
                type="tel"
                value={this.state.phoneNumberTwo.number}
              />
              <Input
                id="emergencyNumber-subtext02"
                label="Phone Number Title"
                placeholder="Optional"
                name="subtext"
                type="text"
                value={this.state.phoneNumberTwo.subtext}
              />
              <Input
                id="emergencyNumber-ext02"
                label="Ext:"
                placeholder="Optional"
                name="ext"
                type="text"
                value={this.state.phoneNumberTwo.ext}
              />
            </fieldset>
          )}
          {/* <Input
            id="emergencyNumber-number03"
            label="Third Number"
            onChange={this.handleInputChange}
            placeholder="Optional"
            name="phoneNumberThree"
            type="tel"
            value={this.state.phoneNumberThree}
          /> */}
          {this.state.submit}
          <button
            type="submit"
            className="btn btn--lg btn--strong"
            disabled={disableForm}
            onClick={this.handleSubmittingNewEmergencyNumber}
          >ADD EMERGENCY NUMBER</button>
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
  dispatch: PropTypes.func.isRequired,
  // intl: intlShape.isRequired,
};

export default connect(null)(withRouter(injectIntl(FormCreateEmergencyNumber)));
