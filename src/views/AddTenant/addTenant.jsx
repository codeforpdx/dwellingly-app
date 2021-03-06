import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import * as axios from "axios";
import UserContext from "../../UserContext";
import Button from "../../components/Button";
import { AddProperty } from '../addProperty/addProperty';
import Modal from '../../components/Modal';
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import RoleEnum from '../../Enums/RoleEnum';
import './_addTenant.scss';
import Toast from '../../utils/toast';
import useMountEffect from '../../utils/useMountEffect';
import CalendarModal, { useCalendarState } from "../../components/CalendarModal/CalendarModal";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("*First Name is required"),
  lastName: Yup.string()
    .required("*Last Name is required"),
  phone: Yup.string()
    .min(7, "*Phone Number must have at least 7 characters")
    .max(20, "*Phone Number can't be longer than 20 characters")
    .required("*Phone Number is required"),
  unitNum: Yup.string(),
  occupants: Yup.number(),
});

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

export const AddTenant = () => {
  const context = useContext(UserContext);
  const [staffSearchText, setStaffSearchText] = useState("");
  const [staffSearchResults, setStaffSearchResults] = useState([]);
  const [staffSelections, setStaffSelections] = useState([]);
  const [propertySearchText, setPropertySearchText] = useState("");
  const [propertySelection, setPropertySelection] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [propertySearchResults, setPropertySearchResults] = useState([]);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [isValidationActive, setIsValidationActive] = useState(false);
  const [propertyErrorText, setPropertyErrorText] = useState("");

  const calendarState = useCalendarState();
  const { dateTimeStart, dateTimeEnd, resetDates } = calendarState;

  useMountEffect(() => getProperties());

  useEffect(() => validateForm(), [propertySelection, dateTimeStart, dateTimeEnd]);

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
    axios
      .post(`/api/tenants`, data, makeAuthHeaders(context))
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
    if(!value || value.length === 0) {
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
    if(!value || value.length === 0) {
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

  const validateForm = (values) => {
    setIsValidationActive(true);

    if (dateTimeStart !== dateTimeEnd) {
      setPropertyErrorText(dateTimeStart !== dateTimeEnd && propertySelection.length
        ? "" 
        : "*Property is a required field"
      );
    }
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
          }}
          validationSchema={validationSchema}
          validate={validateForm}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const toSubmit = {
              ...values,
              occupants: values.occupants || null,
              unitNum: values.unitNum || null,
              propertyID: propertySelection.length ? propertySelection[0].key : null,
              staffIDs: staffSelections && staffSelections.map(staff => staff.key)
            };
            if (dateTimeStart !== dateTimeEnd) {
              toSubmit.dateTimeStart = dateTimeStart;
              toSubmit.dateTimeEnd = dateTimeEnd;
            }

            setSubmitting(true);
            handleFormSubmit(toSubmit);
            resetForm();
            setPropertySearchText("");
            setPropertySelection([]);
            setStaffSearchText("");
            setStaffSelections([]);
            setPropertyErrorText("");
            resetDates();
            setIsValidationActive(false);
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
                      preSelectedChoices={propertySelection}
                      shadow
                    />
                    {isValidationActive && propertyErrorText ? (
                      <div className="error-message">{propertyErrorText}</div>
                    ) : null}
                    <button
                      className="add-property-button"
                      onClick={() => setShowAddProperty(!showAddProperty)}
                      type="button"
                    >
                      <i className="fas fa-plus-circle icon-inline-space"></i>
                      Create New Property
                    </button>
                  </div>
                  <h1 className="section-title">LEASE</h1>
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
                    {errors.unitNum ? (
                      <div className="error-message">{errors.unitNum}</div>
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
                      placeholder="Total number of unit tenants (Optional)"
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
                      onChange={validateForm}
                      value={dateTimeEnd !== dateTimeStart 
                        ? `${dateTimeStart.toDateString()} - ${dateTimeEnd.toDateString()}` 
                        : ""
                      }
                      placeholder="Lease dates (Optional)"
                    />
                    <CalendarModal title="Lease Range" calendarState={calendarState} iconYPosition="0.8rem" />
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
