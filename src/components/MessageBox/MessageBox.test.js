import React from 'react';
import renderer from 'react-test-renderer';
import MessageBox from './MessageBox';

describe('MessageBox Component', () => {
  const props = {
    user: '',
    message: '',
  };

  it('renders correctly', () => {
    const MessageBoxComponent = renderer.create(<MessageBox {...props}/>).toJSON();
    expect(MessageBoxComponent).toMatchSnapshot();
  });
});
