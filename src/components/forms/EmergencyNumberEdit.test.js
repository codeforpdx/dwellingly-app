import React from 'react';
import renderer from 'react-test-renderer';
import EmergencyNumberEdit from './EmergencyNumberEdit';

describe('EmergencyNumberEdit Component', () => {
  it('renders phoneNumberOne fieldset on load', () => {
    const props = {
      numberOne: {},
    }
    const EmergencyNumberEditComponent = renderer.create(<EmergencyNumberEdit {...props} />).toJSON();
    expect(EmergencyNumberEditComponent).toMatchSnapshot();
  });

  it('renders phoneNumberTwo fieldset if applicable', () => {
    const props = {
      numberOne: {},
      numberTwo: {},
    }
    const EmergencyNumberEditComponent = renderer.create(<EmergencyNumberEdit {...props} />).toJSON();
    expect(EmergencyNumberEditComponent).toMatchSnapshot();
  });
  it('renders phoneNumberThree fieldset if applicable', () => {
    const props = {
      numberOne: {},
      numberTwo: {},
      numberThree: {},
    }
    const EmergencyNumberEditComponent = renderer.create(<EmergencyNumberEdit {...props} />).toJSON();
    expect(EmergencyNumberEditComponent).toMatchSnapshot();
  });
});
