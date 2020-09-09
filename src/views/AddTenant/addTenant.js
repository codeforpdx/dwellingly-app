import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import * as axios from "axios";
import UserContext from "../../UserContext";
import Button from "../../components/Button";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("*First Name is required"),
  lastName: Yup.string()
    .required("*Last Name is required"),
  phone: Yup.string()
    .min(7, "Phone must have at least 7 characters")
    .max(20, "*Phone can't be longer than 20 characters")
    .required("*Phone Number is required")
});

export const AddTenant = () => {
  const context = useContext(UserContext);

  const handleFormSubmit = (data) => {
    axios
      .post(`/api/tenants`, data, {
        headers: { Authorization: `Bearer ${context.user.accessJwt}` },
      })
      .then((response) => {
        // once Toast is implemented, replace with Toast notification
        alert("Saved Successfully!");
      })
      .then(() => {

      })
      .catch((error) => {
        // once Toast is implemented, replace with Toast notification
        alert(error);
      });
  };

  return (
    <div>
      <h2 className="page-title">Add a New Tenant</h2>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phone: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleFormSubmit(values);
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
          <div className="add-tenant__main_container">
            <h1 className="section-title">Tenant Information</h1>
            <Form className="add-tenant__form-container" onSubmit={handleSubmit}>
              <div className="form-row">
                <label
                  className="column is-one-fifth"
                  id="firstName"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <Field
                  className="column form-field"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  placeholder="First Name"
                />
                {errors.firstName ? (
                  <div className="error-message">{errors.firstName}</div>
                ) : null}
              </div>
              <div className="form-row">
                <label
                  className="column is-one-fifth"
                  id="lastName"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <Field
                  className="column form-field"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  placeholder="Last Name"
                />
                {errors.lastName ? (
                  <div className="error-message">{errors.lastName}</div>
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
                  placeholder="Phone Number"
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
                <Link
                  className="styled-button__cancel styled-button"
                  to="/manage/tenants"
                >
                  CANCEL
                </Link>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
};
