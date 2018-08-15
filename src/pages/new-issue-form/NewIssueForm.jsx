import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import RadioArray from '../../components/input/RadioArray';

// import { dummyUser } from '../../data';


class NewIssueForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmittingIssueDescription = this.handleSubmittingIssueDescription.bind(this);
    this.handleChangingIssueType = this.handleChangingIssueType.bind(this);
    this.handleMovingToNextIssueStep = this.handleMovingToNextIssueStep.bind(this);
    this.handleSavingNote = this.handleSavingNote.bind(this);

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
      issueDescriptionDone: false,
      issueNoteDone: false,
      issueChangeType: false,
      issueNextStep: false,
      issueUrgancyStepDone: false,
      urgency: 'low'
    };
  }

  handleSubmittingIssueDescription() {
    this.setState({ issueDescriptionDone: true})
  }

  handleChangingIssueType() {
    this.setState(prevState => ({ issueNextStep: !prevState.issueNextStep }))
  }

  handleSavingNote() {
    this.setState(prevState => ({ issueNoteDone: !prevState.issueNoteDone }));
  }

  handleMovingToNextIssueStep() {
    if(this.state.issueDescriptionDone && this.state.issueNextStep) {
      this.setState({ issueUrgancyStepDone: true })
    } else {
      this.setState({ issueNextStep: true })
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
    return (
      <div className="page">
        <Header variant="form">
          {() => (
            <div>
              <div className="actions">
                {
                  !this.state.issueChangeType && !this.state.issueNextStep ?
                    <button
                      type="button"
                      aria-label="Cancel"
                      className="action action--strong action--left">
                      Cancel
                    </button> :
                    null
                }
                {this.state.issueNextStep ?
                  <button
                    type="button"
                    aria-label="Back"
                    className="action action--strong action--left"
                    onClick={this.handleChangingIssueType}>
                    Back
                  </button> :
                  null
                }
                {
                  !this.state.issueDescriptionDone ?
                    <button
                      type="button"
                      aria-label="Done"
                      className="action action--strong action--right"
                      onClick={this.handleSubmittingIssueDescription}>
                      Done
                    </button> :
                    <button
                      type="button"
                      aria-label="Next"
                      className="action action--strong action--right"
                      onClick={this.handleMovingToNextIssueStep}
                      disabled={!this.state.issue}>
                      Next
                    </button>
                }
              </div>
              <Header.Label label="New Issue" type="basic" />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          {
            !this.state.issueDescriptionDone ?
              <fieldset>
                <div className="message message--light">
                  <p>Please tell us why you are opening a new issue.</p>
                </div>
                <textarea rows="8" />
              </fieldset> :
            null
          }
          {
            this.state.issueDescriptionDone && !this.state.issueNextStep ?
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
              </fieldset> :
            null
          }
          {
            this.state.issueNextStep && !this.state.issueUrgancyStepDone ?
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
              </fieldset> :
            null
          }
          {
            this.state.issueUrgancyStepDone ?
              <fieldset>
                <div className="message message--light">
                  <p>
                    <strong>Step 3: Add attachments</strong>
                  </p>
                </div>
                <Input type="button" onClick={() => {}}>
                  Add Note
                </Input>
                <Input type="button" url="/tickets">
                  Add Photo
                </Input>
              </fieldset> :
              null
          }
        </section>
      </div>
    );
  }
}

export default NewIssueForm;
