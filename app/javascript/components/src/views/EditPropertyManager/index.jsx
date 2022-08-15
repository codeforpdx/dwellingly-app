import React, { useContext, useEffect, useState } from "react";
import ToggleEditForm from "../components/ToggleEditForm";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import UserContext from '../../contexts/UserContext';
import TitleAndPen, { useEditingStatus } from "../components/TitleAndPen";
import InfoCard from "../components/InfoCard";

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

const getManager = (userContext, managerId, storeInState) => {
  userContext.apiCall('get', `/users/${managerId}`, {}, {})
    .then((response) => {
      const manager = response.data;
      storeInState(manager);
    });
};

const EditPropertyManager = () => {
  const userContext = useContext(UserContext);
  const { id } = useParams();

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
    userContext.apiCall('patch', `/users/${id}`, payload, { success: "Save successful!" })
      .then(response => {
        setManager({
          ...managerData,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          email: response.data.email,
        });
        setEditingStatus(false);
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

  return (
    <div className='main-container'>
      <div>
        {managerData ? (
          <div>
            <TitleAndPen
              title={`${managerData.firstName} ${managerData.lastName}`}
              isEditing={isEditing}
              setEditingStatus={setEditingStatus}
            />
            <div className="section-container">
              <h2 className="secondary-title">CONTACT</h2>
            </div>
            <ToggleEditForm
              tableData={tableData}
              validationSchema={validationSchema}
              isEditing={isEditing}
              submitHandler={onFormikSubmit}
              cancelHandler={onCancelClick}
            />
            <div className="section-container">
              <h2 className="secondary-title">PROPERTIES</h2>
              <div>
              {managerData.properties && managerData.properties.map(p => <InfoCard
                link={`/manage/properties/${p.id}`}
                title={p.name}
                descriptionOne={p.address}
                descriptionTwo={`${p.city} ${p.state}`}
              />)}
              </div>
            </div>
            <div className="manager__tenants">
              <h1 className="section-title">TENANTS</h1>
              {managerData.tenants && managerData.tenants.map((tenant) =>
                <div key={tenant.id} className="columns tenant__form-row">
                  <div className="column is-one-quarter bold tenant__name">
                    {tenant.fullName}
                  </div>
                  <div className="column is-one-quarter">{tenant.propertyName}</div>
                  <div className="column is-one-quarter">Unit #{tenant.lease.unitNum}</div>
                  <div className="column is-one-quarter">{tenant.phone}</div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div >
  )
};

export default EditPropertyManager;
