import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

const SelectIssue = ({ issueOptions, activeStep, issue, onChange }) => (
  <fieldset className={activeStep === 'issue' ? 'active' : ''}>
    <div className="message message--light">
      <p>
        <strong>Step 1: Select Issue</strong>
      </p>
    </div>
    {issueOptions.map(option => {
      const key = Object.keys(option)[0];
      return (
        <Input
          id={`settings-issue-${key}`}
          key={key}
          label={option[key]}
          model={issue}
          name="issue"
          onChange={onChange}
          type="radio"
          value={option[key]}
        />
      );
    })}
  </fieldset>
);

SelectIssue.propTypes = {
  activeStep: PropTypes.string.isRequired,
  issueOptions: PropTypes.arrayOf(PropTypes.object),
  issue: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

SelectIssue.defaultProps = {
  issue: undefined,
  issueOptions: undefined
};

export default SelectIssue;
