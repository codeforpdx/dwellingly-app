import React from 'react';
import PropTypes from 'prop-types';

const Attachments = ({ issueNote, activeStep, onChange }) => (
  <fieldset className={activeStep === 'attachments' ? 'active' : ''}>
    <div className="message message--light">
      <p>
        <strong>Step 3: Add Note</strong>
      </p>
    </div>
    <textarea
      placeholder="Add a note..."
      rows="8"
      value={issueNote}
      onChange={onChange}
    />
  </fieldset>
);

Attachments.propTypes = {
  activeStep: PropTypes.string.isRequired,
  issueNote: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Attachments;
