import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTicketAlt, 
  faColumns, 
  faPlusCircle, 
  faUserCog, 
  faBook, 
  faUserAlt, 
  faPhoneAlt, 
  faCog 
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "bulma/css/bulma.css";
import UserContext from '../../UserContext'


export class LogOutButton extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ logout }) => (
          <div className="is-logout-button">
            <button className='button is-dark is-rounded is-small' onClick={logout}>LOG OUT</button>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export const MenuLink = ({ icon, isBold, name, href }) => {

  // look at the href prop and find the last, most specific piece of the path
  // this piece can be used as the id for this MenuLink
  let leafHrefString = href.split("/").splice(-1, 1)[0];

  const loc = useLocation();
  const locParts = loc.pathname.split("/");

  // loop through the parts of the current location path (which are based on React Router in App)
  // the current link is "active" if any part of the current path matches the href in our props
  let isActiveLink = locParts.some(pathPart => pathPart === leafHrefString);
  
  const linkable = (leafHrefString === "add" || leafHrefString === "manage") ? "is-inactive-link" : "";
  const size = (leafHrefString === "home") ? "is-size-6 " : "is-size-7 ";
  const classNameBase = size + (isBold ? "has-text-weight-bold " : "") + linkable;
  const linkDefaultColor = (leafHrefString === "reports") ? "has-text-grey" : "has-text-white";
  const linkColor = (isActiveLink) ? "has-text-black" : linkDefaultColor;

  return (
    <li className="is-padding">
      <Link to={href} className={`${classNameBase} ${linkColor}`}>
        {icon && 
          <span className="icon is-small">
            <FontAwesomeIcon icon={icon} />
          </span>
        }
        <span className="is-menu-link">
          {name}
        </span>
      </Link>
    </li>
  );
};

MenuLink.propTypes = {
  icon: PropTypes.object,
  isBold: PropTypes.bool,
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export const NavMenu = () => {
  const loc = useLocation();
  if (loc.pathname === "/login" || loc.pathname === "/signup" || loc.pathname === "/terms"){
    return null;
  }

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <div className="is-hidden-mobile is-sidebar-menu bg-blue">
          <div className="menu">
            <ul className="menu-list">
              <div className="is-username-link">
                <MenuLink name={`${user.firstName} ${user.lastName}`} isBold icon={faUserAlt} href="/home"/>
              </div>
              <MenuLink name="Dashboard" isBold icon={faColumns} href="/dashboard"/>
              <MenuLink name="Add New" isBold icon={faPlusCircle} href="/add"/>
              <div className="is-child-link">
                <MenuLink name="Tenant" href="/add/tenant" />
                <MenuLink name="Property" href="/add/property" />
                <MenuLink name="Property Manager" href="/add/manager" />
              </div>

              <MenuLink name="Manage" isBold icon={faUserCog} href="/manage"/>
              <div className="is-child-link">
                <MenuLink name="Tenants" href="/manage/tenants" />
                <MenuLink name="Properties" href="/manage/properties" />
                <MenuLink name="Property Managers" href="/manage/managers" />
              </div>

              <MenuLink name="Tickets" isBold icon={faTicketAlt} href="/tickets"/>
              <MenuLink name="Reports" isBold icon={faBook} href="/reports" />
              <MenuLink name="JOIN Staff" isBold icon={faUserAlt} href="/staff" />
              <MenuLink name="Emergency Numbers" isBold icon={faPhoneAlt} href="/emergency" />
              <MenuLink name="Settings" isBold icon={faCog} href="/settings" />
            </ul>
          </div>
          <LogOutButton />
        </div>
      )}
    </UserContext.Consumer>
  );
}