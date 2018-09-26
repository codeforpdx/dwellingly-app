import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

const IssueSubmit = ({ issueSent, issueSentError, onAcceptingSentSummary }) => (
  <div className={!issueSent ? "newIssueSent error" : "newIssueSent success"}>
    {!issueSentError ? <Icon icon="checkbox" /> : <Icon icon="close" />}
    <p className="issueStatusText">{issueSent ? "Sent!" : "Error!"}</p>
    <p className="issueStatusMessage">Message status goes here. Lorem ipsum dolar set</p>
    {!issueSentError ?
    <button
      type="button"
      className="btn btn--strong summaryButton"
      onClick={onAcceptingSentSummary}>
      Ok
    </button> :
    <button
      type="button"
      className="btn btn--strong btn--urgent summaryButton"
      onClick={onAcceptingSentSummary}>
      Retry
    </button>}
  </div>
)

IssueSubmit.propTypes = {
  issueSent: PropTypes.bool.isRequired,
  issueSentError: PropTypes.bool.isRequired,
  onAcceptingSentSummary: PropTypes.func.isRequired
}

export default IssueSubmit;
