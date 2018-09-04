import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

class Fields extends Component {
  render() {
    const { label } = this.props;
    return (
      <fieldset>
        <Input
          label={label} />
      </fieldset>
    )
  }
}

Fields.propTypes = {
  label: PropTypes.string.isRequired
}

export default Fields
