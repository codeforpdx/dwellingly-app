import React from "react";
import "bulma/css/bulma.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faColumns, faUserPlus, faPlusCircle, faUserCog, faBook, faUserAlt, faPhoneAlt, faCog, faGhost } from '@fortawesome/free-solid-svg-icons';
import useLocation from "react-router-dom";

// comment before functions (what they do)
// input/output is good too

// put: if (window.location.pathname === '/login' || window.location.pathname === '/signup') return null;
// in render section before return

// look up react router
// ignore changing colors for now

// hook for useHistory/usePath

// let someone know about path (/manage/something)

export class LogOutButton extends React.Component {
  render() {
    return (
      <button className='button is-dark is-rounded is-logout-button is-small'>LOG OUT</button>
    );
  }
}

export class MenuLink extends React.Component {
  constructor(){
    super();
    localStorage.clear();
    const getColor = localStorage.getItem('color');
    var findColor = getColor == null ? 'white' : getColor;
    this.state = {
      color: findColor,
    }
  }

  handleClick(e){ 
    this.setState({
      color: 'black',
    })
    const stateColor = 'black';
    localStorage.setItem('color', stateColor);
    //e.preventDefault();
  }

  render(){
    let className = "is-size-7";
    if (this.props.isBold){
      className += " has-text-weight-bold";
    }
    var menuIcon = null;
    switch(this.props.icon){
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
        this.state.color = 'grey';
        //className += " has-text-grey";
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
    return(
      <li className="is-padding">
        <a href={this.props.href} className={className} onClick={this.handleClick.bind(this)} style={{color:this.state.color}}>
          <span className="icon is-small">
            <FontAwesomeIcon icon={menuIcon} />
          </span>
          <span className="is-menu-link">
          {this.props.name}
          </span>
        </a>
      </li>
    );
  }
}

export class NavMenu extends React.Component {
  render() {
    return (
    <div className="is-hidden-mobile is-sidebar-menu bg-blue">
      <div className="menu">
        <ul className="menu-list">
          <MenuLink name="{User Name}" isBold icon="user" href="/login"/>
          <MenuLink name="Dashboard" isBold icon="dash" href="signup"/>

          
          <MenuLink name="Add New" isBold icon="add" href=""/>
          <MenuLink name="Tenant" href="" />
          <MenuLink name="Property" href="" />
          <MenuLink name="Property Manager" href="" />

          <MenuLink name="Manage" isBold icon="manage" href=""/>
          <MenuLink name="Tenants" href="" />
          <MenuLink name="Properties" href="" />
          <MenuLink name="Property Managers" href="" />

          <MenuLink name="Tickets" isBold icon="ticket" href=""/>
          <MenuLink name="Reports" isBold icon="report" href="" />
          <MenuLink name="JOIN Staff" isBold icon="staff" href="" />
          <MenuLink name="Emergency Numbers" isBold icon="emergency" href="" />
          <MenuLink name="Settings" isBold icon="settings" href="" />
        </ul>
      </div>
      <LogOutButton />
      </div>
    );
  }


}