import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import dwellinglylogo from "images/dwellingly_logo_white.png";
import LogOutButton from "./components/LogOutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../contexts/UserContext";

import {faBars} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const loc = useLocation();
  const context = useContext(UserContext);

  if (loc.pathname === "/terms" ||
    !context.user.isAuthenticated ||
    (loc.pathname === "/dashboard" && !context.user.admin && props.isMobile)) {
    return null;
  }

  return (
    <header data-testid="header" className="navbar-brand bg-gradient navbar-container">
      <button className="navbar-button" type="button" onClick={props.toggle}>
        <FontAwesomeIcon icon={faBars} size="lg"/>
      </button>
      <Link className="navbar-item" to="/">
        <img src={dwellinglylogo} alt="dwellingly logo" />
      </Link>

      <LogOutButton />
    </header>
  );
};

export default Header;
