import React, { useState, useContext, useEffect } from 'react';
import ToggleEditTable from "../components/ToggleEditForm";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import './styles/index.scss';
import TitleAndPen, { useEditingStatus } from "../components/TitleAndPen";
import UserContext from '../../contexts/UserContext';
import RoleEnum from '../../Enums/RoleEnum';
import TenantListMini from '../components/TenantListMini';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255, "Must be shorter than 255 Characters")
    .required("Must enter a First Name"),
  lastName: Yup.string()
    .max(255, "Must be shorter than 255 Characters")
    .required("Must enter a Last Name"),
  phone: Yup.string()
    .min(5, "*Number must contain at least 5 digits to be a valid phone/text number")
    .max(20, "*Numbers can't be longer than 20 digits")
    .required("Must enter a valid phone number"),
  email: Yup.string()
    .email("Must be a valid email address")
    .max(255, "Must be shorter than 255")
    .required("Must enter an email"),
});

const EditStaff = () => {
  const userContext = useContext(UserContext);
  const [staffMember, setStaffMember] = useState(null);
  const { id } = useParams();
  const { isEditing, setEditingStatus } = useEditingStatus();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if(id) {
      getStaff(id);
    }
  }, []);

  const getStaff = (staffId) => {
    userContext.apiCall('get', `/users/${staffId}`, {}, {})
      .then((response) => {
        const staff = response.data;
        setStaffMember(staff);
        setIsAdmin(staff.role === RoleEnum.ADMIN);
      });
  };

  const update = (payload) => {
    userContext.apiCall('patch', `/users/${id}`, payload, { success: "Save successful!" })
      .then(response => {
        setStaffMember({
          ...staffMember,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          email: response.data.email,
          role: response.data.role
        });
        setIsAdmin(response.data.role === RoleEnum.ADMIN);
        setEditingStatus(false);
      });
  };

  const handleTenantConfirmButton = (tenantToRemove) => {
    const payload = {
      tenants: staffMember.tenants.filter(tenant => tenant.id !== tenantToRemove.id)
    };
    update(payload);
  }

  const tableData = staffMember && [
    {
      key: "firstName",
      label: "First Name",
      value: staffMember.firstName,
      inputType: "text",
    },
    {
      key: "lastName",
      label: "Last Name",
      value: staffMember.lastName,
      inputType: "text",
    },
    {
      key: "phone",
      label: "Phone",
      value: staffMember.phone,
      inputType: "text",
    },
    {
      key: "email",
      label: "Email",
      value: staffMember.email,
      inputType: "text",
    },
    {
      key: "isAdmin",
      label: "Make Admin",
      value: isAdmin,
      inputType: "checkbox"
    }
  ];

  const onFormikSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const newValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      role: values.isAdmin ? RoleEnum.ADMIN : RoleEnum.STAFF
    };
    update(newValues);
  };

  const onCancelClick = () => {
    setEditingStatus(false);
  };

  return (
    <div className='main-container'>
      <div>
        {staffMember ? (
          <div>
            <TitleAndPen
              title={`${staffMember.firstName} ${staffMember.lastName}`}
              isEditing={isEditing}
              setEditingStatus={setEditingStatus}
            />
            <div className="section-container">
              <h2 className="secondary-title">CONTACT</h2>
            </div>
            <ToggleEditTable
              tableData={tableData}
              validationSchema={validationSchema}
              isEditing={isEditing}
              submitHandler={onFormikSubmit}
              cancelHandler={onCancelClick}
            />
            <div className="staff-member__tenants">
              <h1 className="section-title">TENANTS</h1>
              <TenantListMini
                tenantList={staffMember.tenants}
                handleTenantConfirmButton={handleTenantConfirmButton}
                isEditing={isEditing}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default EditStaff;