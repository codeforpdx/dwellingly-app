import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Urgency from '../../components/issue/Urgency';
import SelectIssue from '../../components/issue/SelectIssue';
import Attachments from '../../components/issue/Attachments';
import IssueSummary from '../../components/issue/IssueSummary';
import IssueSubmit from '../../components/issue/IssueSubmit';
import Card from '../../components/card/Card';
import { CARD_TYPES } from '../../constants/constants';
import { backURL } from '../../utils';

import './NewIssueForm.scss';

// TODO: replace with actual call to store
// mock data
import { tenants } from '../../data';

class NewIssueForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMovingToNextIssueStep = this.handleMovingToNextIssueStep.bind(
      this
    );
    this.handleGoingBack = this.handleGoingBack.bind(this);
    this.handleNoteInput = this.handleNoteInput.bind(this);
    this.handleEditingSummary = this.handleEditingSummary.bind(this);
    this.handleSendingIssue = this.handleSendingIssue.bind(this);
    this.handleAcceptingSentSummary = this.handleAcceptingSentSummary.bind(
      this
    );

    this.tenant = tenants.find(({ id }) => id === this.props.match.params.id);
    this.issueOptions = [
      { unpaidRent: 'Unpaid Rent' },
      { otherFinancial: 'Other Financial' },
      { unauthorizedGuests: 'Unauthorized Guests' },
      { unitConditions: 'Unit Conditions' },
      { ruleViolations: 'Rule Violations' },
      { noise: 'Noise' },
      { propertyDamage: 'Property Damage' }
    ];

    this.state = {
      step: 'issue',
      issueSent: false,
      issueSentError: false,
      issueNote: '',
      urgency: 'low'
    };
  }

  handleSubmit(e) {
    if (e) e.preventDefault();
    return this;
  }

  handleEditingSummary(event) {
    const { currentTarget } = event;
    this.setState({ step: `${currentTarget.id}` });
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }

  handleGoingBack() {
    if (this.state.step === 'summary') {
      this.setState({ step: 'attachments' });
    } else if (this.state.step === 'attachments') {
      this.setState({ step: 'urgency' });
    } else {
      this.setState({ step: 'issueType' });
    }
  }

  handleSendingIssue() {
    this.setState(prevState => ({ issueSent: !prevState.issueSent }));
  }

  handleAcceptingSentSummary() {
    const { history, match } = this.props;
    history.push(backURL(match.url, 'ongoing'));
  }

  handleNoteInput(event) {
    const { target } = event;
    this.setState({ issueNote: target.value });
  }

  handleMovingToNextIssueStep() {
    if (this.state.step === 'issue') {
      this.setState({ step: 'urgency' });
    } else if (this.state.step === 'urgency') {
      this.setState({ step: 'attachments' });
    } else {
      this.setState({ step: 'summary' });
    }
  }

  render() {
    const { tenant } = this;
    const { name, address, staff } = tenant;
    const { match } = this.props;
    const backUrl = backURL(match.url, 'ongoing');
    return (
      <form
        className={`page new-issue-form${
          this.state.step === 'summary' ? ' page--light' : ''
        }`}
        onSubmit={this.handleSubmit}>
        <Header variant="form">
          {() => (
            <div>
              {this.state.step !== 'summary' ? (
                <div>
                  <div className="actions mobile-only">
                    {// Left Side Header Buttons
                    this.state.step === 'issue' ? (
                      <Link
                        title="Cancel Issue"
                        className="action action--strong action--left"
                        to={backUrl}>
                        Cancel
                      </Link>
                    ) : null}
                    {this.state.step !== 'issue' ? (
                      <button
                        type="button"
                        aria-label="Back"
                        className="action action--strong action--left"
                        onClick={this.handleGoingBack}>
                        Back
                      </button>
                    ) : null}
                    {// Right Side Header Buttons
                    this.state.step !== 'summary' ? (
                      <button
                        type="button"
                        aria-label="Next"
                        className="action action--strong action--right"
                        onClick={this.handleMovingToNextIssueStep}
                        disabled={!this.state.issue}>
                        Next
                      </button>
                    ) : null}
                  </div>
                  <Header.Label label="New Issue" type="basic" />
                </div>
              ) : (
                <div>
                  {tenant && (
                    <div>
                      <div className="actions mobile-only">
                        {this.state.step === 'summary' &&
                        !this.state.issueSent ? (
                          <div>
                            <button
                              type="button"
                              aria-label="Back"
                              className="action action--strong action--left"
                              onClick={this.handleGoingBack}>
                              Back
                            </button>
                            <button
                              type="button"
                              aria-label="Send"
                              className="action action--strong action--right"
                              onClick={this.handleSendingIssue}>
                              Send
                            </button>
                          </div>
                        ) : null}
                      </div>
                      <Header.Label type="contact">
                        {() => (
                          <div>
                            <h1>{name}</h1>
                            <p className="secondary">{address}</p>
                            {staff && (
                              <p>
                                JOIN Staff:{' '}
                                {staff.map(
                                  ({ name }, index) =>
                                    `${name}${
                                      index !== staff.length - 1 ? ', ' : ''
                                    }`
                                )}
                              </p>
                            )}
                          </div>
                        )}
                      </Header.Label>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <SelectIssue
            issueOptions={this.issueOptions}
            issue={this.state.issue}
            activeStep={this.state.step}
            onChange={this.handleChange}
          />
          <Urgency
            // type="issueRadioArray"
            type="radio"
            activeStep={this.state.step}
            onChange={this.handleChange}
            urgency={this.state.urgency}
          />
          <Attachments
            activeStep={this.state.step}
            onChange={this.handleNoteInput}
            issueNote={this.state.issueNote}
          />
          {this.state.step === 'summary' && (
            <div className="newIssueSummary padding--1em">
              <Card types={[CARD_TYPES.FORM]}>
                <Card.Content>
                  <div className="card__summary">
                    {!this.state.issueSent && !this.state.issueSentError ? (
                      <IssueSummary
                        issue={this.state.issue}
                        issueNote={this.state.issueNote}
                        editSummary={this.handleEditingSummary}
                        urgency={this.state.urgency}
                      />
                    ) : (
                      <IssueSubmit
                        issueSent={this.state.issueSent}
                        issueSentError={this.state.issueSentError}
                        onAcceptingSentSummary={this.handleAcceptingSentSummary}
                      />
                    )}
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}

          <div className="form-meta desktop-only">
            <button type="submit" className="btn btn--strong">
              Save
            </button>
          </div>
        </section>
      </form>
    );
  }
}

NewIssueForm.propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default NewIssueForm;
