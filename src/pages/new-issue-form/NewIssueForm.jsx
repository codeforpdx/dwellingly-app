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
              <div className="actions">&nbsp;</div>
              <Header.Label label="New Issue" type="basic" />
            </div>
          )}
        </Header>

        <section className="main width-wrapper" />
      </div>
    );
  }
}

export default NewIssueForm;
