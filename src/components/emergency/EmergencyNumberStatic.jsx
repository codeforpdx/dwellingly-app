import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon/Icon';

const EmergencyNumberStatic = (props) => {
  const { emergency } = props;
  return (
    <div>
      <div className="emergencyNumberRow" key={`row-${emergency.id}`}>
        <div className="emergencyTitle">
          {!props.doneEditing ? emergency.title : props.newTitle}
        </div>
        <div className="emergencyNumberContainer">
          <div className="emergencyNumber">
            <a href={`tel:${!props.doneEditing ? emergency.phoneNumberOne : props.newNumber01}`}>
              {!props.doneEditing ? emergency.phoneNumberOne : props.newNumber01}
            </a>
          </div>
          {emergency.phoneNumberTwo !== null && emergency.phoneNumberTwo !== ''
            && (
            <div className="emergencyNumber">
              |&nbsp;&nbsp;&nbsp;<a href={`tel:${!props.doneEditing ? emergency.phoneNumberTwo : props.newNumber02}`}>
                {!props.doneEditing ? emergency.phoneNumberTwo : props.newNumber02}
              </a>
            </div>
            )
          }
          <div className="emergencyNumberEditButton" onClick={props.onEditingNumber} role="presentation">
            <Icon icon="pencil" />
          </div>
        </div>
      </div>
    </div>
  );
}

EmergencyNumberStatic.propTypes = {
  doneEditing: PropTypes.bool.isRequired,
  newTitle: PropTypes.string.isRequired,
  newNumber01: PropTypes.string.isRequired,
  newNumber02: PropTypes.string.isRequired,
  onEditingNumber: PropTypes.func.isRequired,
  emergency: PropTypes.shape({
    title: PropTypes.string.isRequired,
    phoneNumberOne: PropTypes.string.isRequired,
    phoneNumberTwo: PropTypes.string,
  }),
}

EmergencyNumberStatic.defaultProps = {
  emergency: null
}

export default EmergencyNumberStatic
