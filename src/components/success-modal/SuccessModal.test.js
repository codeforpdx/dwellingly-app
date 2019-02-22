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
  it('correctly renders SuccessModal component', () => {
    const SuccessModalComponent = renderer.create(SuccessModalTest).toJSON();
    expect(SuccessModalComponent).toMatchSnapshot();
  });
  it('renders component when show prop is true', () => {
    const SuccessModalComponent = mount(<SuccessModal {...props} />).find('p');
    expect(SuccessModalComponent.hasClass('title')).toEqual(true);
  });
  it('handles clicks', () => {
    const onClickSpy = jest.fn();
    const shallowSuccessModal = shallow(<SuccessModal {...props} onClick={onClickSpy} />);
    shallowSuccessModal.find('button').at(0).simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
