import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

const NewPropertyManager = ({ onChange }) => (
  <fieldset>
    <Input
      type="text"
      id="newPropertyManagerFirstName"
      name="newPropertyManagerFirstName"
      label="First Name"
      placeholder="First Name"
      onChange={onChange} />
    <Input
      type="text"
      id="newPropertyManagerLastName"
      name="newPropertyManagerLastName"
      label="Last Name"
      placeholder="Last Name"
      onChange={onChange} />
    <Input
      type="tel"
      id="newPropertyManagerPhone"
      name="newPropertyManagerPhone"
      label="Phone"
      placeholder="ex. 503-555-1234"
      onChange={onChange} />
    <Input
      type="email"
      id="newPropertyManagerEmail"
      name="newPropertyManagerEmail"
      label="Email"
      placeholder="email@email.com"
      onChange={onChange} />
  </fieldset>
);

NewPropertyManager.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default NewPropertyManager;
