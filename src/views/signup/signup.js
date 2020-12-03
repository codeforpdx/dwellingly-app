import React from "react";
import PropTypes from "prop-types";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import UserContext from "../../UserContext";
import dwellinglyLogo from "../../assets/images/dwellingly_logo.png";
import dwellinglyLogoMobile from "../../assets/images/dwellingly_logo_white.png";
import Toast from '../../utils/toast';

import './signup.scss'

const SignupForm = ({ history }) => {
  const signup = async (
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword
  ) => {
    let response;
    try {
      response = await axios.post("/api/register", {
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        Toast(error.response.data.message, "error");
      } else {
        Toast(error.message, "error");
      }
      return Promise.reject(error);
    }
    if (response) {
      const success = "Account Created Successfully!";
      console.log(success);
      Toast(success, "success");
      // Redirect to login using the react router history
      history.push("/login");
    }
    return response;
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(80, "Maximum length is 80 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .max(80, "Maximum length is 80 characters")
      .required("Last name is required"),
    phone: Yup.string()
      .min(5, "Minimum length is 5 digits")
      .max(25, "Maximum length is 25 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Must be a valid email address")
      .max(100, "Maximum length is 100 characters")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Minimum Length is 8 characters")
      .matches(/[a-z]/, 'Password must contain at least one lowercase character')
      .matches(/[A-Z]/, 'Password must contain one uppercase character')
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'Password must contain at least 1 number or special char (@,!,#, etc)'),
    confirmPassword: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password"), null],
        "Passwords must match"
      ),
  });

  const handleClick = () => {
    history.push("/login");
  };

  return (
    <UserContext.Consumer>
      {({ user }) => (
        user.isAuthenticated
          ? <Redirect to="/dashboard" />
          : (
            <div className="signup__container">
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={({
                  firstName, lastName, email, phone, password, confirmPassword,
                }) => {
                  signup(firstName, lastName, email, phone, password, confirmPassword);
                }}
                enableReinitialize
              >
                {
                  () => (
                    <div className="signup__form-container">
                      <div className="signup__mobile-header">
                        <header className="navbar bg-gradient">
                          <Link className="navbar-item" id="header-logo" to="/">
                            <img src={dwellinglyLogoMobile} alt="dwellingly logo" />
                          </Link>
                        </header>
                      </div>
                      <Form className="signup__form-field-container">
                        <img className="signup__logo" src={dwellinglyLogo} alt="Dwellingly Logo" />
                        <h2 className="signup__subtitle">
                          Create an Account
                  </h2>
                        <h2 className="section-title signup__mobile-heading">
                          Create an Account for Dwelling.ly
                  </h2>


                        <div className="signup__form-cell-container">
                          <Field
                            className="form-field signup__form-field"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required
                          />

                          <ErrorMessage className="form-error" name="firstName" component="div" />
                        </div>


                        <div className="signup__form-cell-container">
                          <Field
                            className="form-field signup__form-field"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            required
                          />

                          <ErrorMessage className="form-error" name="lastName" component="div" />
                        </div>

                        <div className="signup__form-cell-container">
                          <Field
                            className="form-field signup__form-field"
                            type="text"
                            name="email"
                            placeholder="Email"
                            required
                          />

                          <ErrorMessage className="form-error" name="email" component="div" />
                        </div>

                        <div className="signup__form-cell-container">
                          <Field
                            className="form-field signup__form-field"
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            required
                          />

                          <ErrorMessage className="form-error" name="phone" component="div" />
                        </div>

                        <div className="signup__form-cell-container">
                          <Field
                            className="form-field signup__form-field"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                          />

                          <ErrorMessage className="form-error" name="password" component="div" />
                        </div>

                        <div className="signup__form-cell-container">
                          <Field
                            className="form-field signup__form-field"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            required
                          />

                          <ErrorMessage className="form-error" name="confirmPassword" component="div" />
                        </div>

                        <div />
                        <button className="button is-rounded is-primary is-small mt-3" type="submit">
                          SIGN UP
                  </button>
                        <div className="signup__or_container">
                          <div className="signup__or">
                            <span className="signup__divider" />
                            <span className="signup__or_text">
                              OR
                      </span>
                          </div>
                        </div>
                      </Form>
                      <button
                        className="button is-rounded is-primary is-small mt-2"
                        type="button"
                        onClick={handleClick}>
                        LOG IN
                </button>
                      <div className="signup__privacyPolicyWrapper"> <Link to="/privacypolicy" className="signup__privacyPolicyText">Privacy Policy</Link></div>
                    </div>
                  )
                }
              </Formik>
            </div>
          )
      )}
    </UserContext.Consumer>
  );
};

SignupForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignupForm;
