import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

const Fields = ({ id, label, inputTypes, placeholder, onChange }) => (
  <fieldset>
    {inputTypes.map((inputType, index) =>
      <Input
        key={id[index]}
        id={`${id[index]}-${index}`}
        label={label[index]}
        name={id[index]}
        placeholder={placeholder[index]}
        onChange={onChange}
        type={inputType}  />
    )}
  </fieldset>
)

Fields.propTypes = {
  id: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  label: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  inputTypes: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  placeholder: PropTypes.arrayOf(
    PropTypes.string
  ),
  onChange: PropTypes.func.isRequired
}

Fields.defaultProps = {
  placeholder: undefined
}

export default Fields
