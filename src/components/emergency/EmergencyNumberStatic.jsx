import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon/Icon';

const EmergencyNumberStatic = (props) => {
  const { emergency } = props;
  const parsedPhoneNumberOne = props.parseNumber(emergency.phoneNumberOne);
  const parsedPhoneNumberTwo = props.parseNumber(emergency.phoneNumberTwo);
  return (
    <div>
      <div className="emergencyNumberRow" key={`row-${emergency.id}`}>
        <div className="emergencyTitle">
          {!props.doneEditing ? emergency.contact : props.newContact}
        </div>
        <div className="emergencyNumberContainer">
          <div className="emergencyNumber">
          {parsedPhoneNumberOne.textContentOfNumber !== undefined ?
            <div>
              <a href={`tel:${!props.doneEditing ? emergency.phoneNumberOne : props.newNumberOne}`}>
              {!props.doneEditing ? parsedPhoneNumberOne.number : props.newNumberOne}
              </a>
              <span> {parsedPhoneNumberOne.textContentOfNumber}</span>
            </div> :
            <a href={`tel:${!props.doneEditing ? emergency.phoneNumberOne : props.newNumberOne}`}>
            {!props.doneEditing ? emergency.phoneNumberOne : props.newNumberOne}
            </a>
          }
          </div>
          {emergency.phoneNumberTwo !== null && emergency.phoneNumberTwo !== ''
            && (
            <div className="emergencyNumber">
              {parsedPhoneNumberTwo.textContentOfNumber !== undefined ?
                <div>
                  <span>|&nbsp;&nbsp;&nbsp;{parsedPhoneNumberTwo.textContentOfNumber}: </span>
                  <a href={`tel:${!props.doneEditing ? emergency.phoneNumberTwo : props.newNumberTwo}`}>
                    {!props.doneEditing ? parsedPhoneNumberTwo.number : props.newNumberTwo}
                  </a>
                </div> :
                <div>
                  |&nbsp;&nbsp;&nbsp;<a href={`tel:${!props.doneEditing ? emergency.phoneNumberTwo : props.newNumberTwo}`}>
                    {!props.doneEditing ? emergency.phoneNumberTwo : props.newNumberTwo}
                  </a>
                </div>
              }
            </div>
            )
          }
          {emergency.phoneNumberThree !== null && emergency.phoneNumberThree !== ''
            && (
            <div className="emergencyNumber">
              |&nbsp;&nbsp;&nbsp;<a href={`tel:${!props.doneEditing ? emergency.phoneNumberThree : props.newNumberThree}`}>
                {!props.doneEditing ? emergency.phoneNumberThree : props.newNumberThree}
              </a>
            </div>
            )
          }
          <div className="emergencyNumberEditButton" onClick={props.onEditingNumber} role="presentation">
            <Icon icon="pencil" />
          </div>
          <div onClick={props.onArchivingNumber} role="presentation">
            <Icon icon="archive" />
          </div>
        </div>
      </div>
    </div>
  );
}

EmergencyNumberStatic.propTypes = {
  doneEditing: PropTypes.bool.isRequired,
  newContact: PropTypes.string.isRequired,
  newNumberOne: PropTypes.string.isRequired,
  newNumberTwo: PropTypes.string,
  newNumberThree: PropTypes.string,
  onEditingNumber: PropTypes.func.isRequired,
  onArchivingNumber: PropTypes.func.isRequired,
  parseNumber: PropTypes.func.isRequired,
  emergency: PropTypes.shape({
    contact: PropTypes.string.isRequired,
    phoneNumberOne: PropTypes.string.isRequired,
    phoneNumberTwo: PropTypes.string,
    phoneNumberThree: PropTypes.string
  }),
}

EmergencyNumberStatic.defaultProps = {
  emergency: null,
  newNumberTwo: "",
  newNumberThree: ""
}

export default EmergencyNumberStatic
