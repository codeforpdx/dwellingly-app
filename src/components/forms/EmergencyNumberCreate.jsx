import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
// import { Mutation } from 'react-apollo';
// import gql from 'graphql-tag';
import Header from '../header/Header';
import Input from '../input/Input';

import './EmergencyNumberForm.scss';
import { ROUTES } from '../../constants/constants';
import { FORMS } from '../../translations/messages';

import { creatingEmergencyNumber } from '../../dux/emergencyNumbers';

class FormCreateEmergencyNumber extends React.Component {
  static handleSubmit(event) {
    if (event) event.preventDefault();
    return <Redirect to={ROUTES.ADMIN} />;
  }

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmittingNewEmergencyNumber = this.handleSubmittingNewEmergencyNumber.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      contact: '',
      phoneNumberOne: '',
      phoneNumberTwo: '',
      phoneNumberThree: '',
      // sortOrder: 0,
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

  handleSubmittingNewEmergencyNumber() {
    const { dispatch } = this.props;
    const { contact, phoneNumberOne, phoneNumberTwo, phoneNumberThree } = this.state;
    dispatch(creatingEmergencyNumber({
      contact,
      phoneNumberOne,
      phoneNumberTwo,
      phoneNumberThree
    }))
  }

  render() {
    const { intl } = this.props;
    const { contact, phoneNumberOne } = this.state;
    const disableForm = contact === '' || !phoneNumberOne;

    // const POST_MUTATION = gql`
    //   mutation createEmergencyNum(
    //     $title: String!
    //     $number01: String!
    //     $number02: String
    //     $sortOrder: Int
    //   ) {
    //     createEmergencyNum(
    //       title: $title
    //       number01: $number01
    //       number02: $number02
    //       sortOrder: $sortOrder
    //     ) {
    //       title
    //       number01
    //       number02
    //       sortOrder
    //     }
    //   }
    // `;
    // const successRoute = ROUTES.ADMIN;

    return (
      <form
        onSubmit={FormCreateEmergencyNumber.handleSubmit}
        className="page">
        <Header variant="form">
          {() => (
            <div>
              <div className="actions">
                <Link to="/" className="action action--strong action--left">
                  Cancel
                </Link>
                <button
                  className="action action--strong action--right"
                  type="submit"
                  disabled={disableForm}
                  onClick={this.handleSubmittingNewEmergencyNumber}>
                  {intl.formatMessage(FORMS.SUBMIT)}
                </button>
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
              id="emergencyNumber-number01"
              label="Phone Number"
              onChange={this.handleInputChange}
              placeholder="ex. 503-555-1234"
              name="phoneNumberOne"
              type="tel"
              value={this.state.phoneNumberOne}
            />
            <Input
              id="emergencyNumber-number02"
              label="Secondary Number"
              onChange={this.handleInputChange}
              placeholder="Optional"
              name="phoneNumberTwo"
              type="tel"
              value={this.state.phoneNumberTwo}
            />
            {/* <Input
              id="emergencyNumber-sortOrder"
              label="Sort Order"
              onChange=this.handleInputChange}
              placeholder="Optional"
              type="number"
              value=this.state.sortOrder}
            /> */}
          </fieldset>
          {this.state.submit}
          <button
            type="submit"
            className="btn btn--lg btn--strong"
            disabled={disableForm}
            onClick={this.handleSubmittingNewEmergencyNumber}
          >{intl.formatMessage(FORMS.SUBMIT)}</button>
          {/* <Mutation
            onCompleted=() => this.props.history.push(successRoute)}
          >
              createEmergencyNumber => (
              <button
                type="submit"
                className="btn btn--lg btn--strong"
                disabled=disableForm}
                onClick=createEmergencyNumber}
              >intl.formatMessage(FORMS.SUBMIT)}</button>
              )
            }
          </Mutation> */}
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
  intl: intlShape.isRequired,
  // history: PropTypes.shape({
  //   name: PropTypes.string,
  //   push: PropTypes.func
  // })
};

// FormCreateEmergencyNumber.defaultProps = {
//   history: null
// };

export default connect(null)(withRouter(injectIntl(FormCreateEmergencyNumber)));
