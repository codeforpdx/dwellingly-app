import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import * as axios from "axios";
import UserContext from "../../UserContext";
import Button from "../../components/Button";
import Modal from '../../components/Modal';
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import RoleEnum from '../../Enums/RoleEnum.js';
import './_addTenant.scss';
import Toast from '../../utils/toast';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("*First Name is required"),
  lastName: Yup.string()
    .required("*Last Name is required"),
  phone: Yup.string()
    .min(7, "*Phone Number must have at least 7 characters")
    .max(20, "*Phone Number can't be longer than 20 characters")
    .required("*Phone Number is required"),
  unitNum: Yup.number(),
  occupants: Yup.number()
    .required("*Number of Occupants is required"),
  lease: Yup.string()
    .required("*Lease dates are required"),
});

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

export const AddTenant = () => {
  const context = useContext(UserContext);
  const [staffSearchText, setStaffSearchText] = useState("");
  const [staffSearchResults, setStaffSearchResults] = useState([]);
  const [staffSelections, setStaffSelections] = useState(null);
  const [propertySearchText, setPropertySearchText] = useState("");
  const [propertySelection, setPropertySelection] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [propertySearchResults, setPropertySearchResults] = useState([]);
  const [showAddProperty, setShowAddProperty] = useState(false);

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  useEffect(() => {
    axios.post("/api/users/role", {
      userrole: RoleEnum.STAFF,
      name: staffSearchText
    })
      .then(staffResponse => {
        let users = staffResponse.data.users;
        let choices = users
          ? users.map(u => {
            return { key: u.id, description: `${u.firstName} ${u.lastName}` };
          })
          : [];
        setStaffSearchResults(choices);
      })
      .catch(error => {
        Toast(error.message, "error");
      });
  }, [staffSearchText]);

  useEffect(() => {
    let choices = propertyOptions.filter(
      p => p.description.includes(propertySearchText));
    setPropertySearchResults(choices);
  }, [propertySearchText]);

  const getProperties = useCallback(() => {
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
      propertyID: propertySelection[0].key,
      staffIDs: staffSelections && staffSelections.map(staff => staff.key)
    };
    axios
      .post(`/api/tenants`, body, makeAuthHeaders(context))
      .then((response) => {
        Toast("Tenant Created Successfully!", "success");
      })
      .catch((error) => {
        Toast(error.message, "error");
        console.log(error);
      });
  };

  const handleAddPropertyCancel = () => {
    setShowAddProperty(false);
  };

  /**
   * Handle staff search input
   * @param {*} event
   */
  const handleStaffSearch = (event) => {
    const { value } = event.target;
    if (!value || value.length === 0) {
      setStaffSearchResults([]);
      setStaffSearchText("");
    } else {
      setStaffSearchText(value);
    }
  };

  /**
   * Handle property search input
   * @param {*} event
   */
  const handlePropertySearch = (event) => {
    const { value } = event.target;
    if (!value || value.length === 0) {
      setPropertySearchResults(propertyOptions);
      setPropertySearchText("");
    } else {
      setPropertySearchText(value);
    }
  };

  /**
   * Handle change in staff selections of search panel
   * @param {*} selectedChoices
   */
  const handleChangeStaffSelections = (selectedChoices) => {
    setStaffSelections(selectedChoices);
  };

  return (
    <div className='main-container'>
      <div>
        <h2 className="page-title">Add a New Tenant</h2>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phone: "",
            unitNum: "",
            occupants: "",
            lease: ""
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
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
                    <SearchPanel
                      chips
                      choices={staffSearchResults}
                      clearLabel="Clear search text"
                      onChange={handleStaffSearch}
                      onClear={handleStaffSearch}
                      onSelectionChange={handleChangeStaffSelections}
                      placeholder="Search JOIN staff"
                      preSelectedChoices={staffSelections}
                      small
                      value={staffSearchText}
                      variant={SearchPanelVariant.checkbox}
                      width={400}
                      shadow
                    />
                  </div>
                  <h1 className="section-title">PROPERTY</h1>
                  <div className="typeahead-section">
                    <SearchPanel
                      chips
                      clearLabel="Clear search text"
                      placeholder="Search Properties"
                      small
                      width={400}
                      variant={SearchPanelVariant.radio}
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
                      name="unitNum"
                      onChange={handleChange}
                      value={values.unitNum}
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
                      type="submit"
                      disabledFlag={isSubmitting}
                      isValidFlag={isValid}
                    >
                      SAVE
                </Button>
                    <Link
                      className="button is-dark is-rounded"
                      to="/manage/tenants"
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
