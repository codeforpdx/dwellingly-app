import React from 'react';
import renderer from 'react-test-renderer';
import Search from './Search';

const SearchComponentTest = (props) =>
<Search
{...defaultProps}
{...props}
/>;

describe('Search Component', () => {
  it('correctly renders Search component', () => {
    const SearchComponent = renderer.create(SearchComponentTest).toJSON();
    expect(SearchComponent).toMatchSnapshot();
  });
});
