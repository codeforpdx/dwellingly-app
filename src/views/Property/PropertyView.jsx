import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as axios from "axios";
import Toast from '../../utils/toast';
import UserContext from '../../UserContext';
import * as Yup from "yup";
import ToggleEditTable from "../../components/ToggleEditTable";
import { useCalendarState } from "../../components/CalendarModal/CalendarModal";
import PropertyManagerCard from "../../components/PropertyManagerCard/PropertyManagerCard";
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from "react-router-dom";
import ManagerSearchPanel from '../../components/ManagerSearchPanel/ManagerSearchPanel';
import RemoveTenantButton from './RemoveTenantButton';
import Modal from '../../components/Modal/index';

import './PropertyView.scss';

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

const validationSchema = Yup.object().shape({
  propertyName: Yup.string()
    .max(255, "Must be shorter than 255 Characters")
    .required("Must enter Property Name"),
  propertyAddress: Yup.string()
    .max(255, "Must be shorter than 255 Characters")
    .required("Address is required"),
  propertyUnits: Yup.string()
    .min(
      0,
      "*Property must contain at least 1 unit",
    )
    .max(3, "*Numbers can't be longer than 3 digits")
    .required("*Number of units is required"),
});




const Property = () => {
  const userContext = useContext(UserContext);

  const { id } = useParams();
  const propertyId = id;


  const [isEditing, setEditingStatus] = useState(false);
  const [property, setProperty] = useState('');
  const [tenantArray, setTenants] = useState('');
  const [confirmChange, setConfirmChange] = useState(false);
  const [inputValues, setInputValues] = useState();
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [confirmTenantRemoval, setConfirmTenantRemoval] = useState(false);
  const [tenantToRemove, setTenantToRemove] = useState('')
  const calendarState = useCalendarState(property?.dateTimeStart, property?.dateTimeEnd)


  // Error handler for axios requests
  const axiosErrorHandler = (error) => {
    Toast(error.message, "error");
    return Promise.reject({ ...error });
  };

  // Handle axios errors
  const client = axios.create();
  client.interceptors.response.use(
    success => success,
    error => axiosErrorHandler(error)
  );

  /**
   * Handle activating edit form
   */
  const handleEditToggle = () => setEditingStatus(!isEditing);

  const onCancelClick = () => {
    setConfirmChange(false);
    setConfirmTenantRemoval(false);
    setEditingStatus(false);
    getProperty()
  };


  useEffect(() => {
    getProperty()
  }, []);


  const getProperty = async () => {

    const propertyResponse = await axios
      .get(`${process.env.REACT_APP_PROXY}/api/properties/${propertyId}`, makeAuthHeaders(userContext));

    const property = propertyResponse.data;

    setProperty(property)
    setInputValues(property)
    setTenants(property.tenants)
  }

  const handleConfirmButton = async () => {

    await updateProperty(inputValues);
    setConfirmChange(false);
  }

  const onFormikSubmit = (values, { setSubmitting }) => {

    const newValues = {
      name: values.propertyName,
      address: values.propertyAddress,
      city: values.propertyCity,
      state: values.propertyState,
      zipcode: values.propertyZipcode,
      num_units: values.propertyUnits,
    };
    setSubmitting(true);
    setInputValues({ ...inputValues, ...newValues })

    setConfirmChange(true);

  };

  const updateProperty = (payload, successMsg="Save successful!") => {

    axios
      .put(`${process.env.REACT_APP_PROXY}/api/properties/${property.id}`,
        payload,
        makeAuthHeaders(userContext)
      )
      .then(response => {
        const property = response.data

        setProperty(property)
        setInputValues(property)
        setTenants(property.tenants)

        hideArchiveModal()
        setEditingStatus(false)
        Toast(successMsg, "success")
      })
      .catch((error) => {
        Toast(Object.values(error.response.data.message).join("\n"), "error")
      })
  }


  const removePropertyManager = (id) => {
    let propertyManagerIDs = []
    let propertyManagers = []

    for (let manager of property.propertyManagers) {
      if (manager.id !== id) {
        propertyManagerIDs.push(manager.id)
      }
      else {
        propertyManagers = property.propertyManagers.filter(manager => manager.id !== id)
      }
    }
    setProperty({ ...property, propertyManagers })
    setInputValues({ ...property, propertyManagers, propertyManagerIDs })
  }

  const addPropertyManager = (id) => {
    property.propertyManagerIDs = [id];

    if (property.propertyManagers)
      for (let manager of property.propertyManagers) {
        property.propertyManagerIDs.push(manager.id);
      }

    axios
      .put(`${process.env.REACT_APP_PROXY}/api/properties/${propertyId}`,
        property,
        makeAuthHeaders(userContext))
      .then(response => {
        setProperty({
          ...property,
          propertyManagers: response.data.propertyManagers,
        })
        setEditingStatus(false);
        Toast("Save successful!", "success");
      })
      .catch((error) => {
        Toast(error.message, "error");
      });
  }

  const removeTenant = (tenant) => {
    setTenantToRemove(tenant);
    setConfirmTenantRemoval(true);
  }

  const handleTenantConfirmButton = () => {
    const leaseId = tenantToRemove.lease.id;
    axios
      .delete(`${process.env.REACT_APP_PROXY}/api/lease/${leaseId}`)
      .then(res => {
        getProperty()
        setConfirmTenantRemoval(false)
        setEditingStatus(false)
        Toast("Tenant successfully removed")
      })
      .catch(error => Toast(error.message))
  }

  const handleArchive = (archived) => {
    return archived ? unarchiveProperty : archiveProperty
  }

  const archiveProperty = () => {
    updateProperty({ archived: true }, "Property archived successfully")
  }

  const unarchiveProperty = () => {
    updateProperty({ archived: false }, "Property unarchived successfully")
  }

  const displayArchiveModal = () => {
    setShowArchiveModal(true)
  }

  const hideArchiveModal = () => {
    setShowArchiveModal(false)
  }

  const getTableData = [
    {
      key: "propertyName",
      label: "Name",
      value: property.name,
      inputType: "text",
    },
    {
      key: "propertyAddress",
      label: "Address",
      value: property.address,
      inputType: "text",
    },
    {
      key: "propertyCity",
      label: "City",
      value: property.city,
      inputType: "text",
    },
    {
      key: "propertyState",
      label: "State",
      value: property.state,
      inputType: "text",
    },
    {
      key: "propertyZipcode",
      label: "Zip Code",
      value: property.zipcode,
      inputType: "text",
    },
    {
      key: "propertyUnits",
      label: "Units",
      value: property.num_units,
      inputType: "text",
    }
  ]

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

  return (
    <div className='main-container'>
      <div>
        {property && (
          <div>
            <div className="title__container">
              <h2>
                {property.name}
              </h2>
              {!property.archived &&
                <button
                  className={`rounded${isEditing ? "--is-editing" : ""}`}
                  onClick={handleEditToggle}
                  disabled={isEditing}
                >
                  <i className="fas fa-pen icon" />
                </button>}
              {(!property.archived && isEditing) && <button
                className="button is-primary is-rounded"
                onClick={displayArchiveModal}
                style={{ padding: "1em", marginLeft: "14px", fontSize: "12px" }}>
                <i className="fas fa-archive icon-inline-space"></i>
                ARCHIVE
              </button>}
              {property.archived && <button
                className="button is-primary is-rounded"
                onClick={displayArchiveModal}
                style={{ padding: "1em", marginLeft: "14px", fontSize: "12px" }}>
                <i className="fas fa-undo icon-inline-space"></i>
                UNARCHIVE
              </button>}
            </div>
            <div className="section-container">
              <h2 className="section-title">PROPERTY INFORMATION</h2>
            </div>
            <ToggleEditTable
              tableData={getTableData}
              validationSchema={validationSchema}
              isEditing={isEditing}
              submitHandler={onFormikSubmit}
              cancelHandler={onCancelClick}
              calendarState={calendarState}
            />
            <div className="section-container">
              <h2 className="section-title">PROPERTY MANAGERS</h2>
            </div>
            {isEditing ?
              <ManagerSearchPanel
                assignedPropertyManagers={property.propertyManagers ?
                  property.propertyManagers.map(manager => { return manager.id })
                  : []}
                addPropertyManager={addPropertyManager}
              />
              :
              <></>}
            <div className="property-manager-section">
              {property.propertyManagers ?
                property.propertyManagers.map(manager => {
                  return <PropertyManagerCard
                    manager={manager}
                    key={manager.id}
                    isEditing={isEditing}
                    removePropertyManager={removePropertyManager}
                  />
                })
                : <></>}
            </div>
            <div>
              <div className="section-container">
                <h2 className="section-title">TENANTS</h2>
              </div>
            </div>{
              isEditing ?
                <BootstrapTable
                  keyField='id'
                  data={tenantArray ? tenantArray : []}
                  columns={[...columns, editColumn]}
                  bootstrap4={true}
                  headerClasses="table-header"
                />
                :
                <BootstrapTable
                  keyField='id'
                  data={tenantArray ? tenantArray : []}
                  columns={columns}
                  bootstrap4={true}
                  headerClasses="table-header"
                />
            }
          </div>
        )}
        {confirmTenantRemoval &&
          <Modal
            content={<p>{`Are you sure you want to remove ${tenantToRemove.fullName}?`}</p>}
            hasButtons={true}
            confirmButtonHandler={handleTenantConfirmButton}
            closeHandler={() => {
              setConfirmTenantRemoval(false);
              getProperty();
            }}
            cancelButtonHandler={() => onCancelClick()}
            confirmText={"YES"}
            cancelText={"NO"}
          />
        }
        {confirmChange &&
          <Modal
            content={<p>Are you sure you want to save these changes?</p>}
            hasButtons={true}
            confirmButtonHandler={handleConfirmButton}
            closeHandler={() => {
              setConfirmChange(false)
              getProperty()
            }}
            cancelButtonHandler={() => onCancelClick()}
            confirmText={"YES"}
            cancelText={"NO"}
          />
        }
      </div>
      {showArchiveModal &&
        <Modal
          content={
            <div>
              <p>Are you sure you want to {property.archived ? "unarchive" : "archive"} {property.name}?</p>
            </div>
          }
          hasButtons={true}
          hasRedirectButton={false}
          confirmButtonHandler={handleArchive(property.archived)}
          confirmText="Yes"
          cancelButtonHandler={hideArchiveModal}
          cancelText="No"
          closeHandler={hideArchiveModal}
        />}
    </div>
  )
}
export default Property;
