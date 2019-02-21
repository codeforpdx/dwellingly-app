import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Input from '../../components/input/Input';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import SuccessModal from '../../components/success-modal/SuccessModal';
import Navigation from '../../components/navigation/Navigation';
import NewPropertyForm from './NewPropertyForm';

const NewPropertyFormTest = (props) =>
<NewPropertyForm
{...props}
/>;

describe('NewPropertyForm', () => {
  it('correctly renders NewPropertyForm component', () => {
    const NewPropertyFormComponent = renderer.create(NewPropertyFormTest).toJSON();
    expect(NewPropertyFormComponent).toMatchSnapshot();
  });
});
