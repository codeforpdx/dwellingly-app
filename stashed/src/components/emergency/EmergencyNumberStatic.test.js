import React from 'react';
import renderer from 'react-test-renderer';
import EmergencyNumberStatic from './EmergencyNumberStatic';

describe('EmergencyNumberStatic Component', () => {

  it('renders phoneNumberOne if it exists', () => {
    const props = {
      emergency: {
        phoneNumberOne: '',
      },
      }
    const EmergencyNumberStaticComponent = renderer.create(<EmergencyNumberStatic {...props}/>).toJSON();
    expect(EmergencyNumberStaticComponent).toMatchSnapshot();
  });

  it('renders phoneNumberTwo if it exists', () => {
    const props = {
      emergency: {
        phoneNumberOne: '',
        phoneNumberTwo: '',
      },
      }
    const EmergencyNumberStaticComponent = renderer.create(<EmergencyNumberStatic {...props}/>).toJSON();
    expect(EmergencyNumberStaticComponent).toMatchSnapshot();
  });
  it('renders phoneNumberThree if it exists', () => {
    const props = {
      emergency: {
        phoneNumberOne: '',
        phoneNumberTwo: '',
        phoneNumberThree: '',
      },
      }
    const EmergencyNumberStaticComponent = renderer.create(<EmergencyNumberStatic {...props}/>).toJSON();
    expect(EmergencyNumberStaticComponent).toMatchSnapshot();
  });
});
