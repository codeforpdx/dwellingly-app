import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Header from '../header/Header';
import Input from '../input/Input';
import { ROUTES } from '../../constants/constants';
import { FORMS } from '../../translations/messages';

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
    const { title, number01, number02, sortOrder } = this.state;
    const disableForm = title === '' || !number01;

    const POST_MUTATION = gql`
      mutation createEmergencyNum(
        $title: String!
        $number01: String!
        $number02: String
        $sortOrder: Int
      ) {
        createEmergencyNum(
          title: $title
          number01: $number01
          number02: $number02
          sortOrder: $sortOrder
        ) {
          title
          number01
          number02
          sortOrder
        }
      }
    `;
    const successRoute = ROUTES.ADMIN;

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
                <Mutation
                  mutation={POST_MUTATION}
                  variables={{
                    title,
                    number01,
                    number02,
                    sortOrder
                  }}
                  onCompleted={() => this.props.history.push(successRoute)}>
                  {createEmergencyNumber => (
                    <button
                      className="action action--strong action--right"
                      type="submit"
                      disabled={disableForm}
                      onClick={createEmergencyNumber}>
                      {intl.formatMessage(FORMS.SUBMIT)}
                    </button>
                  )}
                </Mutation>
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
          {this.state.submit}

          {this.state.error && (
            <div className="form-meta">
              <p>{this.state.error}</p>
            </div>
          )}
        </section>
      </form>
    );
  }
}

FormCreateEmergencyNumber.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.shape({
    name: PropTypes.string,
    push: PropTypes.func
  })
};

FormCreateEmergencyNumber.defaultProps = {
  history: null
};

export default withRouter(injectIntl(FormCreateEmergencyNumber));
