import React from "react";
import { Link, useLocation } from "react-router-dom";
import dwellinglylogo from "../../assets/images/dwellingly_logo_white.png";
import LogOutButton from "./LogOutButton";

const Header = (props) => {
  const loc = useLocation();

  if(loc.pathname === "/terms") {
    return null;
  }
	return (
    <header className="navbar bg-gradient">
      <Link className="navbar-item" id="header-logo" to="/">
        <img src={dwellinglylogo} alt="dwellingly logo" />
      </Link>
      <div className="logout-button">
        <LogOutButton />
      </div>
    </header>
  );
};

export default Header;
