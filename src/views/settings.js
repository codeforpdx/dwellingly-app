import React, { useState } from "react";
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
  phone: Yup.string()
    .max(20, "*Phone can't be longer than 20 characters")
    .required("*Phone Number is required"),
});

// TODO
// find out if reusable notification component is being worked on, otherwise create it
// Once submitted, alert user via alert notification if save was successful
// Once submitted, alert user via alert notification if save was NOT successful
// add tests

const userAPICall = (context, method, updateUserInfo, data) => {
  const isPatchCall = method === "patch";

  isPatchCall
    ? axios[method](
        `http://localhost:5000/api/user/${context.user.identity}`,
        data,
        {
          headers: { Authorization: `Bearer ${context.user.accessJwt}` },
        }
      )
        .then((response) => {
          updateUserInfo({
            phone: response.data.phone,
            email: response.data.email,
          });
          // replace with success notification
          alert("Saved Successfully!")
        })
        .catch((error) => {
          // replace with failure notification
          alert(error);
        })
    : axios[method](`http://localhost:5000/api/user/${context.user.identity}`, {
        headers: { Authorization: `Bearer ${context.user.accessJwt}` },
      })
        .then((response) => {
          updateUserInfo({
            phone: response.data.phone,
            email: response.data.email,
          });
        })
        .catch((error) => {
          alert(`I'm sorry! There was an error getting your information from the database. Please try again later: ${error}`);
        });
};

const getUser = (context, updateUserInfo) => {
  userAPICall(context, "get", updateUserInfo);
};

const formSubmitHandler = (context, updateUserInfo, data) => {
  userAPICall(context, "patch", updateUserInfo, data);
};

const Settings = () => {
  const [userFormInfo, updateUserInfo] = useState({
    email: null,
    phone: null,
  });

  return (
    <UserContext.Consumer>
      {(context) => {
        {/* set state on initial render */}
        if (userFormInfo.email === null) {
          getUser(context, updateUserInfo);
        }

        return (
          userFormInfo.email && (
            <div className="add-property__container">
              <h2 className="page-title">Settings</h2>

              <Formik
                initialValues={{
                  email: userFormInfo.email,
                  phone: userFormInfo.phone,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  formSubmitHandler(context, updateUserInfo, values);
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
                    <h1 className="section-title">
                      UPDATE CONTACT INFORMATION
                    </h1>
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
                    <NavLink exact to="/change-password">
                      Change Password
                    </NavLink>
                  </div>
                )}
              </Formik>
            </div>
          )
        );
      }}
    </UserContext.Consumer>
  );
};

export default Settings;
