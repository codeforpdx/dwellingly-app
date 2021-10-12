import React, { useState, useContext } from "react";
import { Form, Field, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import dwellinglylogo from "../../assets/images/dwellingly_logo_white.png";
import UserContext from "../../UserContext";

import './forgotPassword.scss'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("*Please enter a valid email")
    .required("*Email is required"),
});

const ForgotPassword = () => {
  const context = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    titleText: "",
    contentText: "",
    hasButtons: false,
  });

  const formHandler = (data) => {
    console.log(data);
    context.apiCall('post', '/reset-password', data, {})
      .then(response => {
        setModalContent({
          titleText: "Success!",
          contentText: "Please check your email to reset your password."
        });
        setIsModalOpen(true);
      })
      .catch(_ => {
        setModalContent({
          titleText: "Error!",
          contentText: "I'm sorry, there was an error attempting to reset your password."
        });
        setIsModalOpen(true);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="navbar bg-gradient">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={dwellinglylogo} alt="dwellingly logo" />
          </Link>
        </div>
      </header>
      <div className="forgot-password">
        <h2 className="page-title">Forgot Password</h2>
        {isModalOpen && (
          <Modal
            titleText={modalContent.titleText}
            content={modalContent.contentText}
            hasButtons={false}
            closeHandler={closeModal}
            hasRedirectButton={true}
            redirectButtonPath="/login"
            redirectButtonText="Return to Login"
          />
        )}
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            formHandler(values);
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
              <div className="forgot-password__main_container">
                <p className="forgot-password__para-text">
                  Forgot your password? It happens to all of us. To recover your
                  password, follow the instructions that relate to your account.
              </p>
                <h1 className="forgot-password__section-title">
                  EMAIL/PASSWORD USERS
              </h1>
                <Form className="form-container" onSubmit={handleSubmit}>
                  <div className="form-container__form-row columns">
                    <label className="column is-one-fifth" htmlFor="name">
                      Email
                  </label>
                    <Field
                      className="column form-container__form-field"
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={values.name}
                      placeholder="Please enter your email address"
                    />
                    {errors.name ? (
                      <div className="form-container__error-message">
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className={"form-container__button-container"}>
                    <Button
                      type={"submit"}
                      isCancelButton={false}
                      isValidFlag={isValid}
                      disabledFlag={isSubmitting}
                    >
                      REQUEST EMAIL PASSWORD RESET
                  </Button>
                  </div>
                </Form>
              </div>
            )}
        </Formik>
        <div className="forgot-password__google-users">
          <h1 className="forgot-password__section-title">
            GOOGLE ACCOUNT USERS
          </h1>
          <a href="https://accounts.google.com/signin/recovery">
            Recover your Google account
          </a>
        </div>
        <Link to="/login">
          Return to log in
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
