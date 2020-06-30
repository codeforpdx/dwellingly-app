import React, { useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Formik } from "formik";
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
    <div className="manager__container">
      <div className="title__section">
        <h2>{manager.fullName}</h2>
        <div className="rounded" onClick={handleEditToggle}>
          <i className="fas fa-pen icon"></i>
        </div>
      </div>
      <div className="contact__section">
        <h1 className="section-title">CONTACT</h1>
        <div className="contact-details">
          {isEditing ? (
            <Formik
              initialValues={{
                firstName: manager.firstName,
                lastName: manager.lastName,
                phone: manager.phone,
                email: manager.email,
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setManager({
                  ...manager,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  phone: values.phone,
                  email: values.email,
                });
                setEditingStatus(false);
                {
                  /* fake API call to update data */
                }
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  {Object.keys(values).map((value, index) => (
                    <div className="form-row columns" key={value}>
                      <label
                        className="column is-one-quarter row-title"
                        htmlFor={value}
                      >
                        {contactInfoTitles[index]}
                      </label>
                      <input
                        type="text"
                        name={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[value]}
                        className="column is-three-quarters contact-form__field--editing"
                      />
                    </div>
                  ))}
                  <button type="submit" disable={isSubmitting}>
                    Save Changes
                  </button>
                </form>
              )}
            </Formik>
          ) : (
            <>
              {contactInfoFields.map((field, index) => (
                <div className="form-row columns">
                  <span className="column is-one-quarter row-title">
                    {contactInfoTitles[index]}
                  </span>
                  <span className="column is-one-quarter contact-form__field--not-editing">
                    {manager[field]}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
