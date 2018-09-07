import React from 'react';
import PropTypes from 'prop-types';

const Attachments = ({ issueNote, onChange }) => (
  <fieldset>
    <div className="message message--light">
      <p>
        <strong>Step 3: Add Note</strong>
      </p>
    </div>
    <textarea placeholder="Add a note..." rows="8" value={issueNote} onChange={onChange} autoFocus />
  </fieldset>
)

Attachments.propTypes = {
  issueNote: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Attachments;
