import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import { AddProperty } from '../AddProperty';
import Modal from '../components/Modal';
import RoleEnum from '../../Enums/RoleEnum';
import UserType from '../../Enums/UserType';
import { useMediaQuery } from '@react-hook/media-query';
import { tabletWidth } from "../../constants";

import './styles/index.scss';

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
  const isMobile = useMediaQuery(`(max-width: ${tabletWidth})`);

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
  const [propertySearchText, setPropertySearchText] = useState("");
  const [propertySelection, setPropertySelection] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [propertySearchResults, setPropertySearchResults] = useState([]);
  const [showAddProperty, setShowAddProperty] = useState(false);

  useEffect(() => {
    setSelectionOptions(Object.keys(RoleEnum));
    getProperties();
  }, []);

  useEffect(() => {
    let choices = propertyOptions.filter(
      p => p.description.toLowerCase().includes(propertySearchText.toLowerCase()))
    setPropertySearchResults(choices);
  }, [propertySearchText, propertyOptions])

  const getProperties = () => {
    userContext.apiCall('get', '/properties', {}, {})
      .then(({ data }) => {
        let properties = data && data.length > 0
          ? data.map(property => {
            return {
              key: property.id,
              description: `${property.name}, ${property.address}`
            }
          })
          : data
        setPropertyOptions(properties);
        setPropertySearchResults(properties);
        setShowAddProperty(false);
      });
  }

  const selectionMapping = () => {
    return {
      "PROPERTY_MANAGER": UserType.PROPERTY_MANAGER,
      "STAFF": UserType.STAFF,
      "ADMIN": UserType.ADMIN
    }
  }

  const grantAccess = () => {
    userContext.apiCall('patch', `/users/${id}/authorize`, {
      role: RoleEnum[roleSelection.replace(' ', '_')],
      type: selectionMapping()[roleSelection],
      firstName: fName,
      lastName: lName,
      email: emailAddress,
      property_ids: roleSelection === "PROPERTY MANAGER"
        ? propertySelection.map(p => p.key)
        : []
    }, { success: 'User access granted!' });
  };

  const handleAddPropertyCancel = () => {
    setShowAddProperty(false);
  }

  /**
   * Handle property search input
   * @param {*} event
   */
  const handlePropertySearch = (event) => {
    const { value } = event.target;
    if (!value || value.length === 0) {
      setPropertySearchResults(propertyOptions);
      setPropertySearchText("");
    } else {
      setPropertySearchText(value);
    }
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
      {roleSelection === "PROPERTY MANAGER" && <div>
        <h1 className="section-title">PROPERTIES</h1>
        <div className="typeahead-section">
          <SearchPanel
            chips
            clearLabel="Clear search text"
            placeholder="Search Properties"
            small
            width={isMobile ? 300 : 400}
            variant={SearchPanelVariant.checkbox}
            choices={propertySearchResults}
            value={propertySearchText}
            onSelectionChange={setPropertySelection}
            onChange={handlePropertySearch}
            onClear={handlePropertySearch}
            shadow
          />
          <button
            className="add-property-button"
            onClick={() => setShowAddProperty(!showAddProperty)}
            type="button"
          >
            <i className="fas fa-plus-circle icon-inline-space"></i>
          Create New Property
        </button>
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
      {showAddProperty &&
        <Modal
          titleText="Create New Property"
          content={<AddProperty
            showPageTitle={false}
            postOnSubmit={getProperties}
            handleCancel={handleAddPropertyCancel}
            showAssignPropManagers={false}
            />}
          hasButtons={false}
          closeHandler={handleAddPropertyCancel}
        />
      }
    </div>
  );
};
