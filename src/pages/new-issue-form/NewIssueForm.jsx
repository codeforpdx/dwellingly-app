import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import RadioArray from '../../components/input/RadioArray';
import Icon from '../../components/icon/Icon';
import Card from '../../components/card/Card';
import { CARD_TYPES } from '../../constants/constants';
import { backURL } from '../../utils';

import './NewIssueForm.scss';

import { tenants } from '../../data';

class NewIssueForm extends Component {
  constructor(props) {
    super(props);

    this.tenant = tenants.find(({ id }) => id === this.props.match.params.id);

    this.handleChange = this.handleChange.bind(this);
    this.handleMovingToNextIssueStep = this.handleMovingToNextIssueStep.bind(this);
    this.handleGoingBack = this.handleGoingBack.bind(this);
    this.handleNoteInput = this.handleNoteInput.bind(this);
    this.handleEditingSummary = this.handleEditingSummary.bind(this);
    this.handleSendingIssue = this.handleSendingIssue.bind(this);
    this.handleAcceptingSentSummary = this.handleAcceptingSentSummary.bind(this);

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
      step: 'issueType',
      issueSent: false,
      issueSentError: false,
      issueNote: '',
      urgency: 'low'
    };
  }

  handleEditingSummary(event) {
    const { currentTarget } = event;
    this.setState({ step: `${currentTarget.id}` })
  }

  handleGoingBack() {
    if(this.state.step === 'summary') {
      this.setState({ step: 'attachments' })
    } else if (this.state.step === 'attachments') {
      this.setState({ step: 'urgancy' });
    } else {
      this.setState({ step: 'issueType' })
    }
  }

  handleSendingIssue() {
    this.setState(prevState => ({ issueSent: !prevState.issueSent }));
  }

  handleAcceptingSentSummary() {
    const { history, match } = this.props;
    history.push(backURL(match.url, 'ongoing'))
  }

  handleNoteInput(event) {
    const { target } = event
    this.setState({ issueNote: target.value })
  }

  handleMovingToNextIssueStep() {
    if(this.state.step === 'issueType') {
      this.setState({ step: 'urgancy' })
    } else if(this.state.step === 'urgancy') {
      this.setState({ step: 'attachments' })
    } else {
      this.setState({ step: 'summary' })
    }
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { tenant } = this;
    const { name, address, staff } = tenant;
    const { match } = this.props;
    const backUrl = backURL(match.url, 'ongoing');
    return (
      <div className={this.state.step !== 'summary' ? "page" : "page page--light"}>
          <Header variant="form">
            {() => (
              <div>
              {this.state.step !== 'summary' ?
                <div>
                  <div className="actions">
                    {// Left Side Header Buttons
                      this.state.step === 'issueType' ?
                        <Link
                          title="Cancel Issue"
                          className="action action--strong action--left"
                          to={backUrl}>
                          Cancel
                        </Link> :
                        null
                    }
                    {this.state.step !== 'issueType' ?
                      <button
                        type="button"
                        aria-label="Back"
                        className="action action--strong action--left"
                        onClick={this.handleGoingBack}>
                        Back
                      </button> :
                      null
                    }
                    {// Right Side Header Buttons
                      this.state.step !== 'summary' ?
                        <button
                          type="button"
                          aria-label="Next"
                          className="action action--strong action--right"
                          onClick={this.handleMovingToNextIssueStep}
                          disabled={!this.state.issue}>
                          Next
                        </button> :
                      null
                    }
                  </div>
                  <Header.Label label="New Issue" type="basic" />
                </div> :
                <div>
                  {tenant && (
                    <div>
                      <div className="actions">
                        {this.state.step === 'summary' &&
                        !this.state.issueSent ?
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
                          </div> :
                          null
                        }
                      </div>
                      <Header.Label type="contact">
                        {() => (
                          <div>
                            <h1>
                              {name}
                            </h1>
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
              }
              </div>
            )}
          </Header>
        <section className="main width-wrapper">
          {this.state.step === 'issueType' ? (
            <fieldset>
              <div className="message message--light">
                <p>
                  <strong>Step 1: Select Issue</strong>
                </p>
              </div>
              {this.issueOptions.map(option => {
                const key = Object.keys(option)[0];
                return (
                  <Input
                    id={`settings-issue-${key}`}
                    key={key}
                    label={option[key]}
                    model={this.state.issue}
                    name="issue"
                    onChange={this.handleChange}
                    type="radio"
                    value={option[key]}
                  />
                );
              })}
            </fieldset>
          ) : null}
          {this.state.step === 'urgancy' ? (
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
          ) : null}
          {this.state.step === 'attachments' ? (
            <fieldset>
              <div className="message message--light">
                <p>
                  <strong>Step 3: Add Note</strong>
                </p>
              </div>
              <textarea placeholder="Add a note..." rows="8" value={this.state.issueNote} onChange={this.handleNoteInput} autoFocus />
            </fieldset>
          ) : null}
          {this.state.step === 'summary' ?
           <div className="newIssueSummary padding--1em">
             <Card types={[CARD_TYPES.FORM]}>
               <Card.Content>
                 <div className="card__summary">
                   {!this.state.issueSent &&
                    !this.state.issueSentError ?
                     <div>
                       <div className="newIssueSummaryInfo padding--1em">
                         <span className="newIssueTitle title">{this.state.issue}</span>
                         <span
                           className="newIssueSummaryEdit"
                           onClick={this.handleEditingSummary}
                           role="presentation"
                           id="issueType">
                           <Icon icon="pencil" />
                         </span>
                       </div>
                       <div className="newIssueSummaryInfo padding--1em">
                         <div className="newIssueTitle">
                           <span className="title">Urgancy Level</span>
                           <span
                             className={this.state.urgency === "high" ? "status status--high" : "status"}>
                             {this.state.urgency}
                           </span>
                         </div>
                         <span
                           className="newIssueSummaryEdit"
                           onClick={this.handleEditingSummary}
                           role="presentation"
                           id="urgancy">
                           <Icon icon="pencil" />
                         </span>
                       </div>
                       <div className="newIssueSummaryInfo padding--1em">
                         <span className="newIssueTitle msgbox">
                           {this.state.issueNote.split('\n').map(i => <p>{i}</p>)}
                         </span>
                         <span
                           className="newIssueSummaryEdit"
                           onClick={this.handleEditingSummary}
                           role="presentation"
                           id="attachments">
                           <Icon icon="pencil" />
                         </span>
                       </div>
                     </div> :
                     <div className={!this.state.issueSent ? "newIssueSent error" : "newIssueSent success"}>
                       {!this.state.issueSentError ? <Icon icon="checkbox" /> : <Icon icon="close" />}
                       <p className="issueStatusText">{this.state.issueSent ? "Sent!" : "Error!"}</p>
                       {!this.state.issueSentError ?
                       <button
                         type="button"
                         className="btn btn--strong summaryButton"
                         onClick={this.handleAcceptingSentSummary}>
                         Ok
                       </button> :
                       <button
                         type="button"
                         className="btn btn--strong btn--urgent summaryButton"
                         onClick={this.handleAcceptingSentSummary}>
                         Retry
                       </button>}
                     </div>}
                 </div>
               </Card.Content>
             </Card>
           </div> : null}
        </section>
      </div>
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
}

export default NewIssueForm;
