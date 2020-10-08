import React from "react";
import { Link } from 'react-router-dom';
import * as axios from 'axios';
import RoleEnum from "../RoleEnum";



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

	// delete this once form is redone
	const dummyData = {
		firstName: "John",
		lastName: "Souza",
		phone: "5555555555",
		email: "emails@email.com",
		password: "1234",
		role: RoleEnum.STAFF
	}

	const handleSave = () => {

		// TODO: 
		// 1. Change dummy data to actual data
		// 2. Create new API endpoint. Currently routes to register. Needs to go to an 
		// endpoint that is JWT authorized and sends an email to the new email to set their password.

		// NOTE: The newly created user will not appear in the users page. The users page is currently
		// linked to static json data, not the database.

		const data = dummyData 

		axios.post("/api/register", data, { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
        .then(function(response){
			alert("Staff Added!");
			console.log(response)
        })
        .catch(function(error){
            alert(error);
		})
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
