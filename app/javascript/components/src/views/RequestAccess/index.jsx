import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import UserType from '../../Enums/UserType';

import PropertySearchPanel from "../components/PropertySearchPanel";

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
  );
};

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
};

export const RequestAccess = (props) => {
  const userContext = useContext(UserContext);

  const {
    firstName,
    lastName,
    email,
    id
  } = props.location.state || {};

  const [selectionOptions, setSelectionOptions] = useState([]);
  const [roleSelection, selectionHandler] = useState("");
  const [fName, setFirstName] = useState(firstName);
  const [lName, setLastName] = useState(lastName);
  const [emailAddress, setEmail] = useState(email);
  const [propertySelection, setPropertySelection] = useState([]);

  useEffect(() => {
    setSelectionOptions(Object.keys(UserType));
  }, []);

  const selectionMapping = () => {
    return {
      "PROPERTY_MANAGER": UserType.PROPERTY_MANAGER,
      "STAFF": UserType.STAFF,
      "ADMIN": UserType.ADMIN
    }
  }

  const grantAccess = () => {
    userContext.apiCall('patch', `/users/${id}/authorize`, {
      role: UserType[roleSelection.replace(' ', '_')],
      type: selectionMapping()[roleSelection],
      firstName: fName,
      lastName: lName,
      email: emailAddress,
      property_ids: roleSelection === "PROPERTY_MANAGER"
        ? propertySelection.map(p => p.key)
        : []
    }, { success: 'User access granted!' });
  };

  return (
    <div className='main-container'>
      <div className="page-title"> Request for Access </div>
      <div className="sub-title"> CONTACT </div>
      <InfoField label={"First Name"} changeHandler={setFirstName} info={firstName} />
      <InfoField label={"Last Name"} changeHandler={setLastName} info={lastName} />
      {/* <InfoField label={"Phone"} info={data['phone']} /> */}
      <InfoField label={"Email"} changeHandler={setEmail} info={email} />
      <hr className="line" ></hr>
      <div className="sub-title sub-title-padding"> ASSIGN ROLE </div>
      <RoleDropDown selectionOptions={selectionOptions} selectionHandler={selectionHandler} />
      {roleSelection === "PROPERTY_MANAGER" && <div>
        <h1 className="section-title">PROPERTIES</h1>
        <div className="typeahead-section">
          <PropertySearchPanel
            initialPropertyIds={[propertySelection]}
            setPropertySelection={setPropertySelection}
            multiSelect={true}
            showAddPropertyButton={true}
          />
        </div>
      </div>}
      <div className="mt-2">
        <button className="button is-small is-rounded is-primary mx-4"
          onClick={() => grantAccess()}
          disabled={roleSelection === ""}>
          GRANT ACCESS
        </button>
        <Link className="button is-rounded is-small is-dark" to='/dashboard'> CANCEL </Link>
      </div>
    </div>
  );
};
