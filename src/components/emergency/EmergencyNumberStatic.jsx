import React from 'react';
import PropTypes from 'prop-types';

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
            <a href={`tel:${!props.doneEditing ? emergency.number01 : props.newNumber01}`}>
              {!props.doneEditing ? emergency.number01 : props.newNumber01}
            </a>
          </div>
          {emergency.number02 !== null && emergency.number02 !== ''
            && (
            <div className="emergencyNumber">
              |&nbsp;&nbsp;&nbsp;<a href={`tel:${!props.doneEditing ? emergency.number02 : props.newNumber02}`}>
                {!props.doneEditing ? emergency.number02 : props.newNumber02}
              </a>
            </div>
            )
          }
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
  emergency: PropTypes.shape({
    title: PropTypes.string.isRequired,
    number01: PropTypes.string.isRequired,
    number02: PropTypes.string,
  }),
}

EmergencyNumberStatic.defaultProps = {
  emergency: null
}

export default EmergencyNumberStatic
