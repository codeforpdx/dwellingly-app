import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmationModal from './ConfirmationModal';

const ConfirmationModalTest = (props) =>
<ConfirmationModal
{...props}
/>;

describe('ConfirmationModal Component', () => {
  const props = {
    show: true,
  }
  it('correctly renders ConfirmationModal component', () => {
    const ConfirmationModalComponent = renderer.create(<ConfirmationModal {...props}/>).toJSON();
    expect(ConfirmationModalComponent).toMatchSnapshot();
  });

  it('renders component when show prop is true', () => {
    const ConfirmationModalComponent = mount(<ConfirmationModal {...props} />).find('p');
    expect(ConfirmationModalComponent.hasClass('title')).toEqual(true);
  });
  it('handles clicks', () => {
    const onClickSpy = jest.fn();
    const shallowConfirmationModal = shallow(<ConfirmationModal {...props} onSubmit={onClickSpy} />);
    shallowConfirmationModal.find('button').at(0).simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
