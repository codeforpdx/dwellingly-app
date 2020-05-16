import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

export const InfoField = ({label, info}) => {
	return (
		<div>
			<hr className="line" ></hr>
			<div className="info-field-align">
				{label}
				<div className="info-field-input">
					<p className="has-text-weight-bold" contentEditable>
				        {info}
				    </p>
			    </div>
		    </div>
	    </div>
	);
}

export const AddStaffMember = () => {
	const history = useHistory();
	const handleCancel = () => {
		history.push('/staff')
	}

	const handleSave = () => {
		// TODO: Save the new staff member
	}

	return (
		<>
			<div className="add-staff-page-spacing" >
				<div className="page-title page-title-spacing" > Add a New Staff Member </div>
				<InfoField label="First Name" info="IDK" />
				<InfoField label="Last Name" info="IDK" />
				<InfoField label="Phone" info="IDK" />
				<InfoField label="Email" info="IDK" />
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
					<button className="button has-background-grey has-text-white is-rounded is-small has-text-weight-bold cancel-new-staff" onClick={handleCancel}> CANCEL </button>
				</div>
			</div>
		</>
	);
}