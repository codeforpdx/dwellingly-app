import React from 'react';
import renderer from 'react-test-renderer';
import SuccessModal from './SuccessModal';

const SuccessModalTest = (props) =>
<SuccessModal
{...props}
/>;

describe('SuccessModal Component', () => {
  const props = {
    show: true,
  }
  it('correctly renders SuccessModal component when show is true', () => {
    const SuccessModalComponent = renderer.create(<SuccessModal {...props} />).toJSON();
    expect(SuccessModalComponent).toMatchSnapshot();
  });
  it('does not render component when show prop is false', () => {
    const props = {
      show: false,
    }
    const SuccessModalComponent = mount(<SuccessModal {...props} />).find('div');
    expect(SuccessModalComponent).toHaveLength(0);
  });
  it('runs function on button click', () => {
    const onClickSpy = jest.fn();
    const shallowSuccessModal = shallow(<SuccessModal {...props} onClick={onClickSpy} />);
    shallowSuccessModal.find('button').at(0).simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
