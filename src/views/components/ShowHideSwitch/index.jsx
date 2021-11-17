import React from 'react';
import './styles/index.scss';

export const ShowHideSwitch = ({ id, labelText, isShowState, handleToggleChange }) => (
  <div key={id} className="showHideSwitch">
    <label className="switchLabel">{labelText}</label>
    <div className="switchToggle">
      <input
        type="checkbox"
        id={`switch${id}`}
        value={isShowState}
        onChange={handleToggleChange}
      />
      <label htmlFor={`switch${id}`}>show/hide</label>
    </div>
  </div>
);
