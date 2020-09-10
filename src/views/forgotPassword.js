import React, { useState, useContext } from "react";
import { Form, Field, Formik } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import UserContext from "../UserContext";
import * as axios from "axios";
import Modal from "../components/Modal";
import Header from "../components/Header";

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

  const formHandler = data => {
    console.log("its handling its biz!");
    setModalContent({
      titleText: "Success!",
      contentText:
        "Please check your email to reset your password.",
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
  }

  return (
    <>
      <Header />
      <div className="forgot-password__container">
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
            <div className="form-container forgot-password__main_container">
              <p className="para-text">
                Forgot your password? It happens to all of us. To recover your
                password, follow the instructions that relate to your account.
              </p>
              <h1 className="section-title">EMAIL/PASSWORD USERS</h1>
              <Form
                className="forgot-password__form-container"
                onSubmit={handleSubmit}
              >
                <div className="form-row columns">
                  <label className="column is-one-fifth" htmlFor="name">
                    Email
                  </label>
                  <Field
                    className="column form-field"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Please enter your email address"
                  />
                  {errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </div>
                <div className="forgot-password__container-footer">
                  <button
                    className={`${
                      isValid && "active"
                    } save_button button is-rounded`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    REQUEST PASSWORD RESET
                  </button>
                  <div className="forgot-password__google-users">
                    <NavLink to="/login">Return to log in</NavLink>
                    <h1 className="section-title">GOOGLE ACCOUNT USERS</h1>
                    <NavLink to="">Recover your account</NavLink>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ForgotPassword;
