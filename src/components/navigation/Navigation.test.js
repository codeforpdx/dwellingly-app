import React from 'react';
import renderer from 'react-test-renderer';
import Navigation from './Navigation';

const NavigationComponentTest = (props) =>
<Navigation
{...defaultProps}
{...props}
/>;

describe('Navigation Component', () => {
  it('correctly renders Navigation component', () => {
    const NavigationComponent = renderer.create(NavigationComponentTest).toJSON();
    expect(NavigationComponent).toMatchSnapshot();
  });
});
