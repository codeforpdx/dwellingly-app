import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import UserContext from "../../UserContext";
import * as axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(5, "*Email must have at least 5 characters")
    .max(100, "*Email can't be longer than 100 characters")
    .required("*Email is required"),
  phone: Yup.string()
    .max(20, "*Phone can't be longer than 20 characters")
    .required("*Phone Number is required"),
});

const formSubmitHandler = (context, data) => {
  axios
    .patch(`/api/user/${context.user.identity}`, data, {
      headers: { Authorization: `Bearer ${context.user.accessJwt}` },
    })
    .then((response) => {
      context.handleSetUser({
        userSession: {
          ...context.user,
          email: response.data.email,
          phone: response.data.phone,
        },
      });

      // TODO we need a way to get a new JWT token created here I think?
      
      // replace with success notification
      alert("Saved Successfully!");
    })
    .catch((error) => {
      // replace with failure notification
      alert(error);
    });
};

const Settings = () => {
  const context = useContext(UserContext);

  return (
    <div className="add-property__container">
      <h2 className="page-title">Settings</h2>

      <Formik
        initialValues={{
          email: context.user.email,
          phone: context.user.phone,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          formSubmitHandler(context, values);
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
                <label
                  className="column is-one-fifth"
                  id="email"
                  htmlFor="email"
                >
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
                <label
                  className="column is-one-fifth"
                  id="phone"
                  htmlFor="phone"
                >
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
                {errors.phone ? (
                  <div className="error-message">{errors.phone}</div>
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
            <Link exact="true" to="/change-password">
              Change Password
            </Link>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Settings;
