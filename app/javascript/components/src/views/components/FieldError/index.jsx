import React from 'react';

const FieldError = (props) => {
  if (!props.error) return null;
  return (
    <div className="error-message">
      {props.error}
    </div>
  );
};

export default FieldError;
