import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon/Icon';

const EmergencyNumberStatic = (props) => {
  const { emergency } = props;
  const { phoneNumberOne, phoneNumberTwo } = emergency;
  // const parsedPhoneNumberOne = props.parseNumber(emergency.phoneNumberOne);
  // const parsedPhoneNumberTwo = props.parseNumber(emergency.phoneNumberTwo);
  return (
    <div className="emergencyNumberItem" key={`row-${emergency.id}`}>
      <div className="emergencyTitle">
        {!props.doneEditing ? emergency.contact : props.newContact}
        {emergency.subtext !== null && emergency.subtext !== ''
          && (
          <div className="emergencyNumberDescription">
            <p>
              {!props.doneEditing ? emergency.subtext : props.newNumberThree}
            </p>
          </div>
          )
        }
      </div>
      <div className="emergencyNumberContainer">
        <div className="emergencyNumber">
        {phoneNumberOne.subtext !== '' ?
          <div>
            <span>{phoneNumberOne.subtext}:&nbsp;</span>
            <a href={`tel:${!props.doneEditing ? phoneNumberOne.number : props.newNumberOne}`}>
            {!props.doneEditing ? phoneNumberOne.number : props.newNumberOne}
            </a>
          </div> :
          <a href={`tel:${!props.doneEditing ? phoneNumberOne.number : props.newNumberOne}`}>
          {!props.doneEditing ? phoneNumberOne.number : props.newNumberOne}
          </a>
        }
        </div>
        {phoneNumberTwo.number !== null && phoneNumberTwo.number !== ''
          && (
          <div className="emergencyNumber">
            {phoneNumberTwo.subtext !== '' ?
              <div>
                <span>
                  {phoneNumberTwo.subtext}:&nbsp;
                </span>
                <a href={`tel:${!props.doneEditing ? phoneNumberTwo.number : props.newNumberTwo}`}>
                  {!props.doneEditing ? phoneNumberTwo.number : props.newNumberTwo}
                </a>
              </div> :
              <a href={`tel:${!props.doneEditing ? phoneNumberTwo.number : props.newNumberTwo}`}>
                {!props.doneEditing ? phoneNumberTwo.number : props.newNumberTwo}
              </a>
            }
          </div>
          )
        }
        <div className="emergencyNumberEditButtons">
          <div className="emergencyNumberEditIcon" onClick={props.onEditingNumber} role="presentation">
            <Icon icon="pencil" />
          </div>
          <div className="emergencyNumberIcon" onClick={props.onArchivingNumber} role="presentation">
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
  newNumberOne: PropTypes.shape({}).isRequired,
  newNumberTwo: PropTypes.shape({}),
  newNumberThree: PropTypes.shape({}),
  onEditingNumber: PropTypes.func.isRequired,
  onArchivingNumber: PropTypes.func.isRequired,
  // parseNumber: PropTypes.func.isRequired,
  emergency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    phoneNumberOne: PropTypes.shape({}).isRequired,
    phoneNumberTwo: PropTypes.shape({}),
    phoneNumberThree: PropTypes.shape({})
  }),
}

EmergencyNumberStatic.defaultProps = {
  emergency: null,
  newNumberTwo: "",
  newNumberThree: ""
}

export default EmergencyNumberStatic
