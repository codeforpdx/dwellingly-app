import React from 'react';
import PropTypes from 'prop-types';
import RadioArray from '../input/RadioArray';

const Urgency = ({ type, urgency, onChange }) => (
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
          model={urgency}
          onChange={onChange}
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



Urgency.propTypes = {
  type: PropTypes.string,
  urgency: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

Urgency.defaultProps = {
  type: undefined,
}

export default Urgency;
