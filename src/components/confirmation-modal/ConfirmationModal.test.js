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
  it('correctly renders ConfirmationModal component when show is true', () => {
    const ConfirmationModalComponent = renderer.create(<ConfirmationModal {...props}/>).toJSON();
    expect(ConfirmationModalComponent).toMatchSnapshot();
  });

  it('does not render when show prop is false', () => {
    const props = {
      show: false,
    }
    const ConfirmationModalComponent = mount(<ConfirmationModal {...props} />).find('div');
    expect(ConfirmationModalComponent).toHaveLength(0);
  });
  it('runs function on button click', () => {
    const onClickSpy = jest.fn();
    const shallowConfirmationModal = shallow(<ConfirmationModal {...props} onSubmit={onClickSpy} />);
    shallowConfirmationModal.find('button').at(0).simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
