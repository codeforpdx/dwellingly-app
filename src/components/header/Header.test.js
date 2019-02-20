import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

describe('Header Component', () => {
  it('correctly renders Header component', () => {
    const HeaderComponent = renderer.create(<Header />).toJSON();
    expect(HeaderComponent).toMatchSnapshot();
  });
});
