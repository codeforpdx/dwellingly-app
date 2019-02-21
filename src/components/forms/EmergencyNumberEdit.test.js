import React from 'react';
import renderer from 'react-test-renderer';
import EmergencyNumberEdit from './EmergencyNumberEdit';

const EmergencyNumberEditTest = (props) =>
<EmergencyNumberEdit
{...props}
/>;


describe('EmergencyNumberEdit Component', () => {
  it('correctly renders EmergencyNumberEdit component', () => {
    const EmergencyNumberEditComponent = renderer.create(EmergencyNumberEditTest).toJSON();
    expect(EmergencyNumberEditComponent).toMatchSnapshot();
  });
  it('has a div with className emergencyNumberEditContainer', () => {
    const firstDiv = shallow(<EmergencyNumberEdit numberOne='' numberTwo='' numberThree='' />).find('div').at(0);
    expect(firstDiv.hasClass('emergencyNumberEditContainer')).toEqual(true);
  });
});
