import React from 'react';
import renderer from 'react-test-renderer';
import SuccessModal from './SuccessModal';

const SuccessModalTest = (props) =>
<SuccessModal
{...props}
/>;

describe('SuccessModal Component', () => {
  it('correctly renders SuccessModal component', () => {
    const SuccessModalComponent = renderer.create(SuccessModalTest).toJSON();
    expect(SuccessModalComponent).toMatchSnapshot();
  });
});
