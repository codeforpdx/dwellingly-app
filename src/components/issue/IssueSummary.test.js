import React from 'react';
import renderer from 'react-test-renderer';
import IssueSummary from './IssueSummary';

describe('IssueSummary Component', () => {
  it('renders checkbox icon if issueSent=true', () => {
    const props = {
      issue: '',
      urgency: '',
      issueNote: '',
    }
    const IssueSummaryComponent = renderer.create(<IssueSummary {...props}/>).toJSON();
    expect(IssueSummaryComponent).toMatchSnapshot();
  });

});
