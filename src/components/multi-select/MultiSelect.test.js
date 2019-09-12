import React from 'react';
import renderer from 'react-test-renderer';
import MultiSelect from './MultiSelect';

describe('MultiSelect Component', () => {
  it('renders correctly', () => {
    const props = {
      filterSubset: [''],
      placeholder: '',
      data: [{}],
    }
    const MultiSelectComponent = renderer.create(<MultiSelect {...props} /> ).toJSON();
    expect(MultiSelectComponent).toMatchSnapshot();
  });
});
