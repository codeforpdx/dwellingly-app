import React, { useState, useContext } from "react";
import { Form, Field, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import UserContext from "../UserContext";
import * as axios from "axios";
import Modal from "../components/Modal";
import Button from "../components/Button";
import dwellinglylogo from "../assets/images/dwellingly_logo_white.png";

//TODO:
// get the top line in the email field to go away - COME BACK TO THIS / NOTE IN PR
// move the request button to the left - COME BACK TO THIS AFTER FORM COMPONENT IS MERGED - Ask anna about this
// recover account link functionality ... ? - OH BOY!? Scratch head later on that one

// Hook up API call to send email password and use response to generate modal text - YES!
// 2. Do a database lookup to see if that email exists - THIS IS BLOCKED. NEED TO UPDATE USER RESOURCE'S GET TO ACCEPT EMAIL AS PARAMETER
// 3. If it exists, generate modal text with a "hey check your email" kind of message
// 4. If it doesn't exist, generate modal text with a "no email found" kind of message
// 5. If it exists, you also need to send an email, dummy! What goes in that email? Ask Chris or Hugh.
// 6. How the f-word do we generate a password? is this a backend thing?

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
    console.log("its handling its biz!");
    setModalContent({
      titleText: "Success!",
      contentText: "Please check your email to reset your password.",
    });
    setIsModalOpen(true);
    //   axios
    //     .post("http://localhost:5000/api/forgot-password", data)
    //     .then(response => {
    //       setModalContent({
    //        titleText: "Success!",
    //        contentText: "Please check your email to complete the process to reset your password."
    //      });
    //       setIsModalOpen(true);
    //     })
    //     .catch(error => {
    //       setModalContent({
    //        titleText: "Error!",
    //        contentText: "I'm sorry, there was an error attempting to reset your password."
    //      });
    //       setIsModalOpen(true);
    //     });
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
            contentText={modalContent.contentText}
            hasButtons={false}
            closeHandler={closeModal}
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
        {/* LEFT OFF TRYING TO STYLE THIS! */}
        <div className="forgot-password__google-users">
          <h1 className="forgot-password__section-title">
            GOOGLE ACCOUNT USERS
          </h1>
          <Link to="">Recover your Google account</Link>
        </div>
        <Link to="/login" className={"forgot-password__login-link"}>
          Return to log in
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
