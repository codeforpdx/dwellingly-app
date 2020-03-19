import React from 'react';
import { shallow } from 'enzyme';
import { MenuLink, NavMenu } from './navigationMenu';

const setUp = (Comp, props = {}) => {
  const component = shallow(<Comp {...props} />);
  return component;
};

describe('MenuLink Component', () => {
  it('should render without errors', () => {
    setUp(MenuLink, { name: 'Home', href: '/' });
  });

  it.skip('should contain a link', () => {
    const component = setUp(MenuLink);
    const wrapper = component.find('a');
    expect(wrapper.length).toBe(1);
  });
});

describe('NavMenu Component', () => {
  it('should render without errors', () => {
    setUp(NavMenu);
  });

  it('should include at least 10 MenuLink sub-items', () => {
    const component = setUp(NavMenu);
    const wrapper = component.find('MenuLink');
    expect(wrapper.length).toBeGreaterThan(10);
  });
});
