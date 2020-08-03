import React, { useContext, useState, useEffect } from "react";
import { ACCESS_REQUEST_DATA } from '../components/DashboardModule/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
        defaultValue="default"
          onChange={e => props.selectionHandler(e.target.value)}>
          <option value='default' disabled>Select Role</option>
          {
            props.selectionOptions.map((role) => 
            <option>{role}</option>
            )
          }
        </select>
      </div>

    </div>
  )
}

// Section under CONTACT
export const InfoField = ({label, info}) => {
	const infoField = "has-text-weight-bold " + ((label === "Phone") ? "phone-field" : (label === "Email" ? "email-field" : "name-field"));
	return (
		<div>
			<hr className="line" ></hr>
			<span className="input-field"> {label}
				<p className={infoField} contentEditable>
			    {info}
			  </p>
		    </span>
	    </div>
	);
}

export const RequestAccess = (props) => {
  // const id = props.match.params.id;
  const userContext = useContext(UserContext);

  const [selectionOptions, setSelectionOptions] = useState([]);
  const [currentSelection, selectionHandler] = useState("");

  useEffect(() => {
    axios.get(`/api/roles`)
    .then((response) => {
      let data = JSON.parse(response.data);
      // Remove 'PENDING' from List
      data.shift()
      console.log(Object.keys(data));
      // let roleArray = Object.entries(data);
      // console.log(roleArray);
      // console.log(typeof roleArray);
      setSelectionOptions(data);
    })
    .catch((error) => {
      alert(error);
      console.log(error);
    });
  }, []);

  console.log(selectionOptions);
  console.log(currentSelection);

  const grantAccess = (role, id) => {
    console.log(id)
    console.log(role)
    axios.patch(`/api/user/${id}`, {
      role: role,
    }, makeAuthHeaders(userContext))
    .then((response) => {
      alert("Role assigned successfully!");
      console.log(response);
      console.log(response.data);
      
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
    id,
    role
  } = props.location.state;
  
  // getRole = () => {
    
  // }

	return (
		<>
			<div className="request-page">
				<div className="page-title"> Request Access </div>
				<div className="sub-title"> CONTACT </div>
				<InfoField label={"First Name"} info={firstName} />
				<InfoField label={"Last Name"} info={lastName} />
				{/* <InfoField label={"Phone"} info={data['phone']} /> */}
				<InfoField label={"Email"} info={email} />
				<hr className="line" ></hr>
				<div className="sub-title sub-title-padding"> ASSIGN ROLE </div>
				<RoleDropDown selectionOptions={selectionOptions} selectionHandler={selectionHandler}/>
				<div className="button-padding">
					<div className="set-access-button">
            <button className="access-button" onClick={() => grantAccess(currentSelection, id)}> GRANT ACCESS </button>
			    </div>
          <Link className="button has-background-grey has-text-white is-rounded is-small has-text-weight-bold" to='/dashboard'> CANCEL </Link>
			  </div>
			</div>
		</>
	);
}
