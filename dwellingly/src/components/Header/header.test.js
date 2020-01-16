import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
};

describe('Header Component', () => {
  it('Should render without errors', () => {
    const component = setUp();
    const wrapper = component.find('.App-header');
    expect(wrapper.length).toBe(1);
  });

  it('Should render a logo', () => {
    const component = setUp();
    const wrapper = component.find('.App-logo');
    expect(wrapper.length).toBe(1);
  });
});
