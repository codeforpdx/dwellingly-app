import React from 'react';
import renderer from 'react-test-renderer';
import SelectIssue from './SelectIssue';

describe('SelectIssue Component', () => {
  it('renders correctly when issueOptions prop exists', () => {
    const props = {
      issueOptions: [{}],
    }
    const SelectIssueComponent = renderer.create(<SelectIssue {...props}/>).toJSON();
    expect(SelectIssueComponent).toMatchSnapshot();
  });
});
