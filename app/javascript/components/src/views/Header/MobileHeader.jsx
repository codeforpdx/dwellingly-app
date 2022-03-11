import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import './styles/index.scss'

const MobileHeader = (props) => {
  const loc = useLocation();

  if (loc.pathname === "/terms") {
    return null;
  }

  return (
    <header data-testid="header" className="navbar-brand bg-gradient navbar-container mobile-header">
      <Link className="navbar-item" to="/m/testpm">
        <FontAwesomeIcon icon={faChevronLeft} size="lg"/>
      </Link>
      <h1>{props.headerText}</h1>
    </header>
  );
};

export default MobileHeader;
