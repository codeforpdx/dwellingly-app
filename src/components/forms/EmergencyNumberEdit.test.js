import React from 'react';
import renderer from 'react-test-renderer';
import EmergencyNumberEdit from './EmergencyNumberEdit';

const EmergencyNumberEditTest = (props) =>
<EmergencyNumberEdit
{...props}
/>;


describe('EmergencyNumberEdit Component', () => {
  const props = {
    numberOne: '',
    numberTwo: '',
    numberThree: '',
  }
  it('correctly renders EmergencyNumberEdit component', () => {
    const EmergencyNumberEditComponent = renderer.create(<EmergencyNumberEdit {...props} />).toJSON();
    expect(EmergencyNumberEditComponent).toMatchSnapshot();
  });
  it('has a div with className emergencyNumberEditContainer', () => {
    const firstDiv = shallow(<EmergencyNumberEdit {...props} />).find('div').at(0);
    expect(firstDiv.hasClass('emergencyNumberEditContainer')).toEqual(true);
  });
  // it('user text is echoed onChange', () => {
  //   const wrapper = shallow(<EmergencyNumberEdit {...props} onEditingEmergencyText={() => {}} />)
  //   wrapper.find('input').at(0).simulate('change', {
  //     target: { value: '503-888-1234' }
  //   });
  //   expect(wrapper.find('input').at(0).props().value).toEqual('503-888-1234');
  // });
});
