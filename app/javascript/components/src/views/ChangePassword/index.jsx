import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import UserContext from "../../contexts/UserContext";
import Button from "../components/Button";
import './styles/index.scss';

const validationSchema = Yup.object().shape({
  current: Yup.string()
    .required("Current Password is required"),
  new: Yup.string()
    .required("New Password is required")
    .min(8, "Minimum Length is 8 characters")
    .matches(/[a-z]/, 'Password must contain at least one lowercase character')
    .matches(/[A-Z]/, 'Password must contain one uppercase character')
    .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'Password must contain at least 1 number or special char (@,!,#, etc)'),
  confirm: Yup.string()
    .required("New Passwords must match")
    .oneOf([Yup.ref("new"), null], "New Passwords must match"),
});

const ChangePassword = () => {
  const context = useContext(UserContext);
  const history = useHistory();

  const handleFormSubmit = (context, data) => {
    context.apiCall('patch', '/users',
      {
        user:
        {
          current_password: data.current,
          password: data.new,
          password_confirmation: data.confirm
        }
      },
      {
        success: 'Password updated successfully!',
        error: 'Error updating password, please try again later.'
      })
      .then(() => {
        history.push("/settings");
      });
  };

  return (
    <div className='main-container'>
      <div>
        <h2 className="page-title">Change Password</h2>

        <Formik
          validationSchema={validationSchema}
          initialValues={{
            current: "",
            new: "",
            confirm: ""
          }}
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
            <div style={{ marginTop: "15px" }} >
              {/*This is an extension of the settings page, so we can just reuse its styles*/}
              <Form className="settings__form-container" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label
                    className="column is-one-fifth"
                    id="current"
                    htmlFor="current"
                  >
                    Current Password
                  </label>
                  <Field
                    className="column form-field"
                    type="password"
                    name="current"
                    onChange={handleChange}
                    value={values.current}
                    placeholder="Enter your current password"
                  />
                  {errors.current ? (
                    <div className="error-message">{errors.current}</div>
                  ) : null}
                </div>
                <div className="form-row">
                  <label
                    className="column is-one-fifth"
                    id="new"
                    htmlFor="new"
                  >
                    New Password
                  </label>
                  <Field
                    className="column form-field"
                    type="password"
                    name="new"
                    onChange={handleChange}
                    value={values.new}
                    placeholder="Enter your new password"
                  />
                  {errors.new ? (
                    <div className="error-message">{errors.new}</div>
                  ) : null}
                </div>
                <div className="form-row">
                  <label
                    className="column is-one-fifth"
                    id="confirm"
                    htmlFor="confirm"
                  >
                    Confirm Password
                  </label>
                  <Field
                    className="column form-field"
                    type="password"
                    name="confirm"
                    onChange={handleChange}
                    value={values.confirm}
                    placeholder="Confirm your new password"
                  />
                  {errors.confirm ? (
                    <div className="error-message">{errors.confirm}</div>
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
                  <Link
                    className="button is-dark is-rounded"
                    to="/settings"
                  >
                    CANCEL
                  </Link>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
