import React from 'react';
import Input from '../../components/input/Input';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import SuccessModal from '../../components/success-modal/SuccessModal';
import Navigation from '../../components/navigation/Navigation';

import renderer from 'react-test-renderer';
// import NewPropertyForm from './NewPropertyForm';

const ConfirmationModalTest = (props) =>
<ConfirmationModal
{...props}
/>;

const SuccessModalTest = (props) =>
<SuccessModal
{...props}
/>;

const SearchComponentTest = (props) =>
<Search
{...defaultProps}
{...props}
/>;

const NavigationComponentTest = (props) =>
<Navigation
{...defaultProps}
{...props}
/>;

describe('Input Component', () => {
  it('correctly renders Input component', () => {
    const InputComponent = renderer.create(<Input />).toJSON();
    expect(InputComponent).toMatchSnapshot();
  });
});

describe('Header Component', () => {
  it('correctly renders Header component', () => {
    const HeaderComponent = renderer.create(<Header />).toJSON();
    expect(HeaderComponent).toMatchSnapshot();
  });
});

describe('Search Component', () => {
  it('correctly renders Search component', () => {
    const SearchComponent = renderer.create(SearchComponentTest).toJSON();
    expect(SearchComponent).toMatchSnapshot();
  });
});

describe('ConfirmationModal Component', () => {
  it('correctly renders ConfirmationModal component', () => {
    const ConfirmationModalComponent = renderer.create(ConfirmationModalTest).toJSON();
    expect(ConfirmationModalComponent).toMatchSnapshot();
  });

  it('renders component when show prop is true', () => {
    const props = {
            show: true
        },
    ConfirmationModalComponent = mount(<ConfirmationModal {...props} />).find('.full-window-modal');
    expect(ConfirmationModalComponent.hasClass('full-window-modal')).toEqual(true);
  });
});

describe('SuccessModal Component', () => {
  it('correctly renders SuccessModal component', () => {
    const SuccessModalComponent = renderer.create(SuccessModalTest).toJSON();
    expect(SuccessModalComponent).toMatchSnapshot();
  });
});

describe('Navigation Component', () => {
  it('correctly renders Navigation component', () => {
    const NavigationComponent = renderer.create(NavigationComponentTest).toJSON();
    expect(NavigationComponent).toMatchSnapshot();
  });
});
