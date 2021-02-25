import React from "react";
import { Link } from 'react-router-dom';
import * as axios from 'axios';
import RoleEnum from "../../Enums/RoleEnum";
import Toast from '../../utils/toast';

import './addStaffMember.scss';



export const InfoField = ({ label, info }) => {
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
};

export const AddStaffMember = () => {

  // delete this once form is redone
  const dummyData = {
    firstName: "John",
    lastName: "Souza",
    phone: "5555555555",
    email: "emails@email.com",
    password: "1234",
    role: RoleEnum.STAFF
  };

  const handleSave = () => {

    // TODO:
    // 1. Change dummy data to actual data
    // 2. Create new API endpoint. Currently routes to register. Needs to go to an
    // endpoint that is JWT authorized and sends an email to the new email to set their password.

    // NOTE: The newly created user will not appear in the users page. The users page is currently
    // linked to static json data, not the database.

    const data = dummyData;

    axios.post("/api/register", data, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      .then(function(response) {
        Toast("Staff Added!", "success");
        console.log(response);
      })
      .catch(function(error) {
        Toast(error.message, "error");
      });
  };

  return (
    <>
      <div className='main-container'>
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

            <button className="button is-rounded is-primary mx-2" onClick={handleSave} > SAVE </button>

            <Link className="button is-rounded is-dark ml-3" to='/staff'> CANCEL </Link>
          </div>
        </div>
      </div>
    </>
  );
};
