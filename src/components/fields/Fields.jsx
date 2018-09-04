import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { label, inputTypes, name, onChange } = this.props;

    return (
      <fieldset>
        {inputTypes.map((inputType, index) =>
          <Input
            key={inputType}
            label={label[index]}
            name={name[index]}
            onChange={onChange}
            type={inputType}  />
        )}
      </fieldset>
    )
  }
}

Fields.propTypes = {
  label: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  inputTypes: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  name: PropTypes.arrayOf(
    PropTypes.string
  ),
  onChange: PropTypes.func.isRequired
}

Fields.defaultProps = {
  name: undefined
}

export default Fields
