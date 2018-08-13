import React from 'react';
import PropTypes from 'prop-types';

const EmergencyNumber = ({ emergency }) => (
  <div className="emergencyNumberRow" key={`row-${emergency.id}`}>
    <div className="emergencyTitle">
      {emergency.title}
    </div>
    <div className="emergencyNumberContainer">
      <div className="emergencyNumber">
        <a href={`tel:${emergency.number01}`}>
          {emergency.number01}
        </a>
      </div>
      {emergency.number02 !== null && emergency.number02 !== ''
        && (
        <div className="emergencyNumber">
          |&nbsp;&nbsp;&nbsp;<a href={`tel:${emergency.number02}`}>
            {emergency.number02}
          </a>
        </div>
        )
      }
    </div>
  </div>
);

EmergencyNumber.propTypes = {
  emergency: PropTypes.shape({
    title: PropTypes.string.isRequired,
    number01: PropTypes.string.isRequired,
    number02: PropTypes.string,
  }),
};

EmergencyNumber.defaultProps = {
  emergency: null,
};

export default EmergencyNumber;
