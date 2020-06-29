import React, { useEffect, useState } from "react";
import UserContext from "../UserContext";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as axios from "axios";
import { PROPERTY_MANAGER_DATA } from "./dummyData/pManagerData";

const Manager = () => {
  const { id } = useParams();
  // can remove this once api is configured to return properties and tenants
  const dummyDataManagerInfo = PROPERTY_MANAGER_DATA.find(
    (manager) => manager.id === id
  );

  const [manager, setManager] = useState(dummyDataManagerInfo);
  const [isEditing, setEditingStatus] = useState(false);

  const handleEditToggle = () => setEditingStatus(!isEditing);
  const formik = useFormik({
    initialValues: {
      firstName: manager.firstName,
      lastName: manager.lastName,
      phone: manager.phone,
      email: manager.email,
    },
    onSubmit: (values) => {
      // TODO: make POST to API with updatedValues
      const updatedValues = JSON.stringify(values, null, 2);
      setManager({
        ...manager,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
      });
      setEditingStatus(false);
    },
  });

  const contactInfoFields = ["firstName", "lastName", "phone", "email"];
  const contactInfoTitles = ["First Name", "Last Name", "Phone", "Email"];

  // use getManager once /users/?id api endpoint returns properties and tenants for property managers
  const getManager = (context) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/?id=${id}`, {
        headers: {
          Authorization: `Bearer ${context.user.accessJwt}`,
        },
      })
      .then((response) => {
        setManager({ manager: response.data.manager });
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  return (
    // If isEditing = true render Formik version allowing user to edit
    // Will need to handle submitting Formik, which I'll learn about
    // Will need to handle validating fields, which I'll learn about
    <div className="manager__container">
      <div className="manager__main">
        <div className="page-title">
          <h2>{manager.fullName}</h2>
          <div className="rounded" onClick={handleEditToggle}>
            <i className="fas fa-pen icon"></i>
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={formik.handleSubmit}>
            {Object.keys(formik.values).map(value =>
              <div key={value}>
                <label htmlFor={value}>{value}</label>
                <input 
                  name={value}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values[value]}
                />
              </div>
            )}
            
            <button type="submit">Save Changes</button>
          </form>
        ) : (
          <div className="manager__contact-info-container">
            {contactInfoFields.map((field, index) => (
              <div className="manager__contact-info-container__row">
                <span className="__row--title">{contactInfoTitles[index]}</span>
                <span className="__row--value">{manager[field]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
