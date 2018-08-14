import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import './EmergencyNumberForm.scss';

import { ROUTES } from '../../constants/constants';
import { FORMS } from '../../translations/messages';

class FormCreateEmergencyNumber extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      title: '',
      number01: '',
      number02: '',
      sortOrder: '',
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
    console.log('woooooo');
    this.setState({ submit: true });
  }

  render() {
    const { intl } = this.props;
    const {
      title, number01, number02, sortOrder,
    } = this.state;
    const disableForm = (title === '' || !number01);

    const POST_MUTATION = gql`
      mutation createEmergencyNum(
        $title: String!,
        $number01: String!,
        $number02: String,
        $sortOrder: Int,
      ) {
        createEmergencyNum(title: $title, number01: $number01, number02: $number02, sortOrder: $sortOrder) {
          title
          number01
          number02
          sortOrder
        }
      }
    `;
    const successRoute = ROUTES.ADMIN;

    return (
      <div className="dashboard">
        <h2>
          Create Emergency Number
        </h2>
        <form className="createEmergencyNumberForm form" name="createEmergencyNumber" method="POST" onSubmit={this.handleSubmit}>
          <div className="input inline-input">
            <label htmlFor="title">
              <span className="inline-input__label">Title</span>
              <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
            </label>
          </div>
          <div className="input inline-input">
            <label htmlFor="number01">
              <span className="inline-input__label">Number</span>
              <input name="number01" type="text" value={this.state.number01} onChange={this.handleInputChange} />
            </label>
          </div>
          <div className="input inline-input">
            <label htmlFor="number02">
              <span className="inline-input__label">Secondary Number</span>
              <input name="number02" type="text" value={this.state.number02} onChange={this.handleInputChange} />
            </label>
          </div>
          <div className="input inline-input">
            <label htmlFor="sortOrder">
              <span className="inline-input__label">Sort Order</span>
              <input name="sortOrder" type="number" value={this.state.sortOrder} onChange={this.handleInputChange} />
            </label>
          </div>

          { this.state.submit }

          <Mutation
            mutation={POST_MUTATION}
            variables={{
              title, number01, number02, sortOrder,
            }}
            onCompleted={() => this.props.history.push(successRoute)}
          >
            {
              createEmergencyNumber => (
                <button
                  type="submit"
                  className="btn btn--lg btn--strong"
                  disabled={disableForm}
                  onClick={createEmergencyNumber}
                >{intl.formatMessage(FORMS.SUBMIT)}</button>
              )
            }
          </Mutation>
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

FormCreateEmergencyNumber.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.shape({
    name: PropTypes.string,
    push: PropTypes.func,
  }),
};

FormCreateEmergencyNumber.defaultProps = {
  history: null,
};

export default withRouter(injectIntl(FormCreateEmergencyNumber));
