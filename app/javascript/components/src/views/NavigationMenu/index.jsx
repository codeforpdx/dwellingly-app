import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faColumns,
  faPlusCircle,
  faUserCog,
  faUserAlt,
  faPhoneAlt,
  faCog,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import UserContext from "../../contexts/UserContext";

import './styles/index.scss'

export const MenuLink = ({ isMobile, menuClose, icon, isBold, name, href, passedClassName, category }) => {
  const loc = useLocation();
  let isActiveLink =
    loc.pathname.includes(href)
    || (category && loc.pathname.split('/')[1].includes(category));
  let cursorOverride = href ? "" : "default-cursor";
  const linkColor = isActiveLink ? "has-text-black" : "has-text-white";
  return (
    <li className={passedClassName ? `pb-2 ${passedClassName}` : "pb-2"}>
      <Link to={href} onClick={isMobile ? menuClose : null} className={`is-size-7 ${isBold && "has-text-weight-bold"} ${linkColor} ${cursorOverride}`}>
        {icon && (
          <span className="icon is-small">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        <span className="pl-1">{name}</span>
      </Link>
    </li>
  );
};

MenuLink.propTypes = {
  isMobile: PropTypes.bool,
  menuClose: PropTypes.func,
  icon: PropTypes.object,
  isBold: PropTypes.bool,
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  passedClassName: PropTypes.string
};

export const NavMenu = (props) => {
  const loc = useLocation();
  const sidebar = props.isOpen ? "sidebar is-open" : "sidebar";
  const sidebarBlock = props.isOpen ? "sidebarBlock is-open" : "sidebarBlock";
  if (
    loc.pathname === "/login" ||
    loc.pathname === "/signup" ||
    loc.pathname === "/terms"
  ) {
    return null;
  }


  return !window.location.pathname.includes('/m/testpm')
  && !window.location.pathname.includes('/m/teststaff') && (
    <UserContext.Consumer>
      {({ user }) => (
        <div>
          <div className={sidebarBlock}>
            <button onClick={props.toggle}></button>
          </div>
          <div className={`has-background-primary ${sidebar}`}>

            <div className="sidebar-header">
              <button
                variant="link"
                onClick={props.toggle}
              >
                <FontAwesomeIcon icon={faXmark} size="sm" />
              </button>

            </div>
            <div className="menu">
              <ul className="menu-list">
                <li className="pb-3 pt-3">
                  <Link to="/home" onClick={props.isMobile ? props.toggle : null} className="is-size-6 has-text-weight-bold has-text-white">
                    <span className="icon is-small">
                      <FontAwesomeIcon icon={faUserAlt} />
                    </span>
                    <span className="pl-1">{`${user.firstName} ${user.lastName}`}</span>
                  </Link>
                </li>
                <MenuLink
                  isMobile={props.isMobile}
                  menuClose={props.toggle}
                  props
                  name="Dashboard"
                  isBold
                  icon={faColumns}
                  href="/dashboard"
                  category="dashboard"
                />
                <MenuLink name="Add New" isBold icon={faPlusCircle} category="add" />
                <div className="pl-4 is-child-link">
                  <MenuLink name="Tenant" href="/add/tenant" isMobile={props.isMobile} menuClose={props.toggle} />
                  <MenuLink name="Property" href="/add/property" isMobile={props.isMobile} menuClose={props.toggle} />
                  <MenuLink name="Property Manager" href="/add/manager" isMobile={props.isMobile} menuClose={props.toggle} />
                  <MenuLink name="Ticket" href="/add/ticket" isMobile={props.isMobile} menuClose={props.toggle} />
                </div>

                <MenuLink name="Manage" isBold icon={faUserCog} category="manage" />
                <div className="pl-4 is-child-link">
                  <MenuLink name="Tenants" href="/manage/tenants" isMobile={props.isMobile} menuClose={props.toggle} />
                  <MenuLink name="Properties" href="/manage/properties" isMobile={props.isMobile} menuClose={props.toggle} />
                  <MenuLink name="Property Managers" href="/manage/managers" isMobile={props.isMobile} menuClose={props.toggle} />
                  <MenuLink name="Tickets" href="/manage/tickets" isMobile={props.isMobile} menuClose={props.toggle} />
                </div>

                <MenuLink name="JOIN Staff" isBold icon={faUserAlt} href="/staff" isMobile={props.isMobile} menuClose={props.toggle} />
                <MenuLink name="Emergency Numbers" isBold icon={faPhoneAlt} href="/emergency" isMobile={props.isMobile} menuClose={props.toggle} />
                <MenuLink name="Settings" isBold icon={faCog} href="/settings" isMobile={props.isMobile} menuClose={props.toggle} />
              </ul>
            </div>
          </div>
        </div>

      )}
    </UserContext.Consumer>
  );
}
