import React, { useState } from "react";
import "bulma/css/bulma.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faColumns, faUserPlus, faPlusCircle, faUserCog, faBook, faUserAlt, faPhoneAlt, faCog, faGhost } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";

// A way to add dependencies to something?

// comment before functions (what they do)
// input/output is good too

// put: if (window.location.pathname === '/login' || window.location.pathname === '/signup') return null;
// in render section before return

// let someone know about path (/manage/something)

// made it custom to avoid errors
// why is it not component function otherwise?
// now it is, as it returns html?
/* Could return this in MenuLink function?
function useFindPath(props, className, menuIcon){
  let loc = useLocation();
  let locParts = loc.pathname.split("/");
  var index = 0;
  //console.log(props);
  console.log(props.href);
  // handle non-link add and manage
  if (locParts.length === 2){
    index = 1;
    // props.href has the /
    if (locParts[index] === props.href.substring(1)){
      className += " has-text-black";
    } else if (props.href === "reports"){
      className += " has-text-grey";
    } else {
      className += " has-text-white";
    }
    return (
        <li className="is-padding">
          <a href={props.href} className={className}>
            <span className="icon is-small">
              <FontAwesomeIcon icon={menuIcon} />
            </span>
            <span className="is-menu-link">
            {props.name}
            </span>
          </a>
        </li>
      );
  } 
  // repetitive code 
  else if (locParts === 3){
    index = 2; // can shorten the code later
    if (locParts[index-1] === "manage"){
      // How to affect manage link?
    } else if (locParts[index-1] === "add"){
      // How to affect add new link?
    }
    if (locParts[index] === props.href.substring(1)){
      className += " has-text-black";
    } else if (props.href === "reports"){
      className += " has-text-grey";
    } else {
      className += " has-text-white";
    }
    return (
        <li className="is-padding">
          <a href={props.href} className={className}>
            <span className="icon is-small">
              <FontAwesomeIcon icon={menuIcon} />
            </span>
            <span className="is-menu-link">
            {props.name}
            </span>
          </a>
        </li>
      );
  }
  else {
    return (
        <li className="is-padding">
          <a href={props.href} className={className}>
            <span className="icon is-small">
              <FontAwesomeIcon icon={menuIcon} />
            </span>
            <span className="is-menu-link">
            {props.name}
            </span>
          </a>
        </li>
      );
  }
}
*/

// How to make logout functionality?
export class LogOutButton extends React.Component {
  render() {
    return (
      <button className='button is-dark is-rounded is-logout-button is-small'>LOG OUT</button>
    );
  }
}


const MenuLink = props => {
  let className = "is-size-7";
  
  if (props.isBold){
    className += " has-text-weight-bold";
  }

  var menuIcon = null;
  // change this to the href?
  // could add link name here too
  switch(props.icon){
    // no default, it would just be null again
    case "dash":
      menuIcon = faColumns;
      break;
    case "add":
      menuIcon = faPlusCircle;
      break;
    case "manage":
      menuIcon = faUserCog;
      break;
    case "ticket":
      menuIcon = faTicketAlt;
      break;
    case "report":
      menuIcon = faBook;
      break;
    case "staff":
      menuIcon = faUserAlt;
      break;
    case "user":
      menuIcon = faUserAlt;
      break;
    case "emergency":
      menuIcon = faPhoneAlt;
      break;
    case "settings":
      menuIcon = faCog;
      break;
  }

  // Using state
  const [manage, setManage] = useState(false);
  const [add, setAdd] = useState(false);

  let loc = useLocation();
  
  // the first part is an empty string
  let locParts = loc.pathname.split("/");
  
  // maybe reduce the code later
  var index = 0;
  
  // handle non-link add and manage
  
  // is reports supposed to turn black?

  // this seems to work
  if (locParts.length === 2){
    index = 1;
    // props.href has the slash
    if (locParts[index] === props.href.substring(1)){
      className += " has-text-black";
    } else if (manage || add) {
      className += " has-text-black";
    } else if (props.href.substring(1) === "reports"){
      className += " has-text-grey";
    } else {
      className += " has-text-white";
    }
    // add if for non-link links
    // could use menu-label <p> instead of menu-list <a>
    return (
        <li className="is-padding">
          <a href={props.href} className={className}>
            <span className="icon is-small">
              <FontAwesomeIcon icon={menuIcon} />
            </span>
            <span className="is-menu-link">
            {props.name}
            </span>
          </a>
        </li>
      );
  } 
  // repetitive code 

  // This turns everything dark, but not black
  // because they don't have icons? nope
  // adding icons didn't solve it

  else if (locParts === 3){
    index = 2; // can shorten the code later
    // This won't affect the labels, they render first?
    if (locParts[index-1] === "manage"){
      setManage(true);
    } else {
      setManage(false);
    }

    if (locParts[index-1] === "add"){
      setAdd(true);
    } else {
      setManage(false);
    }

    if (locParts[index] === props.href.substring(1)){
      className += " has-text-black";
    } else if (props.href.substring(1) === "reports"){
      className += " has-text-grey";
    } else {
      className += " has-text-white";
    }
    return (
        <li className="is-padding">
          <a href={props.href} className={className}>
            <span className="icon is-small">
              <FontAwesomeIcon icon={menuIcon} />
            </span>
            <span className="is-menu-link">
            {props.name}
            </span>
          </a>
        </li>
      );
  }
  // need this?
  else {
    // just for debugging
    className += " has-text-blue";
    return (
        <li className="is-padding">
          <a href={props.href} className={className}>
            <span className="icon is-small">
              <FontAwesomeIcon icon={menuIcon} />
            </span>
            <span className="is-menu-link">
            {props.name}
            </span>
          </a>
        </li>
      );
  }
};


export class NavMenu extends React.Component {
  render() {
    return (
    <div className="is-hidden-mobile is-sidebar-menu bg-blue">
      <div className="menu">
        <ul className="menu-list">
          <MenuLink name="{User Name}" isBold icon="user" href="/home"/>
          <MenuLink name="Dashboard" isBold icon="dash" href="/dashboard"/>

          
          <MenuLink name="Add New" isBold icon="add" href="/add"/>
          <MenuLink name="Tenant" href="/add/tenant" />
          <MenuLink name="Property" href="/add/property" />
          <MenuLink name="Property Manager" href="/add/manager" />

          <MenuLink name="Manage" isBold icon="manage" href="/manage"/>
          <MenuLink name="Tenants" href="/manage/tenants" />
          <MenuLink name="Properties" href="/manage/properties" />
          <MenuLink name="Property Managers" href="/manage/managers" />

          <MenuLink name="Tickets" isBold icon="ticket" href="/tickets"/>
          <MenuLink name="Reports" isBold icon="report" href="/reports" />
          <MenuLink name="JOIN Staff" isBold icon="staff" href="/staff" />
          <MenuLink name="Emergency Numbers" isBold icon="emergency" href="/emergency" />
          <MenuLink name="Settings" isBold icon="settings" href="/settings" />
        </ul>
      </div>
      <LogOutButton />
      </div>
    );
  }


}