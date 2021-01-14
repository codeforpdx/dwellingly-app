import React, { useContext, useEffect, useState } from "react";
import ToggleEditTable from "../../components/ToggleEditTable";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import * as axios from "axios";
import UserContext from '../../UserContext';
import TitleAndPen, { useEditingStatus } from "../../components/TitleAndPen";
import Toast from '../../utils/toast';

import './manager.scss';

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

const getManager = (context, managerId, storeInState) => {
  axios
    .get(`${process.env.REACT_APP_PROXY}/api/user/${managerId}`,
      { Authorization: `Bearer ${context.user.accessJwt}` }
    )
    .then((response) => {
      const manager = response.data;
      storeInState(manager);
    })
    .catch(error => {
      Toast(error.message);
    });
};

const Manager = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/\d+/)[0];

  const userContext = useContext(UserContext);

  const [managerData, setManager] = useState();
  useEffect(() => {
    getManager(userContext, id, setManager);
  }, []);

  const { isEditing, setEditingStatus } = useEditingStatus()

  const tableData = managerData && [
    {
      key: "firstName",
      label: "First Name",
      value: managerData.firstName,
      inputType: "text",
    },
    {
      key: "lastName",
      label: "Last Name",
      value: managerData.lastName,
      inputType: "text",
    },
    {
      key: "phone",
      label: "Phone",
      value: managerData.phone,
      inputType: "text",
    },
    {
      key: "email",
      label: "Email",
      value: managerData.email,
      inputType: "text",
    },
  ];

  const updateManager = (payload) => {
    axios
      .patch(`${process.env.REACT_APP_PROXY}/api/user/${id}`,
        payload,
        { Authorization: `Bearer ${userContext.user.accessJwt}` }
      )
      .then(response => {
        setManager({
          ...managerData,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          email: response.data.email,
        });
        setEditingStatus(false);
        Toast("Save successful!");
      })
      .catch((error) => {
        Toast(error.message);
      });
  };

  const onFormikSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const newValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
    };
    updateManager(newValues);
  };

  const onCancelClick = () => {
    setEditingStatus(false);
  };

  return managerData ? (
    <div className="manager__container">
      <TitleAndPen title={`${managerData.firstName} ${managerData.lastName}`} isEditing={isEditing} setEditingStatus={setEditingStatus} />
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
          {managerData.properties.map((property) => (
            <div key={property.id} className="manager__property__tile">
              <h3 className="manager__property__name">
                {property.name}
              </h3>
              <div className="manager__property__address">
                {property.streetAddress}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="manager__tenants">
        <h1 className="section-title">TENANTS</h1>
        {managerData.tenants.map((tenant) =>
          <div key={tenant.id} className="columns tenant__form-row">
            <div className="column is-one-quarter bold tenant__name">
              {tenant.fullName}
            </div>
            <div className="column is-one-quarter">{tenant.propertyName}</div>
            <div className="column is-one-quarter">Unit #{tenant.unitNum}</div>
            <div className="column is-one-quarter">{tenant.phone}</div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default Manager;
