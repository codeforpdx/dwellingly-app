import React from 'react';
import PropTypes from 'prop-types';

const EmergencyNumber = ({ emergency }) => (
  <div className="emergencyNumberRow" key={`number-${emergency.id}`}>
    <div className="emergencyTitle">
      {emergency.title}
    </div>
    <div className="emergencyNumber">
      {emergency.number01}
    </div>
    {emergency.number02
      && (
      <div className="emergencyNumber">
        {emergency.number02}
      </div>
      )
    }
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
