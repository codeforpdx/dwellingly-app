import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

const IssueSummary = ({ issue, editSummary, urgency, issueNote }) => (
  <div>
    <div className="newIssueSummaryInfo padding--1em">
      <span className="newIssueTitle title">{issue}</span>
      <span
        className="newIssueSummaryEdit"
        onClick={editSummary}
        role="presentation"
        id="issueType">
        <Icon icon="pencil" />
      </span>
    </div>
    <div className="newIssueSummaryInfo padding--1em">
      <div className="newIssueTitle">
        <span className="title">Urgency Level</span>
        <span className={`status status--${urgency}`}>{urgency}</span>
      </div>
      <span
        className="newIssueSummaryEdit"
        onClick={editSummary}
        role="presentation"
        id="urgency">
        <Icon icon="pencil" />
      </span>
    </div>
    <div className="newIssueSummaryInfo padding--1em">
      <span className="newIssueTitle msgbox">
        {issueNote.split('\n').map(i => <p>{i}</p>)}
      </span>
      <span
        className="newIssueSummaryEdit"
        onClick={editSummary}
        role="presentation"
        id="attachments">
        <Icon icon="pencil" />
      </span>
    </div>
  </div>
);

IssueSummary.propTypes = {
  issue: PropTypes.string.isRequired,
  editSummary: PropTypes.func.isRequired,
  urgency: PropTypes.string.isRequired,
  issueNote: PropTypes.string.isRequired
};

export default IssueSummary;
