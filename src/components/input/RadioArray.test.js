import React from 'react';
import renderer from 'react-test-renderer';
import RadioArray from './RadioArray';

describe('RadioArray Component', () => {
  it('displays empty container without options present', () => {
    const RadioArrayComponent = renderer.create(<RadioArray />).toJSON();
    expect(RadioArrayComponent).toMatchSnapshot();
  });
  it('correctly renders radio buttons if options are present', () => {
    const props = {
      options: [{}, {}],
    }
    const RadioArrayComponent = renderer.create(<RadioArray {...props}/>).toJSON();
    expect(RadioArrayComponent).toMatchSnapshot();
  });
});
