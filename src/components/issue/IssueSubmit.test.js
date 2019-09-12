import React from 'react';
import renderer from 'react-test-renderer';
import IssueSubmit from './IssueSubmit';

describe('IssueSubmit Component', () => {
  it('renders checkbox icon if issueSent=true', () => {
    const props = {
      issueSent: true,
    }
    const IssueSubmitComponent = renderer.create(<IssueSubmit {...props}/>).toJSON();
    expect(IssueSubmitComponent).toMatchSnapshot();
  });
  it('renders "Sent" message if issueSent=true', () => {
    const props = {
      issueSent: true,
    }
    const IssueSubmitComponent = renderer.create(<IssueSubmit {...props}/>).toJSON();
    expect(IssueSubmitComponent).toMatchSnapshot();
  });
  it('renders "Ok" button if issueSent=true and issueSentError=false', () => {
    const props = {
      issueSent: true,
      issueSentError: false,
    }
    const IssueSubmitComponent = renderer.create(<IssueSubmit {...props}/>).toJSON();
    expect(IssueSubmitComponent).toMatchSnapshot();
  });
  it('renders close icon if issueSent=false', () => {
    const props = {
      issueSent: false,
    }
    const IssueSubmitComponent = renderer.create(<IssueSubmit {...props}/>).toJSON();
    expect(IssueSubmitComponent).toMatchSnapshot();
  });
  it('renders "Error" message if issueSent=false', () => {
    const props = {
      issueSent: false,
    }
    const IssueSubmitComponent = renderer.create(<IssueSubmit {...props}/>).toJSON();
    expect(IssueSubmitComponent).toMatchSnapshot();
  });
  it('renders "Retry" button if issueSent=false & issueSentError=true', () => {
    const props = {
      issueSent: false,
      issueSentError: true,
    }
    const IssueSubmitComponent = renderer.create(<IssueSubmit {...props}/>).toJSON();
    expect(IssueSubmitComponent).toMatchSnapshot();
  });
});
