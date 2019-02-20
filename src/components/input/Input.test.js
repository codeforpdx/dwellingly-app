import React from 'react';
import renderer from 'react-test-renderer';
import Input from './Input';

describe('Input Component', () => {
  it('correctly renders Input component', () => {
    const InputComponent = renderer.create(<Input />).toJSON();
    expect(InputComponent).toMatchSnapshot();
  });
});
