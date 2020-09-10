import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import * as axios from "axios";
import UserContext from "../../UserContext";
import Button from "../../components/Button";
import Select from 'react-select';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("*First Name is required"),
  lastName: Yup.string()
    .required("*Last Name is required"),
  phone: Yup.string()
    .min(7, "*Phone Number must have at least 7 characters")
    .max(20, "*Phone Number can't be longer than 20 characters")
    .required("*Phone Number is required"),
  number: Yup.number(),
  occupants: Yup.number()
    .required("*Number of Occupants is required"),
  lease: Yup.string()
    .required("*Lease dates are required"),
});

export const AddTenant = () => {
  const context = useContext(UserContext);
  const [joinSelections, setJoinSelections] = useState([]);
  const [joinOptions, setJoinOptions] = useState([]);
  const [propertySelection, setPropertySelection] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);

  useEffect(() => {

  });

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

  const handleAddPropertyClick = () => {
    console.log("Open modal");
  }

  return (
    <div>
      <h2 className="page-title">Add a New Tenant</h2>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          number: "",
          occupants: "",
          lease: ""
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
            <h1 className="section-title">TENANT INFORMATION</h1>
            <Form className="add-tenant__form-container" onSubmit={handleSubmit}>
              <div className="form-row form-first-row">
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
              <div className="form-row" style={{ marginBottom: "20px" }}>
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
              <h1 className="section-title">ASSIGN JOIN STAFF</h1>
              <div className="typeahead-section">
                <Select
                  options={joinOptions}
                  getOptionLabel={(option) => option.name}
                  isMulti
                  name="join-staff-search"
                  isSearchable={true}
                  isClearable={true}
                  onChange={setJoinSelections}
                  placeholder="Search JOIN Staff"
                  styles={{ control: styles => ({ ...styles, borderRadius: "30px" }) }}
                />
              </div>
              <h1 className="section-title">PROPERTY</h1>
              <div className="typeahead-section">
                <Select
                  options={propertyOptions}
                  getOptionLabel={(option) => option.name}
                  isMulti={false}
                  name="property-search"
                  isSearchable={true}
                  isClearable={true}
                  onChange={setPropertySelection}
                  placeholder="Search properties"
                  styles={{ control: styles => ({ ...styles, borderRadius: "30px" }) }}
                />
                <button
                  className="add-property-button"
                  onClick={handleAddPropertyClick}
                >
                  <i className="fas fa-plus-circle icon-inline-space"></i>
                  Create New Property
                </button>
              </div>
              <h1 className="section-title">UNIT</h1>
              <div className="form-row form-first-row">
                <label
                  className="column is-one-fifth"
                  id="number"
                  htmlFor="number"
                >
                  Number
                </label>
                <Field
                  className="column form-field"
                  type="text"
                  name="number"
                  onChange={handleChange}
                  value={values.number}
                  placeholder="Unit Number (Optional)"
                />
                {errors.number ? (
                  <div className="error-message">{errors.number}</div>
                ) : null}
              </div>
              <div className="form-row">
                <label
                  className="column is-one-fifth"
                  id="occupants"
                  htmlFor="occupants"
                >
                  Occupants
                </label>
                <Field
                  className="column form-field"
                  type="text"
                  name="occupants"
                  onChange={handleChange}
                  value={values.occupants}
                  placeholder="Total number of unit tenants"
                />
                {errors.occupants ? (
                  <div className="error-message">{errors.occupants}</div>
                ) : null}
              </div>
              <div className="form-row" >
                <label
                  className="column is-one-fifth"
                  id="lease"
                  htmlFor="lease"
                >
                  Lease
                </label>
                <Field
                  className="column form-field"
                  type="text"
                  name="lease"
                  onChange={handleChange}
                  value={values.lease}
                  placeholder="Lease dates (Start and End)"
                />
                {errors.lease ? (
                  <div className="error-message">{errors.lease}</div>
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
