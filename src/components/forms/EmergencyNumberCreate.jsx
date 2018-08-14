import React from 'react';

import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';

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

    const disableForm = (this.state.title === '' || !this.state.number01);


    return (
      <div className="dashboard">
        <h2>
          Create Emergency Number
        </h2>
        <form name="createEmergencyNumber" method="POST" onSubmit={this.handleSubmit} className="form">
          <label htmlFor="title">
            Title
            <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
          </label>
          <label htmlFor="number01">
            Number
            <input name="number01" type="text" value={this.state.number01} onChange={this.handleInputChange} />
          </label>
          <label htmlFor="number02">
            Secondary Number
            <input name="number02" type="text" value={this.state.number02} onChange={this.handleInputChange} />
          </label>
          <label htmlFor="sortOrder">
            Sort Order
            <input name="sortOrder" type="number" value={this.state.sortOrder} onChange={this.handleInputChange} />
          </label>

          { this.state.submit }
                <input
                  type="submit"
                  value={intl.formatMessage(FORMS.SUBMIT)}
                  disabled={disableForm}
                  onClick={this.handleSubmit}
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

FormCreateEmergencyNumber.propTypes = {
  intl: intlShape.isRequired,
};


export default withRouter(injectIntl(FormCreateEmergencyNumber));
