import React from "react";
import { Link } from 'react-router-dom';


export const InfoField = ({label, info}) => {
	const infoField = "has-text-weight-bold placeholder " + ((label === "Phone") ? "phone-field" : (label === "Email" ? "email-field" : "name-field"));
	return (
		<div>
			<hr className="line" ></hr>
			<span className="input-field"> {label}
				<p className={infoField} contentEditable required>

			    </p>
		    </span>
	    </div>
	);
}

export const AddStaffMember = () => {


	const handleSave = () => {
		// TODO: Save the new staff member
	}

	return (
		<>
			<div className="add-staff-page-spacing" >
				<div className="page-title page-title-spacing" > Add a New Staff Member </div>
				<InfoField label="First Name" />
				<InfoField label="Last Name" />
				<InfoField label="Phone" />
				<InfoField label="Email" />
				<hr className="line" ></hr>
				<label className="checkbox staff-make-admin-padding">
					<span className="admin-check-padding make-admin-font">
						Make Admin
					</span>
					<input type="checkbox"></input>
				</label>
				<div className="add-staff-page-length">
					<br />
					<div className="save-button-spacing">
						<button className="save-new-staff-button" onClick={handleSave} > SAVE </button>
					</div>
					<Link className="button has-background-grey has-text-white is-rounded is-small has-text-weight-bold cancel-new-staff" to='/staff'> CANCEL </Link>
				</div>
			</div>
		</>
	);
}
