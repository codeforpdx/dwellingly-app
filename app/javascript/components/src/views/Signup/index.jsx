import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import UserContext from "../../contexts/UserContext";
import dwellinglyLogo from "../../assets/images/dwellingly_logo.png";
import dwellinglyLogoMobile from "../../assets/images/dwellingly_logo_white.png";
import Modal from "../components/Modal";

import "./styles/index.scss";

const SignupForm = ({ history }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const context = useContext(UserContext);

  const signup = (
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword
  ) =>
    context
      .apiCall(
        "post",
        "/register",
        {
          firstName,
          lastName,
          email,
          phone,
          password,
          confirmPassword,
        },
        { success: "Account Created Successfully!" }
      )
      .then((res) => {
        if (res === false) {
          setShowErrorModal(true);
        } else {
          setShowConfirmationModal(true);
        }
      });

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
      .matches(
        /[a-z]/,
        "Password must contain at least one lowercase character"
      )
      .matches(/[A-Z]/, "Password must contain one uppercase character")
      .matches(
        /[a-zA-Z]+[^a-zA-Z\s]+/,
        "Password must contain at least 1 number or special char (@,!,#, etc)"
      ),
    confirmPassword: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleClick = () => {
    history.push("/login");
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <UserContext.Consumer>
      {({ user }) =>
        user.isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
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
                firstName,
                lastName,
                email,
                phone,
                password,
                confirmPassword,
              }) => {
                signup(
                  firstName,
                  lastName,
                  email,
                  phone,
                  password,
                  confirmPassword
                );
              }}
              enableReinitialize>
              {() => (
                <div className="signup__form-container">
                  <div className="signup__mobile-header">
                    <header className="navbar bg-gradient">
                      <Link className="navbar-item" id="header-logo" to="/">
                        <img src={dwellinglyLogoMobile} alt="dwellingly logo" />
                      </Link>
                    </header>
                  </div>
                  <Form className="signup__form-field-container">
                    <img
                      className="signup__logo"
                      src={dwellinglyLogo}
                      alt="Dwellingly Logo"
                    />
                    <h2 className="signup__subtitle">Create an Account</h2>
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

                      <ErrorMessage
                        className="form-error"
                        name="firstName"
                        component="div"
                      />
                    </div>

                    <div className="signup__form-cell-container">
                      <Field
                        className="form-field signup__form-field"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        required
                      />

                      <ErrorMessage
                        className="form-error"
                        name="lastName"
                        component="div"
                      />
                    </div>

                    <div className="signup__form-cell-container">
                      <Field
                        className="form-field signup__form-field"
                        type="text"
                        name="email"
                        placeholder="Email"
                        required
                      />

                      <ErrorMessage
                        className="form-error"
                        name="email"
                        component="div"
                      />
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

                      <ErrorMessage
                        className="form-error"
                        name="phone"
                        component="div"
                      />
                    </div>

                    <div className="signup__form-cell-container">
                      <Field
                        className="form-field signup__form-field"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                      />

                      <ErrorMessage
                        className="form-error"
                        name="password"
                        component="div"
                      />
                    </div>

                    <div className="signup__form-cell-container">
                      <Field
                        className="form-field signup__form-field"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                      />

                      <ErrorMessage
                        className="form-error"
                        name="confirmPassword"
                        component="div"
                      />
                    </div>

                    <div />
                    <button
                      className="button is-rounded is-primary is-small mt-3"
                      type="submit">
                      SIGN UP
                    </button>
                    <div className="signup__or_container">
                      <div className="signup__or">
                        <span className="signup__divider" />
                        <span className="signup__or_text">OR</span>
                      </div>
                    </div>
                  </Form>
                  <button
                    className="button is-rounded is-primary is-small mt-2"
                    type="button"
                    onClick={handleClick}>
                    LOG IN
                  </button>
                  <div className="signup__privacyPolicyWrapper">
                    <Link
                      to="/privacypolicy"
                      className="signup__privacyPolicyText">
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              )}
            </Formik>
            {showConfirmationModal && (
              <Modal
                titleText="Account Created!"
                content={
                  <div>
                    <p>
                      You have successfully made an account with Dwelling.ly.
                      Your account must be approved by an Admin before you can
                      use it.
                    </p>
                    <br />
                    <p>
                      Keep your eye out for an approval email with instructions
                      on how to access your account.
                    </p>
                  </div>
                }
                hasButtons={false}
                hasRedirectButton={true}
                redirectButtonPath="/login"
                redirectButtonText="Return to Login"
                closeHandler={closeConfirmationModal}
              />
            )}
            {showErrorModal && (
              <Modal
                titleText="Account Creation Failed"
                content={
                  <div>
                    <p>
                      We couldn't create your account at this time. Please try
                      again later.
                    </p>
                  </div>
                }
                hasButtons={false}
                hasRedirectButton={false}
                closeHandler={closeErrorModal}
              />
            )}
          </div>
        )
      }
    </UserContext.Consumer>
  );
};

SignupForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignupForm;
