import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';
import RadioArray from '../input/RadioArray';

const options = [
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
];

const Urgency = ({ type, activeStep, urgency, onChange }) => (
  <fieldset className={activeStep === 'urgency' ? 'active' : ''}>
    <div className="message message--light">
      <p>
        <strong>Step 2: Select urgency level.</strong>
      </p>
    </div>
    <div className="message">
      <p>This will help our JOIN staff prioritize open tickets.</p>
    </div>
    {type === 'issueRadioArray' && (
      <RadioArray
        name="urgency"
        model={urgency}
        onChange={onChange}
        options={options}
      />
    )}
    {type === 'radio' &&
      options.map(option => (
        <Input
          id={`settings-issue-${option.label}`}
          key={option.id}
          label={option.label}
          model={urgency}
          name="urgency"
          onChange={onChange}
          type="radio"
          value={option.value}
        />
      ))}
  </fieldset>
);

Urgency.propTypes = {
  activeStep: PropTypes.string.isRequired,
  type: PropTypes.string,
  urgency: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

Urgency.defaultProps = {
  type: undefined
};

export default Urgency;
