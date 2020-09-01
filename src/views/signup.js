/* eslint-disable react/jsx-filename-extension */
import React from "react";
import PropTypes from "prop-types";
import {
  Form, Field, Formik, ErrorMessage,
} from "formik";
import { Redirect } from "react-router";
import axios from "axios";
import * as Yup from "yup";
import UserContext from "../UserContext";
import dwellinglyLogo from "../assets/images/dwellingly_logo.png";
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
            <div className="login__container">
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
              <div className="login__form-container">
                {/* <Header /> */}
                <Form>
                  <img className="login__logo" src={dwellinglyLogo} alt="Dwellingly Logo" />
                  <h2 className="subtitle">
                    Create an Account
                  </h2>
                  <Field
                    className="form-field login__form-field"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                  />
                  <ErrorMessage className="form-error" name="firstName" component="div" />
                  <Field
                    className="form-field login__form-field"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                  />
                  <ErrorMessage className="form-error" name="lastName" component="div" />
                  <Field
                    className="form-field login__form-field"
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <ErrorMessage className="form-error" name="email" component="div" />
                  <Field
                    className="form-field login__form-field"
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    required
                  />
                  <ErrorMessage className="form-error" name="phone" component="div" />
                  <Field
                    className="form-field login__form-field"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <ErrorMessage className="form-error" name="password" component="div" />
                  <Field
                    className="form-field login__form-field"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                  />
                  <ErrorMessage className="form-error" name="confirmPassword" component="div" />

                  <div />
                  <button className="login__button" type="submit">
                    SIGN UP
                  </button>
                  <div className="login__or_container">
                    <div className="login__or">
                      <span className="login__divider" />
                      <span className="login__or_text">
                        OR
                      </span>
                    </div>
                  </div>
                </Form>
               <GoogleButton innerText ={"SIGN UP WITH GOOGLE"}/>
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
