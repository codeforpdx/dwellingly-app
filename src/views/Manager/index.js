import React, { useState } from "react";
import ToggleEditTable from "../../components/ToggleEditTable";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import * as axios from "axios";
import { PROPERTY_MANAGER_DATA } from "../dummyData/pManagerData";

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

const Manager = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/\d/)[0];
  // can remove this once api is configured to return properties and tenants
  const dummyDataManagerInfo = PROPERTY_MANAGER_DATA.find(
    (manager) => manager.id === id
  );

  const [manager, setManager] = useState(dummyDataManagerInfo);
  const [isEditing, setEditingStatus] = useState(false);

  const tableData = [
    {
      key: "firstName",
      label: "First Name",
      value: manager.firstName,
      inputType: "text",
    },
    {
      key: "lastName",
      label: "Last Name",
      value: manager.lastName,
      inputType: "text",
    },
    {
      key: "phone",
      label: "Phone",
      value: manager.phone,
      inputType: "text",
    },
    {
      key: "email",
      label: "Email",
      value: manager.email,
      inputType: "text",
    },
  ];

  const handleEditToggle = () => setEditingStatus(!isEditing);
  const onFormikSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    setManager({
      ...manager,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
    });
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setEditingStatus(false);
    }, 500);
  };

  const onCancelClick = () => {
    setEditingStatus(false);
  };

  // use getManager once /users/?id api endpoint returns properties and tenants for property managers
  // eslint-disable-next-line no-unused-vars
  const getManager = (context) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/?id=${id}`, {
        headers: {
          Authorization: `Bearer ${context.user.accessJwt}`,
        },
      })
      .then((response) => {
        setManager({ manager: response.data.manager });
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  return (
    <div className="manager__container">
      <div className="title__container">
        <h2>
          {manager.firstName} {manager.lastName}
        </h2>
        <button
          className={`rounded${isEditing ? "--is-editing" : ""}`}
          onClick={handleEditToggle}
          disabled={isEditing}
        >
          <i className="fas fa-pen icon"></i>
        </button>
      </div>
      <div className="manager__contact">
        <h1 className="secondary-title">CONTACT</h1>
        <div className="contact-details">
          <ToggleEditTable
            tableData={tableData}
            validationSchema={validationSchema}
            isEditing={isEditing}
            submitHandler={onFormikSubmit}
            cancelHandler={onCancelClick}
          />
        </div>
      </div>
      <div className="manager__properties">
        <h1 className="secondary-title">PROPERTIES</h1>
        <div className="manager__properties__container">
          {manager.properties.map((property) => (
            <div key={property.name} className="manager__property__tile">
              <h3 key={property.name} className="manager__property__name">
                {property.name}
              </h3>
              <div className="manager__property__address">
                {property.streetAddress}
              </div>
              <div className="manager__property__address">
                {property.city}, {property.state} {property.zip}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="manager__tenants">
        <h1 className="section-title">TENANTS</h1>
        {manager.tenants.map((tenant) => (
          <div className="columns tenant__form-row" key={tenant.name}>
            <div className="column is-one-quarter bold tenant__name">
              {tenant.name}
            </div>
            <div className="column is-one-quarter">{tenant.property}</div>
            <div className="column is-one-quarter">{tenant.unit}</div>
            <div className="column is-one-quarter">{tenant.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manager;
