import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import * as axios from "axios";
import UserContext from "../../UserContext";
import Button from "../../components/Button";
import Toast from '../../utils/toast';

import './settings.scss'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .min(5, "*Email must have at least 5 characters")
    .max(100, "*Email can't be longer than 100 characters")
    .required("*Email is required"),
  phone: Yup.string()
    .min(7, "Phone must have at least 7 characters")
    .max(20, "*Phone can't be longer than 20 characters")
    .required("*Phone Number is required"),
});

const handleFormSubmit = (context, data) => {
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

      // once Toast is implemented, replace with Toast notification
      Toast("Saved Successfully!", "success");
    })
    .then(() => {
      context.refreshJWT();
    })
    .catch((error) => {
      // once Toast is implemented, replace with Toast notification
      Toast(error.message, "error");
    });
};

// TODO make formCancelHandler() that resets form
const handleFormCancel = () => {
  // once Toast is implemented, replace with Toast notification
  Toast("Form Reset!", "success");
};

const Settings = () => {
  const context = useContext(UserContext);

  return (
    <div>
      <h2 className="page-title">Settings</h2>

      <Formik
        initialValues={{
          email: context.user.email,
          phone: context.user.phone,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleFormSubmit(context, values);
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
            <div className="settings__main_container">
              <h1 className="section-title">UPDATE CONTACT INFORMATION</h1>
              <Form className="settings__form-container" onSubmit={handleSubmit}>
                <div className="form-row">
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
                <div className="form-row">
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
                <div className="button-container">
                  <Button
                    isCancelButton={false}
                    type={"submit"}
                    disabledFlag={isSubmitting}
                    isValidFlag={isValid}
                  >
                    SAVE
                </Button>
                  <Button
                    isCancelButton={true}
                    type={"reset"}
                    onClick={handleFormCancel}
                  >
                    CANCEL
                </Button>
                </div>
              </Form>
            </div>
          )}
      </Formik>
      <Link exact="true" to="/changePassword">
        Change Password
      </Link>
    </div>
  );
};

export default Settings;
