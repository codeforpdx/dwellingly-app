import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

const NewProperty = ({ onChange }) => (
  <fieldset>
    <Input
      type="text"
      id="newPropertyName"
      name="newPropertyName"
      label="Property Name"
      placeholder="Property Name"
      onChange={onChange} />
    <Input
      type="text"
      id="newPropertyAddress"
      name="newPropertyAddress"
      label="Property Address"
      placeholder="Property Address"
      onChange={onChange} />
    <Input
      type="text"
      id="newPropertyCity"
      name="newPropertyCity"
      label="City"
      placeholder="City"
      onChange={onChange} />
    <Input
      type="number"
      id="newPropertyZip"
      name="newPropertyZip"
      label="Zip"
      placeholder="Zip"
      onChange={onChange} />
  </fieldset>
);

NewProperty.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default NewProperty;
