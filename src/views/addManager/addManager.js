import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import * as axios from "axios";
import { AddProperty } from '../addProperty/addProperty';
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import UserContext from "../../UserContext";
import Button from "../../components/Button";
import Modal from '../../components/Modal';
import Toast from '../../utils/toast';
import useMountEffect from '../../utils/useMountEffect';
import './addManager.scss';
import RoleEnum from '../../Enums/RoleEnum';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255, "Must be shorter than 255 Characters")
    .required("Must enter a First Name"),
  lastName: Yup.string()
    .max(255, "Must be shorter than 255 Characters")
    .required("Must enter a Last Name"),
  phone: Yup.string()
    .min(
      5,
      "*Number must contain at least 5 digits to be a valid phone/text number"
    )
    .max(20, "*Numbers can't be longer than 20 digits")
    .required("*a valid phone number is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .max(255, "Must be shorter than 255")
    .required("Must enter an email"),
});

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

export const AddManager = () => {
  const context = useContext(UserContext);
  const [propertySearchText, setPropertySearchText] = useState("");
  const [propertySelection, setPropertySelection] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [propertySearchResults, setPropertySearchResults] = useState([]);
  const [showAddProperty, setShowAddProperty] = useState(false);

  useMountEffect(() => getProperties());

  useEffect(() => {
    let choices = propertyOptions.filter(
      p => p.description.toLowerCase().includes(propertySearchText.toLowerCase()));
    setPropertySearchResults(choices);
  }, [propertySearchText, propertyOptions]);

  const getProperties = () => {
    axios.get("/api/properties", makeAuthHeaders(context))
      .then(({ data }) => {
        let properties = data.properties && data.properties.length > 0
          ? data.properties.map(property => {
            return {
              key: property.id,
              description: `${property.name}, ${property.address}`
            };
          })
          : data.properties;
        setPropertyOptions(properties);
        setPropertySearchResults(properties);
        setShowAddProperty(false);
      });
  };

  const handleFormSubmit = (data) => {
    let body = {
      ...data,
      password: 'changeAt1stLogin!',
      confirmPassword: 'changeAt1stLogin!',
      role: "PROPERTY_MANAGER",
    };
    
    let properties = {
      propertyIDs: propertySelection.map(p => p.key)
    }

    axios
      .post(`/api/user/add`, body, makeAuthHeaders(context))
      .then(response => {
        const managers = [] //backend is expecting an array to resolve assignment
        managers.push(response.data.id)
        console.log(managers)
        properties.propertyIDs.forEach(i => { 
          axios
          .put(`/api/properties/${i}`, {propertyManagerIDs: managers})  })
      })
      .then(() => {
        Toast("Property Manager Created Successfully!", "success");
      })
      .catch((error) => {
        Toast(error.message, "error");
      });
  };

  const handleAddPropertyCancel = () => {
    setShowAddProperty(false);
  };

  /**
   * Handle property search input
   * @param {*} event
   */
  const handlePropertySearch = (event) => {
    const { value } = event.target;
    if(!value || value.length === 0) {
      setPropertySearchResults(propertyOptions);
      setPropertySearchText("");
    } else {
      setPropertySearchText(value);
    }
  };

  return (
    <div className='main-container'>
      <div>
        <h2 className="page-title">Add a New Property Manager</h2>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const toSubmit = {
              ...values
            };

            setSubmitting(true);
            handleFormSubmit(toSubmit);
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
              <div className="add-manager__main_container">
                <h1 className="section-title">CONTACT INFORMATION</h1>
                <Form className="add-manager__form-container" onSubmit={handleSubmit}>
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
                  <div className="form-row" style={{ marginBottom: "20px" }}>
                    <label
                      className="column is-one-fifth"
                      id="email"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Field
                      className="column form-field"
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      placeholder="Enter your email address"
                    />
                    {errors.email ? (
                      <div className="error-message">{errors.email}</div>
                    ) : null}
                  </div>
                  <h1 className="section-title">ASSIGN PROPERTIES</h1>
                  <div className="typeahead-section">
                    <SearchPanel
                      chips
                      clearLabel="Clear search text"
                      placeholder="Search Properties"
                      small
                      width={400}
                      variant={SearchPanelVariant.checkbox}
                      choices={propertySearchResults}
                      value={propertySearchText}
                      onSelectionChange={setPropertySelection}
                      onChange={handlePropertySearch}
                      onClear={handlePropertySearch}
                      shadow
                    />
                    <button
                      className="add-property-button"
                      onClick={() => setShowAddProperty(!showAddProperty)}
                      type="button"
                    >
                      <i className="fas fa-plus-circle icon-inline-space"></i>
                      Create New Property
                    </button>
                  </div>
                  <div className="button-container">
                    <Button
                      isCancelButton={false}
                      type="submit"
                      disabledFlag={isSubmitting}
                      isValidFlag={isValid}
                    >
                      SAVE
                    </Button>
                    <Link
                      className="button is-dark is-rounded"
                      to="/manage/managers"
                    >
                      CANCEL
                    </Link>
                  </div>
                </Form>
              </div>
            )}
        </Formik>
        {showAddProperty &&
          <Modal
            titleText="Create New Property"
            content={<AddProperty showPageTitle={false} postOnSubmit={getProperties} handleCancel={handleAddPropertyCancel} />}
            hasButtons={false}
            closeHandler={handleAddPropertyCancel}
          />
        }
      </div>
    </div>
  );
};
