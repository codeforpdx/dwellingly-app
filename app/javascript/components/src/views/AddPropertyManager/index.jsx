import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import UserContext from "../../contexts/UserContext";
import Button from "../components/Button";
import UserType from '../../Enums/UserType';
import PropertySearchPanel from "../components/PropertySearchPanel";
import FieldError from "../components/FieldError";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255, "*Must be shorter than 255 Characters")
    .required("*Must enter a First Name"),
  lastName: Yup.string()
    .max(255, "*Must be shorter than 255 Characters")
    .required("*Must enter a Last Name"),
  phone: Yup.string()
    .min(
      5,
      "*Number must contain at least 5 digits to be a valid phone/text number"
    )
    .max(20, "*Numbers can't be longer than 20 digits")
    .required("*A valid phone number is required"),
  email: Yup.string()
    .email("*Must be a valid email address")
    .max(255, "*Must be shorter than 255")
    .required("*Must enter an email"),
});

const AddPropertyManager = () => {
  const context = useContext(UserContext);
  const [propertySelection, setPropertySelection] = useState([]);

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      type: UserType.PROPERTY_MANAGER,
      property_ids: propertySelection?.map(p => p.key)
    };

    setSubmitting(true);

    context.apiCall('post', `/users/invitation`, payload,
      { success: `Property Manager Created Successfully, an invite email has been sent.` })
      .then((response) => {
        if (response) {
          resetForm();
          setPropertySelection([]);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
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
          onSubmit={handleFormSubmit}
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
                  </div>
                  <FieldError error={errors.firstName} />
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
                  </div>
                  <FieldError error={errors.lastName} />
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
                  </div>
                  <FieldError error={errors.phone} />
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
                  </div>
                  <FieldError error={errors.email} />
                  <h1 className="section-title">ASSIGN PROPERTIES</h1>
                  <div className="typeahead-section">
                    <PropertySearchPanel
                      initialPropertyIds={[]}
                      propertySelections={propertySelection}
                      setPropertySelection={setPropertySelection}
                      multiSelect={true}
                      showAddPropertyButton={true}
                    />
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
      </div>
    </div>
  );
};

export default AddPropertyManager;
