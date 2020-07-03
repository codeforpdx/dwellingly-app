import React, { useState } from 'react';
import './accordion.scss';

function Accordion(props) {
  const { children, header, icon } = props;

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className={`accordion ${isCollapsed && 'isCollapsed'}`}>
      <div
        className="accordion__header"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}>
        <p className="accordion__header_title">
          <i>{icon}</i>
          <span>{header}</span>
        </p>
      </div>
      <div className="accordion__panel">{children}</div>
    </div>
  );
}

export default Accordion;
