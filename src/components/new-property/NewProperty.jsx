import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';
import Search from '../search/Search';

const NewProperty = ({ id, onChange, onSave, onSearch, data, placeholder }) => (
  <fieldset id={id} onChange={onChange}>
    <Input
      type="text"
      id="newPropertyName"
      name="newPropertyName"
      label="Name"
      placeholder="Property Name" />
    <Input
      type="text"
      id="newPropertyAddress"
      name="newPropertyAddress"
      label="Address"
      placeholder="Property Address" />
    <Input
      type="text"
      id="newPropertyCity"
      name="newPropertyCity"
      label="City"
      placeholder="City" />
    <Input
      type="text"
      id="newPropertyState"
      name="newPropertyState"
      label="State"
      placeholder="State" />
    <Input
      type="number"
      id="newPropertyZip"
      name="newPropertyZip"
      label="Zip"
      placeholder="Zip" />
    <Input
      type="number"
      id="newPropertyUnits"
      name="newPropertyUnits"
      label="Units"
      placeholder="Units" />
    <Search
      searchData={data}
      placeholder={placeholder}
      onSearchSelection={onSearch}
      filterSubset={["firstName", "lastName"]} />
    <button
      type="submit"
      onClick={onSave}
      className="btn">ADD NEW PROPERTY</button>
  </fieldset>
);

NewProperty.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

NewProperty.defaultProps = {
  placeholder: undefined
}

export default NewProperty;
