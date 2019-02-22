import React from 'react';
import renderer from 'react-test-renderer';
import Input from './Input';
import InputContent from './Input';


describe('Input Component', () => {
  it('correctly renders Input component', () => {
    const InputComponent = renderer.create(<Input />).toJSON();
    expect(InputComponent).toMatchSnapshot();
  });

  it('shallow wrapper instance should be null', () => {
    const wrapper = mount(<InputContent />);
    const instance = wrapper.instance();
    expect(instance).toBeInstanceOf(InputContent);
  });
  it('renders its children', () => {
    const text = 'Click me!';
    const shallowInput = shallow(<InputContent><button>{text}</button></InputContent>);
    expect(shallowInput.contains(text)).toEqual(true);
  });
  it('handles button clicks', () => {
    const onClickSpy = jest.fn();
    const shallowInput = shallow(<InputContent><button onClick={onClickSpy}>Hi</button></InputContent>);
    shallowInput.find('button').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
