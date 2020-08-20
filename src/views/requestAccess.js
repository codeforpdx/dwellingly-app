import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import * as axios from "axios";
import UserContext from '../UserContext';

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

const RoleDropDown = (props) => {
  console.log(props.selectionOptions);
  console.log(typeof props.selectionOptions);
  let roles = props.selectionOptions;
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
export const InfoField = ({label, info, changeHandler}) => {
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
    console.log(process.env.REACT_APP_API_URL)
    axios.get(`/api/roles`)
    .then((response) => {
      let data = JSON.parse(response.data);
      // Get key value object of all roles
      setRoleObject(data);
      // Get Role names
      let roleArray = Object.keys(data);
      // Removes "Pending" role
      roleArray.shift();
      // Get array of roles to map to selection options
      setSelectionOptions(roleArray);
    })
    .catch((error) => {
      alert(error);
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
      alert(error);
      console.log(error);
    });
  }

	const {
		firstName,
		lastName,
    email,
    id
  } = props.location.state;
  
  useEffect(() => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
  }, []);

	return (
		<>
			<div className="request-page">
				<div className="page-title"> Request for Access </div>
				<div className="sub-title"> CONTACT </div>
				<InfoField label={"First Name"} changeHandler={setFirstName} info={firstName} />
				<InfoField label={"Last Name"} changeHandler={setLastName} info={lastName} />
				{/* <InfoField label={"Phone"} info={data['phone']} /> */}
				<InfoField label={"Email"} changeHandler={setEmail} info={email} />
				<hr className="line" ></hr>
				<div className="sub-title sub-title-padding"> ASSIGN ROLE </div>
				<RoleDropDown selectionOptions={selectionOptions} selectionHandler={selectionHandler}/>
				<div className="button-padding">
					<div className="set-access-button">
			      		<button className="access-button" onClick={() => grantAccess(currentSelection, fName, lName, emailAddress, id)} disabled={currentSelection===""}> GRANT ACCESS </button>
			      	</div>
			        <Link className="button has-background-grey has-text-white is-rounded is-small cancel-button has-text-weight-bold" to='/dashboard'> CANCEL </Link>
			    </div>
			</div>
		</>
	);
}
