import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
};

describe('Header Component', () => {
  it('should be true', () => {
    const foo = true;
    expect(foo).toBe(true);
  });

  it('Should render without errors', () => {
    const component = setUp();
    const wrapper = component.find('.App-header');
    expect(wrapper.length).toBe(1);
  });

  it('Should render exactly 2 images', () => {
    const component = setUp();
    const wrapper = component.find('img');
    expect(wrapper.length).toBe(2);
  });

  it('Should render a logo', () => {
    const component = setUp();
    const wrapper = component.find('.App-logo');
    expect(wrapper.length).toBe(1);
  });
});
