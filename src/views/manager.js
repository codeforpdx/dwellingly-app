import React, { useEffect, useState } from "react";
import UserContext from "../UserContext";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import * as axios from "axios";
import { PROPERTY_MANAGER_DATA } from "./dummyData/pManagerData";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255, "Must be shorter than 255 Characters")
    .required("Must enter a First Name"),
  lastName: Yup.string()
    .max(255, "Must be shorter than 255 Characters")
    .required("Must enter a Last Name"),
  phone: Yup.string()
    .min(
      5,
      "*Number must contain at least 5 digits to be a valid phone/text number"
    )
    .max(20, "*Numbers can't be longer than 20 digits")
    .required("*a valid phone number is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .max(255, "Must be shorter than 255")
    .required("Must enter an email"),
});

const FieldError = ({ error }) => {
  if (!error) return null;
  return <div className="field-error__message">{error}</div>;
};

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
        <button
          className="rounded"
          onClick={handleEditToggle}
          disabled={isEditing}
        >
          <i className="fas fa-pen icon"></i>
        </button>
      </div>
      <div className="manager__container__contact__section">
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
                <Form onSubmit={handleSubmit}>
                  {Object.keys(values).map((value, index) => (
                    <div className="form-row columns" key={value}>
                      <label
                        className="column is-one-quarter row-title"
                        htmlFor={value}
                      >
                        {contactInfoTitles[index]}
                      </label>
                      <Field
                        type="text"
                        name={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[value]}
                        className="column is-two-quarters contact-form__field--editing"
                      />
                      <FieldError
                        error={errors[value]}
                        className="column is-one-quarter"
                      />
                    </div>
                  ))}
                  <button type="submit" disabled={isSubmitting}>
                    Save Changes
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              {contactInfoFields.map((field, index) => (
                <div key={field} className="form-row columns">
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
        </div>{" "}
        {/* END contact-details */}
      </div>{" "}
      {/* END contact__section */}
      <div className="manager__properties__section">
        <h1 className="section-title">PROPERTIES</h1>
        <div className="manager__properties__container">
          {manager.properties.map((property) => (
            <div key={property.name} className="manager__property__tile">
              <h3 key={property.name} className="manager__property__name">
                {property.name}
              </h3>
              <div className="manager__property__address">
                {property.streetAddress}
              </div>
              <div className="manager__property__address">
                {property.city}, {property.state} {property.zip}
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
      {/* END manager__properties__section */}
      <div className="manager__tenants">
        <h1 className="section-title">TENANTS</h1>
        {manager.tenants.map((tenant) => (
          <div className="columns tenant__form-row" key={tenant.name}>
            <div className="column is-one-quarter bold tenant__name">
              {tenant.name}
            </div>
            <div className="column is-one-quarter">{tenant.property}</div>
            <div className="column is-one-quarter">{tenant.unit}</div>
            <div className="column is-one-quarter">{tenant.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manager;
