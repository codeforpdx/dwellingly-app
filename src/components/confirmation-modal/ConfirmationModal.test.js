import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmationModal from './ConfirmationModal';

const ConfirmationModalTest = (props) =>
<ConfirmationModal
{...props}
/>;

describe('ConfirmationModal Component', () => {
  it('correctly renders ConfirmationModal component', () => {
    const ConfirmationModalComponent = renderer.create(ConfirmationModalTest).toJSON();
    expect(ConfirmationModalComponent).toMatchSnapshot();
  });

  it('renders component when show prop is true', () => {
    const props = {
      show: true,
    },
    ConfirmationModalComponent = mount(<ConfirmationModal {...props} />).find('p');
    expect(ConfirmationModalComponent.hasClass('title')).toEqual(true);
  });
});
