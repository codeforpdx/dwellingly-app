/* eslint-disable react/jsx-filename-extension */
import React from "react";
import PropTypes from "prop-types";
import {
  Form, Field, Formik, ErrorMessage,
} from "formik";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import UserContext from "../UserContext";
import dwellinglyLogo from "../assets/images/dwellingly_logo.png";
import dwellinglyLogoMobile from "../assets/images/dwellingly_logo_white.png";
import GoogleButton from "../components/GoogleButton"

const SignupForm = ({ history }) => {
  const signup = async (firstName, lastName, email, phone, password, confirmPassword) => {
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
        alert(error.response.data.message);
      } else {
        alert(error);
      }
      return Promise.reject(error);
    }
    if (response) {
      const success = "Account Created Successfully!";
      console.log(success);
      alert(success);
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
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

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
              <div className= "signup__form-container">
              <div className = "signup__mobile-header">
                <img className= "signup__logo__mobile" src={dwellinglyLogoMobile}></img>
              </div>
                {/* <Header /> */}
                <Form className="signup__form-field-container">
                  <img className= "signup__logo" src={dwellinglyLogo} alt="Dwellingly Logo" />
                  <h2 className="subtitle">
                    Create an Account
                  </h2>
                  <h2 className="signup__mobile-heading">
                    <div className="signup__mobile-heading__text-wrapper">Create an Account for Dwelling.ly </div>  
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
                  <button className="signup__button" type="submit">
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
                <div className="signup__googleButtonWrapper">
                  <GoogleButton innerText ={"SIGN UP WITH GOOGLE"}/>
                </div>
                <div className="signup__privacyPolicyWrapper"> <Link to="/" className="signup__privacyPolicyText">Privacy Policy</Link></div>
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
