import React from 'react';
import PropTypes from 'prop-types';

const EmergencyNumberEdit = (props) => {
  const onSubmit = () => {
    props.onSavingNewEmergencyNumber();
    props.onCancellingEditEmergencyNumber();
  }
  return (
    <div id={props.id}>
      <input name="title" placeholder={props.title} onChange={props.onEditingEmergencyNumber} type="text" />
      <input name="number01" placeholder={props.number01} onChange={props.onEditingEmergencyNumber} type="text" />
      {props.number02 !== null && props.number02 !== ''
        && (
          <input name="number02" placeholder={props.number02} onChange={props.onEditingEmergencyNumber} type="text" />
        )
      }
      <button type="submit" className="btn" onClick={() => onSubmit()}>Save</button>
      <button type="button" className="btn btn--danger" onClick={props.onCancellingEditEmergencyNumber}>Cancel</button>
    </div>
  )
};

EmergencyNumberEdit.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  number01: PropTypes.string.isRequired,
  number02: PropTypes.string,
  onCancellingEditEmergencyNumber: PropTypes.func.isRequired,
  onEditingEmergencyNumber: PropTypes.func.isRequired,
  onSavingNewEmergencyNumber: PropTypes.func.isRequired
}

EmergencyNumberEdit.defaultProps = {
  number02: null
}

export default EmergencyNumberEdit
