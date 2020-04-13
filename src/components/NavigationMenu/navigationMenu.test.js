import React from 'react';
import { shallow } from 'enzyme';
import { MenuLink, NavMenu } from './navigationMenu';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/manage/managers' }),
}));

const setUp = (Comp, props = {}) => {
  const component = shallow(<Comp {...props} />);
  return component;
};

describe('MenuLink Component', () => {
  it('should render without errors', () => {
    setUp(MenuLink, { name: 'Home', href: '/' });
  });

  it('should contain a Link component', () => {
    const component = setUp(MenuLink, { name: 'Home', href: '/' });
    const wrapper = component.find('Link');
    expect(wrapper.length).toBe(1);
  });

  it('should use the class "has-text-black" when the href prop matches the path in useLocation()', () => {
    const component = setUp(MenuLink, { name: 'Manage Managers', href: '/manage/managers' });
    const wrapper = component.find('Link');
    expect(wrapper.hasClass('has-text-black')).toBeTruthy();
  });
});

describe('NavMenu Component', () => {
  it('should render without errors', () => {
    setUp(NavMenu);
  });

  it('should include more than 10 MenuLink sub-items', () => {
    const component = setUp(NavMenu);
    const wrapper = component.find('MenuLink');
    expect(wrapper.length).toBeGreaterThan(10);
  });
});
