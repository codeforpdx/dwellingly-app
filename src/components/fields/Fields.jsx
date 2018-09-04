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
    const { label, inputTypes } = this.props;

    return (
      <fieldset>
        {inputTypes.map((inputType) =>
          <Input
            key={inputType}
            label={label}
            type={inputType}  />
        )}
      </fieldset>
    )
  }
}

Fields.propTypes = {
  label: PropTypes.string.isRequired,
  inputTypes: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired
}

export default Fields
