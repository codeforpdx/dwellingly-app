import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

const NewProperty = ({ onChange, id }) => (
  <fieldset id={id} onChange={onChange}>
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
  </fieldset>
);

NewProperty.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default NewProperty;
