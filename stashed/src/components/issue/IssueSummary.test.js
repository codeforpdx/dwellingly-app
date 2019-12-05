import React from 'react';
import renderer from 'react-test-renderer';
import IssueSummary from './IssueSummary';

describe('IssueSummary Component', () => {
  it('renders correctly when issueNote prop exists', () => {
    const props = {
      issueNote: '',
    }
    const IssueSummaryComponent = renderer.create(<IssueSummary {...props}/>).toJSON();
    expect(IssueSummaryComponent).toMatchSnapshot();
  });
  it('renders issue text passed down as props', () => {
    const props = {
      issue: 'property damage',
      issueNote: '',
    }
    const IssueSummaryComponent = renderer.create(<IssueSummary {...props}/>).toJSON();
    expect(IssueSummaryComponent).toMatchSnapshot();
  });
  it('renders urgency className and text passed down as props', () => {
    const props = {
      urgency: 'high',
      issueNote: '',
    }
    const IssueSummaryComponent = renderer.create(<IssueSummary {...props}/>).toJSON();
    expect(IssueSummaryComponent).toMatchSnapshot();
  });
});
