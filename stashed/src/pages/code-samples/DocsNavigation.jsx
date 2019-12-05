import React from 'react';
import { NavLink } from 'react-router-dom';

function DocsNavigation() {
  return (
    <nav className="tabs">
      <div className="width-wrapper">
        <ul>
          <li className="tab">
            <NavLink
              exact
              to="/code-samples/card"
              activeClassName="tab--active">
              <strong>Card</strong>
            </NavLink>
          </li>
          <li className="tab">
            <NavLink
              exact
              to="/code-samples/header"
              activeClassName="tab--active">
              <strong>Header</strong>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default DocsNavigation;
