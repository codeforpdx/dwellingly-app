import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../../components/input/Input';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import SuccessModal from '../../components/success-modal/SuccessModal';
import Navigation from '../../components/navigation/Navigation';
import NewPropertyForm from './NewPropertyForm';
import { mountWrap, mountWithIntl, shallowWithIntl } from '../../../test/testhelper';
import { injectIntl } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';


const NewPropertyFormTest = (props) =>
<NewPropertyForm
{...props}
/>;

describe('NewPropertyForm', () => {
  it('correctly renders NewPropertyForm component', () => {
    const NewPropertyFormComponent = renderer.create(NewPropertyFormTest).toJSON();
    expect(NewPropertyFormComponent).toMatchSnapshot();
  });
  // it('shallow wrapper instance should be null', () => {
  //   const wrapper = mountWithIntl(<NewPropertyForm />);
  //   const instance = wrapper.instance();
  //   expect(instance).toBeInstanceOf(NewPropertyForm);
  // });
});
