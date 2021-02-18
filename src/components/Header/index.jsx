import React from "react";
import { Link, useLocation } from "react-router-dom";
import dwellinglylogo from "../../assets/images/dwellingly_logo_white.png";
import LogOutButton from "./LogOutButton";

import './header.scss'

const Header = (props) => {
  const loc = useLocation();

  if (loc.pathname === "/terms") {
    return null;
  }
  return (
    <header className="navbar-brand bg-gradient navbar-container">
      <Link className="navbar-item" to="/">
        <img src={dwellinglylogo} alt="dwellingly logo" />
      </Link>

      <LogOutButton />
    </header>
  );
};

export default Header;
