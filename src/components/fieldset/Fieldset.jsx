import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioArray from '../input/RadioArray';

class Fieldset extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }



  render() {
    const { type } = this.props;
    return (
      <div>
        {type === 'issueRadioArray' ?
          <fieldset>
            <div className="message message--light">
              <p>
                <strong>Step 2: Select urgency level.</strong>
              </p>
            </div>
            <div className="message">
              <p>This will help our JOIN staff prioritize open tickets.</p>
            </div>
            <RadioArray
              name="urgency"
              model={this.state.urgency}
              onChange={this.handleChange}
              options={[
                {
                  id: 'low',
                  label: 'low',
                  value: 'low'
                },
                {
                  id: 'med',
                  label: 'med',
                  value: 'med'
                },
                {
                  id: 'high',
                  label: 'high',
                  value: 'high'
                }
              ]}
            />
          </fieldset>
          : null}
        </div>
      )
  }
}

Fieldset.propTypes = {
  type: PropTypes.string,
}

Fieldset.defaultProps = {
  type: undefined,
}

export default Fieldset;
