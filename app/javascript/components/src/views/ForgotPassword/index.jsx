import React, { useState, useContext } from "react";
import { Form, Field, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Modal from "../components/Modal";
import Button from "../components/Button";
import dwellinglylogo from "images/dwellingly_logo_white.png";
import UserContext from "../../contexts/UserContext";
import FieldError from "../components/FieldError";

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
    contentText: {},
    hasButtons: false,
  });

  const formHandler = (data) => {
    context.apiCall("post", "/users/password", data, {})
      .then(() => {
        setModalContent({
          titleText: "Success!",
          contentText: <p>Please check your email to reset your password.</p>
        })
        setIsModalOpen(true)
      })
      .catch(() => {
        setModalContent({
          titleText: "Error!",
          contentText: <p>There was an error attempting to reset your password.</p>
        })
        setIsModalOpen(true)
      })
  }

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
            setSubmitting(true)
            formHandler({user: values})
            resetForm()
            setSubmitting(false)
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
                Forgot your password? Please enter your email below to request a reset password email.
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
                </div>
                <FieldError error={errors.name} />
                <div className={"form-container__button-container"}>
                  <Button
                    type={"submit"}
                    isCancelButton={false}
                    isValidFlag={isValid}
                    disabledFlag={isSubmitting}
                  >
                    RESET PASSWORD
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
        <Link to="/login">
          Return to log in
        </Link>
      </div>
    </>
  )
}

export default ForgotPassword
