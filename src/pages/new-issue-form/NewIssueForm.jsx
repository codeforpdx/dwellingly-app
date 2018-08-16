import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import RadioArray from '../../components/input/RadioArray';
// import MessageBox from '../../components/MessageBox/MessageBox';
import Card from '../../components/Card/Card';
import { CARD_TYPES } from '../../constants/constants';
import { backURL } from '../../utils';


// import { dummyUser } from '../../data';

class NewIssueForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangingIssueType = this.handleChangingIssueType.bind(this);
    this.handleMovingToNextIssueStep = this.handleMovingToNextIssueStep.bind(this);
    this.handleSavingNote = this.handleSavingNote.bind(this);
    this.handleAddingNote = this.handleAddingNote.bind(this);
    this.handleGoingBack = this.handleGoingBack.bind(this);
    this.handleNoteInput = this.handleNoteInput.bind(this);

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
      issueNote: '',
      issueNoteDone: false,
      issueAddingAttachments: false,
      issueAddingNote: false,
      issueChangeType: false,
      issueNextStep: false,
      issueUrgancyStepDone: false,
      urgency: 'low'
    };
  }

  handleChangingIssueType() {
    this.setState(prevState => ({ issueNextStep: !prevState.issueNextStep }));
  }

  handleGoingBack() {
    if(this.state.issueAddingAttachments && !this.state.issueNoteDone) {
      this.setState(prevState => ({ issueAddingAttachments: !prevState.issueAddingAttachments }))
    } else if (this.state.issueNextStep && this.state.issueUrgancyStepDone) {
      this.setState({ issueUrgancyStepDone: false });
    } else {
      this.setState({ issueNextStep: false });
    }
  }

  handleAddingNote() {
    this.setState(prevState => ({
      issueAddingNote: !prevState.issueAddingNote
    }));
  }

  handleNoteInput(event) {
    const { target } = event
    this.setState({ issueNote: target.value })
  }

  handleSavingNote() {
    this.handleAddingNote();
    this.setState(prevState => ({ issueNoteDone: !prevState.issueNoteDone }));
  }

  handleMovingToNextIssueStep() {
    if(this.state.issueNote.length > 0) {
      this.setState({ issueAddingAttachments: true })
    } else if (this.state.issueNextStep) {
      this.setState({ issueUrgancyStepDone: true });
    } else {
      this.setState({ issueNextStep: true });
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
    const { match } = this.props;
    const backUrl = backURL(match.url, 'ongoing')
    return (
      <div className={!this.state.issueAddingAttachments ? "page" : "page page--light"}>
        <Header variant="form">
          {() => (
            <div>
              <div className="actions">
                {// Left Side Header Buttons
                  !this.state.issueChangeType && !this.state.issueNextStep ?
                    <Link
                      title="Cancel Issue"
                      className="action action--strong action--left"
                      to={backUrl}>
                      Cancel
                    </Link> :
                    null
                }
                {this.state.issueNextStep ?
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
                  !this.state.issueUrgancyStepDone || this.state.issueUrgancyStepDone && !this.state.issueAddingNote ?
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
                {
                  this.state.issueAddingNote ?
                    <button
                      type="button"
                      aria-label="Next"
                      className="action action--strong action--right"
                      onClick={this.handleSavingNote}
                      disabled={!this.state.issue}>
                      Save
                    </button> :
                  null
                }
              </div>
              <Header.Label label="New Issue" type="basic" />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          {!this.state.issueNextStep ? (
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
          {this.state.issueNextStep && !this.state.issueUrgancyStepDone ? (
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
          {this.state.issueUrgancyStepDone &&
           !this.state.issueAddingNote &&
           !this.state.issueAddingAttachments ? (
            <fieldset>
              <div className="message message--light">
                <p>
                  <strong>Step 3: Add Note</strong>
                </p>
              </div>
              <textarea placeholder="Add a note..." rows="8" value={this.state.issueNote} onChange={this.handleNoteInput} autoFocus />
              {/*
                this.state.issueNote.length > 0 ?
                  <div className="padding--1em">
                    <MessageBox message={this.state.issueNote} />
                  </div> :
                  <Input type="button" onClick={() => {this.handleAddingNote()}}>
                    Add Note
                  </Input>
              <Input type="button" url="/tickets">
                Add Photo
              </Input>
            */ }
            </fieldset>
          ) : null}
          {/* this.state.issueAddingNote ? (
            <fieldset>
              <textarea placeholder="Add a note..." rows="8" onChange={this.handleNoteInput} autoFocus />
            </fieldset>
          ) : null */}
          {this.state.issueUrgancyStepDone &&
           this.state.issueNote.length > 0 &&
           this.state.issueAddingAttachments ?
           <div className="padding--1em">
             <Card types={[CARD_TYPES.FORM]}>
               <Card.Content>
                 <div className="card__summary">
                   <p className="title">{this.state.issue}</p>
                   <p className="title">Urgancy Level <span>{this.state.urgency}</span></p>
                   <p className="msgbox">{this.state.issueNote}</p>
                 </div>
               </Card.Content>
             </Card>
           </div>
          : null}
        </section>
      </div>
    );
  }
}

NewIssueForm.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
}

export default NewIssueForm;
