import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';
import Search from '../search/Search';

const NewProperty = ({ onChange, onSave, data, placeholder }) => (
  <fieldset onChange={onChange}>
    <Input
      type="text"
      id="newPropertyName"
      name="newPropertyName"
      label="Property Name"
      placeholder="Property Name" />
    <Input
      type="text"
      id="newPropertyAddress"
      name="newPropertyAddress"
      label="Property Address"
      placeholder="Property Address" />
    <Input
      type="text"
      id="newPropertyCity"
      name="newPropertyCity"
      label="City"
      placeholder="City" />
    <Input
      type="number"
      id="newPropertyZip"
      name="newPropertyZip"
      label="Zip"
      placeholder="Zip" />
    <Search
      searchData={data}
      placeholder={placeholder} />
    <button
      type="submit"
      onClick={onSave}
      className="btn"
      disabled={onChange}>ADD NEW PROPERTY</button>
  </fieldset>
);

NewProperty.propTypes = {
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

NewProperty.defaultProps = {
  placeholder: undefined
}

export default NewProperty;
