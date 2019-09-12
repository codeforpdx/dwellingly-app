import React from 'react';
import renderer from 'react-test-renderer';
import PropertyManagersList from './PropertyManagersList';

describe('PropertyManagersList Component', () => {
  it('renders empty div if no items exist', () => {
    const PropertyManagersListComponent = renderer.create(<PropertyManagersList />).toJSON();
    expect(PropertyManagersListComponent).toMatchSnapshot();
  });
});
