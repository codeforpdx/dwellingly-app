import React from 'react';
import './showHideSwitch.scss';

export const ShowHideSwitch = ({ id, labelText, isShowState, handleToggleChange }) => (
  <div key={id} className="showHideSwitch">
    <label className="switchLabel">{labelText}</label>
    <div className="switchToggle">
      <input 
        type="checkbox" 
        id="switch"
        value={isShowState}
        onChange={handleToggleChange}
      />
      <label htmlFor="switch">show/hide</label>
    </div>
  </div>
);
