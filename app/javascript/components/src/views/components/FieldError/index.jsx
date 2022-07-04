import React from 'react';
import './styles.scss';

const FieldError = (props) => {
  if (!props.error) return null;
  return (
    <div className="error-message">
      {props.error}
    </div>
  );
};

export default FieldError;