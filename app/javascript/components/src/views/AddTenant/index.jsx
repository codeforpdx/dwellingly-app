import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserContext from "../../contexts/UserContext";
import Button from "../components/Button";
import { AddProperty } from '../AddProperty';
import Modal from '../components/Modal';
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import UserType from '../../Enums/UserType';
import './styles/index.scss';
import useMountEffect from '../../utils/useMountEffect';
import CalendarModal, { useCalendarState } from "../components/CalendarModal";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("*First Name is required"),
  lastName: Yup.string()
    .required("*Last Name is required"),
  phone: Yup.string()
    .min(10, "*Phone Number must have at least 10 characters")
    .max(30, "*Phone Number can't be longer than 30 characters")
    .required("*Phone Number is required"),
  unitNum: Yup.string(),
  occupants: Yup.number(),
});

const AddTenant = () => {
  const context = useContext(UserContext);
  const [staffSearchText, setStaffSearchText] = useState("");
  const [staffSearchResults, setStaffSearchResults] = useState([]);
  const [staffOptions, setStaffOptions] = useState([])
  const [staffSelections, setStaffSelections] = useState([]);
  const [propertySearchText, setPropertySearchText] = useState("");
  const [propertySelection, setPropertySelection] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [propertySearchResults, setPropertySearchResults] = useState([]);
  const [showAddProperty, setShowAddProperty] = useState(false);

  const calendarState = useCalendarState();
  const { dateTimeStart, dateTimeEnd, resetDates } = calendarState;

  useMountEffect(() => getProperties());
  useMountEffect(() => getStaff());

  useEffect(() => {
    let choices = staffOptions.filter(
      s => s.description.toLowerCase().includes(staffSearchText.toLowerCase()));
    setStaffSearchResults(choices);
    }, [staffSearchText, staffOptions]);

  useEffect(() => {
    let choices = propertyOptions.filter(
      p => p.description.toLowerCase().includes(propertySearchText.toLowerCase()));
    setPropertySearchResults(choices);
  }, [propertySearchText, propertyOptions]);

  const propertyOptionFormat = (property) => {
    return {
      key: property.id,
      description: `${property.name}, ${property.address}`
    }
  }

  const staffOptionFormat = (staff) => {
    return {
      key: staff.id,
      description: `${staff.firstName} ${staff.lastName}`
    }
  }

  const getStaff = () => {
    context.apiCall('get', '/staff', { name: staffSearchText }, {})
      .then(({ data }) => {
        const staff = data && data.length > 0
          ? data.map(joinStaff => {
            return staffOptionFormat(joinStaff)
          })
          : data
        setStaffOptions(staff);
      });
  }

  const getProperties = () => {
    context.apiCall('get', '/properties', {}, {})
      .then(({ data }) => {
        const properties = data && data.length > 0
          ? data.map(property => {
            return propertyOptionFormat(property)
          })
          : data;
        setPropertyOptions(properties);
      });
  };

  const handleFormSubmit = (data) => {
    context.apiCall('post', `/tenants`, data, { success: 'Tenant Created Successfully!'});
  };

  const closePropertyModal = () => {
    setShowAddProperty(false);
  }

  const closeAndSetProperty = (property) => {
    closePropertyModal()
    setPropertySelection([propertyOptionFormat(property)])
    setPropertyOptions(propertyOptions.concat([propertyOptionFormat(property)]))
  }

  /**
   * Handle staff search input
   * @param {*} event
   */
  const handleStaffSearch = (event) => {
    const { value } = event.target;
    if(!value || value.length === 0) {
      setStaffSearchResults(staffOptions);
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

  /**
   * Validate the property selection and lease dates
   */
  const validateForm = (values) => {
    const errors = {}
    if (propertySelection.length) {
      if (dateTimeStart === dateTimeEnd){
        errors.lease = "Lease dates required when a property is selected"
      }
    }
    if (dateTimeStart !== dateTimeEnd) {
      if (!propertySelection.length) {
        errors.propertySelection = "Property is required when lease dates are selected"
      }
    }
    if (values.unitNum || values.occupants) {
      if (!propertySelection.length) {
        errors.propertySelection = "Property is required when creating a lease"
      }
      if (dateTimeStart === dateTimeEnd) {
        errors.lease = "Lease dates required when creating a lease"
      }
    }

    return errors
  }

  const dateEntered = () => {
    return dateTimeStart !== dateTimeEnd
  }

  const renderErrorMsg = msg =>
    <div className="error-message">{msg}</div>

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
            propertySelection: null,
            lease: null,
          }}
          validationSchema={validationSchema}
          validate={validateForm}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const payload = {
              firstName: values.firstName,
              lastName: values.lastName,
              phone: values.phone,
              staff_ids: staffSelections && staffSelections.map(staff => staff.key),
              lease_attributes: {
                occupants: values.occupants || null,
                unitNum: values.unitNum || null,
                property_id: propertySelection.length ? propertySelection[0].key : null,
                dateTimeStart: dateEntered() ? dateTimeStart : null,
                dateTimeEnd: dateEntered() ? dateTimeEnd : null
              }
            }

            if (Object.values(payload.lease_attributes).every((value) => value === null)) {
              delete payload.lease_attributes
            }

            setSubmitting(true)
            handleFormSubmit(payload)
            resetForm()
            setPropertySearchText("");
            setPropertySelection([]);
            setStaffSearchText("");
            setStaffSelections([]);
            resetDates();
            setSubmitting(false);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
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
                    <ErrorMessage
                      name="firstName"
                      render={renderErrorMsg}
                    />
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
                    <ErrorMessage
                      name="lastName"
                      render={renderErrorMsg}
                    />
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
                    <ErrorMessage
                      name="phone"
                      render={renderErrorMsg}
                    />
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
                      placeholder="Search JOIN Staff"
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
                    <ErrorMessage
                      name="propertySelection"
                      render={renderErrorMsg}
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
                    <ErrorMessage
                      name="unitNum"
                      render={renderErrorMsg}
                    />
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
                    <ErrorMessage
                      name="occupants"
                      render={renderErrorMsg}
                    />
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
                      value={dateTimeEnd !== dateTimeStart
                        ? `${dateTimeStart.toDateString()} - ${dateTimeEnd.toDateString()}`
                        : ""
                      }
                      placeholder="Lease dates (Optional)"
                    />
                    <ErrorMessage
                      name="lease"
                      render={renderErrorMsg}
                    />
                    <CalendarModal title="Lease Range" calendarState={calendarState} iconYPosition="0.8rem" />
                  </div>

                  <div className="button-container">
                    <Button
                      isCancelButton={false}
                      type="submit"
                      disabledFlag={ isSubmitting }
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
            content={
              <AddProperty
                showPageTitle={false}
                handleCancel={closePropertyModal}
                afterCreate={closeAndSetProperty}
              />
            }
            hasButtons={false}
            closeHandler={closePropertyModal}
          />
        }
      </div>
    </div>
  );
};

export default AddTenant;
