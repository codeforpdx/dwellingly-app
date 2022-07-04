import React from "react";
import { Link, useLocation } from "react-router-dom";
import dwellinglylogo from "../../assets/images/dwellingly_logo_white.png";
import LogOutButton from "./components/LogOutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faBars} from "@fortawesome/free-solid-svg-icons";

import './styles/index.scss'

const Header = (props) => {
  const loc = useLocation();

  if (loc.pathname === "/terms") {
    return null;
  }

  return !window.location.pathname.includes('/m/testpm')
  && !window.location.pathname.includes('/m/teststaff') && (
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
