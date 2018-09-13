import React from 'react';
import PropTypes from 'prop-types';

const EmergencyNumberEdit = (props) => {
  const onSubmit = () => {
    props.onSavingNewEmergencyNumber();
    props.onCancellingEditEmergencyNumber();
  }
  return (
    <div id={props.id}>
      <input name="contact" placeholder={props.contact} onChange={props.onEditingEmergencyNumber} type="text" />
      <input name="phoneNumberOne" placeholder={props.numberOne} onChange={props.onEditingEmergencyNumber} type="text" />
      {props.numberTwo !== null && props.numberTwo !== ''
        && (
          <input name="phoneNumberTwo" placeholder={props.numberTwo} onChange={props.onEditingEmergencyNumber} type="text" />
        )
      }
      {props.numberThree !== null && props.numberThree !== ''
        && (
          <input name="phoneNumberThree" placeholder={props.numberThree} onChange={props.onEditingEmergencyNumber} type="text" />
        )
      }
      <button type="submit" className="btn" onClick={() => onSubmit()}>Save</button>
      <button type="button" className="btn btn--danger" onClick={props.onCancellingEditEmergencyNumber}>Cancel</button>
    </div>
  )
};

EmergencyNumberEdit.propTypes = {
  id: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  numberOne: PropTypes.string.isRequired,
  numberTwo: PropTypes.string,
  numberThree: PropTypes.string,
  onCancellingEditEmergencyNumber: PropTypes.func.isRequired,
  onEditingEmergencyNumber: PropTypes.func.isRequired,
  onSavingNewEmergencyNumber: PropTypes.func.isRequired
}

EmergencyNumberEdit.defaultProps = {
  numberTwo: "",
  numberThree: ""
}

export default EmergencyNumberEdit
