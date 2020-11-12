import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import * as axios from "axios";
import UserContext from '../../UserContext';
import Toast from '../../utils/toast';

import './requestAccess.scss'

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

const RoleDropDown = (props) => {
  return (
    <div className="section-row">
      <div className="select is-rounded">
        <select
          defaultValue='default'
          onChange={e => props.selectionHandler(e.target.value)}>
          <option value='default' disabled defaultValue>Select Role</option>
          {
            props.selectionOptions.map((role, index) =>
              <option key={index}>{role}</option>
            )
          }
        </select>
      </div>
    </div>
  )
}

// Section under CONTACT
export const InfoField = ({ label, info, changeHandler }) => {
  const infoField = "has-text-weight-bold " + ((label === "Phone") ? "phone-field" : (label === "Email" ? "email-field" : "name-field"));
  return (
    <div>
      <hr className="line" ></hr>
      <span className="input-field"> {label}
        <input className={`contact-input ${infoField}`} type="text" defaultValue={info} onChange={(e) => changeHandler(e.target.value)}>
        </input>
      </span>
    </div>
  );
}

export const RequestAccess = (props) => {
  // Get context for API auth header
  const userContext = useContext(UserContext);

  const [roleObject, setRoleObject] = useState({});
  const [selectionOptions, setSelectionOptions] = useState([]);
  const [currentSelection, selectionHandler] = useState("");
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [emailAddress, setEmail] = useState("");

  useEffect(() => {
    axios.get(`/api/roles`)
      .then((response) => {
        let data = JSON.parse(response.data);
        // Get key value object of all roles
        setRoleObject(data);
        // Get Role names
        let roleArray = Object.keys(data);
        // Removes "Pending" and "Tenant" role
        roleArray.shift();
        roleArray.shift();
        // Get array of roles to map to selection options
        setSelectionOptions(roleArray);
      })
      .catch((error) => {
        Toast(error, "error");
        console.log(error);
      });
  }, []);

  const grantAccess = (role, firstName, lastName, email, id) => {
    // Get role index from roleObject
    let roleID = parseInt(roleObject[role]);
    axios.patch(`/api/user/${id}`, {
      role: roleID,
      firstName: firstName,
      lastName: lastName,
      email: email
    }, makeAuthHeaders(userContext))
      .then((response) => {
        alert("User access granted!")
      })
      .catch((error) => {
        Toast(error, "error");
        console.log(error);
      });
  }

  const {
    firstName,
    lastName,
    email,
    id
  } = props.location.state;

  useEffect((firstName, lastName, email) => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
  }, []);

  return (
    <>
      <div className="page-title"> Request for Access </div>
      <div className="sub-title"> CONTACT </div>
      <InfoField label={"First Name"} changeHandler={setFirstName} info={firstName} />
      <InfoField label={"Last Name"} changeHandler={setLastName} info={lastName} />
      {/* <InfoField label={"Phone"} info={data['phone']} /> */}
      <InfoField label={"Email"} changeHandler={setEmail} info={email} />
      <hr className="line" ></hr>
      <div className="sub-title sub-title-padding"> ASSIGN ROLE </div>
      <RoleDropDown selectionOptions={selectionOptions} selectionHandler={selectionHandler} />
      <div className="mt-2">
        <button className="button is-small is-rounded is-primary mx-4" onClick={() => grantAccess(currentSelection, fName, lName, emailAddress, id)} disabled={currentSelection === ""}> GRANT ACCESS </button>

        <Link className="button is-rounded is-small is-dark" to='/dashboard'> CANCEL </Link>
      </div>
    </>
  );
}
