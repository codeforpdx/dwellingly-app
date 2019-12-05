import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

describe('Header Component', () => {
  it('correctly renders', () => {
    const HeaderComponent = renderer.create(<Header />).toJSON();
    expect(HeaderComponent).toMatchSnapshot();
  });
  it('correctly renders label passed down as props', () => {
    const props = {
      label: 'test-label',
      type: 'test-type',
      variant: 'test-variant',
    }
    const HeaderComponent = renderer.create(<Header {...props} />).toJSON();
    expect(HeaderComponent).toMatchSnapshot();
  });
});
