import React, { useState } from "react";
import { ACCESS_REQUEST_DATA } from '../components/DashboardModule/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



export const DropDownItem = ({dropContent, clickHandle}) => {
	return (
		<div className="dropdown-item">
	      	<label className="radio">
		      	<input type="radio" name="answer" onClick={clickHandle} className="radio-dropdown"></input>
		      	{dropContent}
		    </label>
	    </div>
	);
}

export const PropertyManagerOptions = () => {
	return (
		<>
			<div className="sub-title sub-title-padding"> PROPERTY </div>
	    	<p className="control has-icons-left search-bar">
	        	<input className="input is-rounded" type="text" placeholder="Search properties"></input>
	        	<span className="icon is-small is-left">
			    	<FontAwesomeIcon icon={faSearch} />
			    </span>
		    </p>
		</>
	);
}

export const JoinStaffOptions = () => {
	return (
		<label className="checkbox make-admin-padding">
			<span className="admin-check-padding">
				Make Admin
			</span>
			<input type="checkbox"></input>
		</label>
	);
}

export const RoleDropDown = () => {
	const [isActive, setIsActive] = useState(true);
	const [dropContent, setDropContent] = useState("");
	const [viewPropertyManagerOptions, setPropertyManagerOptions] = useState(false);
	const [viewJoinStaffOptions, setJoinStaffOptions] = useState(false);

	const handleClickDropdown = () => {
		if (!isActive) setIsActive(true);
	}

	const handleClickJOIN = () => {
		// Close dropdown
		if (isActive) setIsActive(false);
		// Set dropdown button text
		setDropContent("JOIN Staff");
		// Use JOIN staff checkbox
		if (viewPropertyManagerOptions) setPropertyManagerOptions(false);
		if (!viewJoinStaffOptions) setJoinStaffOptions(true);
	}

	const handleClickProperty = () => {
		// Close dropdown
		if (isActive) setIsActive(false);
		// Set dropdown button text
		setDropContent("Property Manager");
		// Use property search box
		if (viewJoinStaffOptions) setJoinStaffOptions(false);
		if (!viewPropertyManagerOptions) setPropertyManagerOptions(true);
	}

	const bottomPad = (viewPropertyManagerOptions) ? "bottom-padding-property" : (viewJoinStaffOptions ? "bottom-padding-join" : "bottom-padding");
	const dropDown = "dropdown is-rounded " + ((isActive) ? "is-active" : "");
	const dropButton = "icon is-small " + ((viewPropertyManagerOptions) ? "drop-button-prop" : (viewJoinStaffOptions ? "drop-button-join" : "drop-button-start"));

	return (
		<div className={bottomPad} >
			<div className={dropDown}>
			    <div className="dropdown-trigger">
				    <button className="button is-rounded drop-button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={handleClickDropdown} >
					    <span className="drop-button-content"> {dropContent} </span>
					    <span className={dropButton} >
					    	<i className="fas fa-angle-down" aria-hidden="true"></i>
					    </span>
				    </button>
			    </div>
			    <div className="dropdown-menu dropdown-menu-place">
				  	<div className="dropdown-content dropdown-content-width">
					    <DropDownItem dropContent="JOIN Staff" clickHandle={handleClickJOIN} />
					    <DropDownItem dropContent="Property Manager" clickHandle={handleClickProperty} />
				  	</div>
			    </div>
			</div>
			<div>
				{viewPropertyManagerOptions && <PropertyManagerOptions />}
				{viewJoinStaffOptions && <JoinStaffOptions />}
			</div>
		</div>
	);
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

	const {
		firstName,
		lastName,
		email
	} = props.location.state;

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
				<RoleDropDown />
				<div className="button-padding">
					<div className="set-access-button">
			      		<button className="access-button"> GRANT ACCESS </button>
			      	</div>
			        <Link className="button has-background-grey has-text-white is-rounded is-small cancel-button has-text-weight-bold" to='/dashboard'> CANCEL </Link>
			    </div>
			</div>
		</>
	);
}
