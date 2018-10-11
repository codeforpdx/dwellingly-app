import React from 'react';
import PropTypes from 'prop-types';

const EmergencyNumberEdit = (props) => {
  const onSubmit = () => {
    props.onSavingNewEmergencyNumber();
    props.onCancellingEditEmergencyNumber();
  }
  return (
    <div id={props.id} className="emergencyNumberEditContainer">
      <input name="contact" placeholder={props.contact} onChange={props.onEditingEmergencyText} type="text" />
      <div className="emergencyNumberEditInputs">
        <fieldset name="phoneNumberOne" onChange={props.onEditingEmergencyNumber}>
          <input
            name="subtext"
            type="text"
            placeholder={props.numberOne.subtext !== '' ? props.numberOne.subtext : 'Enter number info'} />
          <input
            name="number"
            placeholder={props.numberOne.number}
            type="text" />
          <input
            name="ext"
            placeholder={props.numberOne.ext !== '' ? props.numberOne.ext : 'Enter extension'}
            type="text" />
        </fieldset>
        {props.numberTwo !== null && props.numberTwo !== ''
          && (
            <fieldset name="phoneNumberTwo">
              <input
              name="subtext"
              placeholder={props.numberTwo.subtext !== '' ? props.numberTwo.subtext : 'Enter number info'}
              onChange={props.onEditingEmergencyNumber} />
              <input
                name="number"
                placeholder={props.numberTwo.number}
                onChange={props.onEditingEmergencyNumber}
                type="text" />
              <input
                name="ext"
                placeholder={props.numberTwo.ext !== '' ? props.numberTwo.ext : 'Enter extension'}
                onChange={props.onEditingEmergencyNumber}
                type="text" />
            </fieldset>
          )
        }
        {props.numberThree !== null && props.numberThree !== ''
          && (
            <fieldset name="phoneNumberThree">
              <input
                name="subtext"
                placeholder={props.numberThree.subtext}
                onChange={props.onEditingEmergencyNumber}
                type="text" />
              <input
                name="number"
                placeholder={props.numberThree.number}
                onChange={props.onEditingEmergencyNumber}
                type="text" />
              <input
                name="ext"
                placeholder={props.numberThree.ext}
                onChange={props.onEditingEmergencyNumber}
                type="text" />
            </fieldset>
          )
        }
      </div>
      <div className="btn--group">
        <div className="btn--group-inner">
          <button type="submit" className="btn" onClick={() => onSubmit()}>Save</button>
          <button type="button" className="btn btn--disabled">Delete</button>
        </div>
        <button type="button" className="btn btn--danger" onClick={props.onCancellingEditEmergencyNumber}>Cancel</button>
      </div>
    </div>
  )
};

EmergencyNumberEdit.propTypes = {
  id: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  numberOne: PropTypes.shape({
    ext: PropTypes.string,
    number: PropTypes.string,
    subtext: PropTypes.string
  }).isRequired,
  numberTwo: PropTypes.shape({
    ext: PropTypes.string,
    number: PropTypes.string,
    subtext: PropTypes.string
  }),
  numberThree: PropTypes.shape({
    ext: PropTypes.string,
    number: PropTypes.string,
    subtext: PropTypes.string
  }),
  onEditingEmergencyText: PropTypes.func.isRequired,
  onCancellingEditEmergencyNumber: PropTypes.func.isRequired,
  onEditingEmergencyNumber: PropTypes.func.isRequired,
  onSavingNewEmergencyNumber: PropTypes.func.isRequired
}

EmergencyNumberEdit.defaultProps = {
  numberTwo: "",
  numberThree: ""
}

export default EmergencyNumberEdit
