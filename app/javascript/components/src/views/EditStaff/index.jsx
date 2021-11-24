import React, { useState, useContext, useEffect } from 'react';
import ToggleEditTable from "../../components/ToggleEditTable";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import './styles/index.scss';
import TitleAndPen, { useEditingStatus } from "../../components/TitleAndPen";
import UserContext from '../../UserContext';
import RoleEnum from '../../Enums/RoleEnum';
import RemoveTenantButton from '../Property/RemoveTenantButton';
import Modal from '../../components/Modal/index';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from "react-router-dom";

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
  const [confirmTenantRemoval, setConfirmTenantRemoval] = useState(false);
  const [tenantToRemove, setTenantToRemove] = useState('');

  useEffect(() => {
    if(id) {
      getStaff(id);
    }
  }, []);

  const getStaff = (staffId) => {
    userContext.apiCall('get', `/user/${staffId}`, {}, {})
      .then((response) => {
        const staff = response.data;
        setStaffMember(staff);
      });
  };

  const update = (payload) => {
    userContext.apiCall('patch', `/user/${id}`, payload, { success: "Save successful!" })
      .then(response => {
        setStaffMember({
          ...staffMember,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          email: response.data.email,
          role: response.data.role
        });
        setEditingStatus(false);
      });
  };

  const removeTenant = (tenant) => {
    setTenantToRemove(tenant);
    setConfirmTenantRemoval(true);
  }

  const handleTenantConfirmButton = () => {
    const leaseId = tenantToRemove.lease.id;
    userContext.apiCall('delete', `/lease/${leaseId}`, {}, { success: 'Tenant successfully removed' })
      .then(res => {
        getStaff();
        setConfirmTenantRemoval(false);
        setEditingStatus(false);
      });
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
      value: staffMember.role === RoleEnum.ADMIN,
      inputType: "checkbox"
    }
  ];

  const columns = [
    {
      dataField: "fullName",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <Link key={row.fullName} to={`/manage/tenants/${row.id}`}>
            {row.fullName}
          </Link>
        );
      },
      text: "Tenants",
      sort: true,
    },
    {
      dataField: "lease.unitNum",
      text: "Unit",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
    },
  ];

  const editColumn = {
    dataField: "remove",
    text: "Remove",
    sort: false,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <RemoveTenantButton tenant={row} removeTenant={removeTenant} isEditing={isEditing} />
      )
    }
  }

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
              {
              isEditing ?
                <BootstrapTable
                  keyField='id'
                  data={staffMember.tenants ? staffMember.tenants : []}
                  columns={[...columns, editColumn]}
                  bootstrap4={true}
                  headerClasses="table-header"
                />
                :
                <BootstrapTable
                  keyField='id'
                  data={staffMember.tenants ? staffMember.tenants : []}
                  columns={columns}
                  bootstrap4={true}
                  headerClasses="table-header"
                />
              }
            </div>
          </div>
        ) : null}
      </div>
      {confirmTenantRemoval &&
          <Modal
            content={<p>{`Are you sure you want to remove ${tenantToRemove.fullName}?`}</p>}
            hasButtons={true}
            confirmButtonHandler={handleTenantConfirmButton}
            closeHandler={() => {
              setConfirmTenantRemoval(false);
            }}
            cancelButtonHandler={() => onCancelClick()}
            confirmText={"YES"}
            cancelText={"NO"}
          />
        }
    </div>
  )
}

export default EditStaff;