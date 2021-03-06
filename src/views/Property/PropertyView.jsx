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
  const [inputValues, setInputValues] = useState()
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
    setConfirmChange(false)
    setEditingStatus(false);
    getProperty()
  };


  useEffect(() => {
    const getTenants = async (property) => {
      if (property.lease) {
        const tenantResponses = await Promise.all(property.lease.map(lease =>
          axios.get(`${process.env.REACT_APP_PROXY}/api/tenants/${lease.tenantID}`, makeAuthHeaders(userContext)))
        )

        const tenantArray = tenantResponses.map(tenantResponse => {
          return tenantResponse.data;
        })

        setTenants(tenantArray);
      }
    }

    getProperty()
      .then(property => getTenants(property));

  }, [propertyId, userContext.user.accessJwt]);

  const getProperty = async () => {

    const propertyResponse = await axios
      .get(`${process.env.REACT_APP_PROXY}/api/properties/${propertyId}`, makeAuthHeaders(userContext));

    const property = propertyResponse.data;

    setProperty(property)
    setInputValues(property)
    return property;
  }

  const handleConfirmButton = async () => {

    await updateProperty(inputValues);
    getProperty();
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

  const updateProperty = (payload) => {

    axios
      .put(`${process.env.REACT_APP_PROXY}/api/properties/${property.id}`,
        payload,
        makeAuthHeaders(userContext)
      )
      .then(response => {
        setProperty({
          ...property,
          name: response.data.name,
          address: response.data.address,
          city: response.data.city,
          state: response.data.state,
          zipcode: response.data.zipcode,
          num_units: response.data.num_units,
          propertyManager: response.data.propertyManager
        });
        setEditingStatus(false);
        Toast("Save successful!");
      })
      .catch((error) => {
        Toast(error.message);
      });
  };


  const removePropertyManager = (id) => {
    let propertyManagerIDs = []
    let propertyManager = []

    for (let manager of property.propertyManager) {
      if (manager.id !== id) {
        propertyManagerIDs.push(manager.id)
      }
      else {
        propertyManager = property.propertyManager.filter(manager => manager.id !== id)
      }
    }
    setProperty({ ...property, propertyManager })
    setInputValues({ ...property, propertyManager, propertyManagerIDs })
  }

  const addPropertyManager = (id) => {
    property.propertyManagerIDs = [id];

    if (property.propertyManager)
      for (let manager of property.propertyManager) {
        property.propertyManagerIDs.push(manager.id);
      }

    axios
      .put(`${process.env.REACT_APP_PROXY}/api/properties/${propertyId}`,
        property,
        makeAuthHeaders(userContext))
      .then(response => {
        setProperty({
          ...property,
          propertyManager: response.data.propertyManager,
          propertyManagerName: response.data.propertyManagerName,
        })
        setEditingStatus(false);
        Toast("Save successful!");
      })
      .catch((error) => {
        Toast(error.message);
      });
  }

  const removeTenant = (id) => {

    getProperty()
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
        <RemoveTenantButton tenant={row.id} removeTenant={removeTenant} isEditing={isEditing} />
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
              <button
                className={`rounded${isEditing ? "--is-editing" : ""}`}
                onClick={handleEditToggle}
                disabled={isEditing}
              >
                <i className="fas fa-pen icon" />
              </button>
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
                assignedPropertyManagers={property.propertyManager ?
                  property.propertyManager.map(manager => { return manager.id })
                  : []}
                addPropertyManager={addPropertyManager}
              />
              :
              <></>}
            <div className="property-manager-section">
              {property.propertyManager ?
                property.propertyManager.map(manager => {
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
        {confirmChange &&
          <Modal
            content={<p>Are you sure you want to save these changes?</p>}
            hasButtons={true}
            confirmButtonHandler={handleConfirmButton}
            closeHandler={() => {
              setConfirmChange(false)
              getProperty()
            }}
            cancelButtonHandler={() => {
              onCancelClick()
            }}
            confirmText={"YES"}
            cancelText={"NO"}
          />
        }
      </div>
    </div>
  )
}
export default Property;
