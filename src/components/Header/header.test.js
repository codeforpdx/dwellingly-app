import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

import dwellinglylogo from '../../assets/images/dwellingly_logo_white.png';

const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
};

describe('Header Component', () => {
  it('should render without errors', () => {
    const component = setUp();
    const wrapper = component.find('header');
    expect(wrapper.length).toBe(1);
  });

  it.skip('should render a image/logo', () => {
    const component = setUp();
    const wrapper = component.find('img');
    expect(wrapper.prop('src')).toEqual(dwellinglylogo);
  });

  it.skip('should have a gradient background', () => {
    const component = setUp();
    const wrapper = component.find('.navbar');
    expect(wrapper.hasClass('bg-gradient')).toEqual(true);
  });
});
