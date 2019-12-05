import React from 'react';
import renderer from 'react-test-renderer';
import Toggle from './Toggle';

describe('Toggle Component', () => {
  it('correctly renders Input component', () => {
    const ToggleComponent = renderer.create(<Toggle />).toJSON();
    expect(ToggleComponent).toMatchSnapshot();
  });
  it('toggles state on button click', () => {
    const wrapper = shallow(<Toggle />)
    const toggleButton = wrapper.find('button');
    toggleButton.simulate('click');
    expect(wrapper.state().toggle).toEqual(true);
  });
  it('toggles state on checkbox select', () => {
    const wrapper = shallow(<Toggle />)
    const toggleCheckbox = wrapper.find('input');
    toggleCheckbox.simulate('change');
    expect(wrapper.state().toggle).toEqual(true);
  });
});
