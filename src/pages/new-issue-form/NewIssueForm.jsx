import React, { Component } from 'react';
import Header from '../../components/header/Header';

class NewIssueForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page">
        <Header variant="form">
          {() => (
            <div>
              <div className="actions">
                <button
                  type="button"
                  aria-label="Cancel"
                  className="action action--strong action--left">
                  Cancel
                </button>
                <button
                  type="button"
                  aria-label="Done"
                  className="action action--strong action--right">
                  Done
                </button>
              </div>
              <Header.Label label="New Issue" type="basic" />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <fieldset>
            <div className="message message--light">
              <p>Please tell us why you are opening a new issue.</p>
            </div>
            <textarea />
          </fieldset>
        </section>
      </div>
    );
  }
}

export default NewIssueForm;
