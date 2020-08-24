import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import UserContext from "../UserContext";
import * as axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(5, "*Email must have at least 5 characters")
    .max(100, "*Email can't be longer than 100 characters")
    .required("*Email is required"),
  // Validate phone number??
  phone: Yup.string()
    .max(20, "*Phone can't be longer than 20 characters")
    .required("*Phone Number is required"),
});

// TODO
// Convert to functional component
// Update formik to show phone
// Get existing phone/email to be initial values for Formik from user context
// On formik submit, save phone/email for user in database
// Once submitted, alert user via modal if save was successful
// Once submitted, alert user via modal if save was NOT successful

const formHandler = (data, context) => {
  axios
    .patch(`http://localhost:5000/api/user/${context.user.identity}`, data, {
      headers: { Authorization: `Bearer ${context.user.accessJwt}` },
    })
    .then(response => {
      alert("Contact Info Updated!");
    })
    .catch(error => {
      alert(error);
    });
};

const Settings = () => {
  return (
    <UserContext.Consumer>
      {(session) => {
        console.log("session", session);
        return (
          <div className="add-property__container">
            <h2 className="page-title">Settings</h2>

            <Formik
              initialValues={{
                email: session.user.email,
                phone: session.user.phone,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("submitting", values);
                setSubmitting(true);
                formHandler(values, session);
                resetForm();
                setSubmitting(false);
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched,
                isValid,
                isSubmitting,
              }) => (
                <div className="form-container add-property__main_container">
                  <h1 className="section-title">UPDATE CONTACT INFORMATION</h1>
                  <Form
                    className="add-property__form-container"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-row columns">
                      <label className="column is-one-fifth" htmlFor="email">
                        Email
                      </label>
                      <Field
                        className="column form-field"
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        placeholder="Enter your email address"
                      />
                      {errors.email ? (
                        <div className="error-message">{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="form-row columns">
                      <label className="column is-one-fifth" htmlFor="phone">
                        Phone
                      </label>
                      <Field
                        className="column form-field"
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        value={values.phone}
                        placeholder="Enter your phone number"
                      />
                      {errors.name ? (
                        <div className="error-message">{errors.name}</div>
                      ) : null}
                    </div>
                    <div className="container-footer">
                      <button
                        className={`${
                          isValid && "active"
                        } save_button button is-rounded`}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        SAVE
                      </button>
                      <button
                        className="button is-dark is-rounded"
                        onClick={() => {
                          console.log("cancel pressed");
                        }}
                      >
                        CANCEL
                      </button>
                    </div>
                  </Form>
                  <NavLink exact to="/change-password">
                    Change Password
                  </NavLink>
                </div>
              )}
            </Formik>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Settings;
