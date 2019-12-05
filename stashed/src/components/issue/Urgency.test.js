import React from 'react';
import renderer from 'react-test-renderer';
import Urgency from './Urgency';

describe('Urgency Component', () => {
  it('renders correctly', () => {
    const UrgencyComponent = renderer.create(<Urgency />).toJSON();
    expect(UrgencyComponent).toMatchSnapshot();
  });
  it('renders RadioArray component when type===issueRadioArray', () => {
    const props = {
      type: 'issueRadioArray',
    }
    const UrgencyComponent = renderer.create(<Urgency {...props} />).toJSON();
    expect(UrgencyComponent).toMatchSnapshot();
  });
  it('renders Input component when type===radio', () => {
    const props = {
      type: 'radio',
    }
    const UrgencyComponent = renderer.create(<Urgency {...props} />).toJSON();
    expect(UrgencyComponent).toMatchSnapshot();
  });
});
