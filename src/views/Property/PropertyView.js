import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as axios from "axios";
import Toast from '../../utils/toast';
import UserContext from '../../UserContext';
import * as Yup from "yup";
import ToggleEditTable from "../../components/ToggleEditTable";
import { useCalendarState } from "../../components/CalendarModal/CalendarModal";
import PropertyManagerCard from "../../components/PropertyManagerCard/PropertyManagerCard.js";
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from "react-router-dom";

import './PropertyView.scss';



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
    dataField: "unit",
    text: "Unit",
    sort: true,
  },
  {
    dataField: "phone",
    text: "Phone",
    sort: true,
  },
];


const Property = () => {
  const userContext = useContext(UserContext);

  const { id } = useParams();
  const propertyName = id;


  const [isEditing, setEditingStatus] = useState(false);
  const [property, setProperty] = useState('');
  const [tenantArray, setTenants] = useState('');
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
    setEditingStatus(false);
  };



  useEffect(() => {
    const getProperty = async () => {

      const propertyResponse = await axios
        .get(`${process.env.REACT_APP_PROXY}/api/properties/${propertyName}`,
          { headers: { Authorization: `Bearer ${userContext.user.accessJwt}` } });

      const property = propertyResponse.data;

      setProperty(property)
      return property;
    }

    const getTenants = async (property) => {

      const tenantResponses = await Promise.all(property.tenantIDs.map(tenantID => axios.get(`${process.env.REACT_APP_PROXY}/api/tenants/${tenantID}`,
        { headers: { Authorization: `Bearer ${userContext.user.accessJwt}` } }))
      )

      const tenantArray = tenantResponses.map(tenantResponse => {
        return tenantResponse.data;
      })

      setTenants(tenantArray);
    }

    getProperty()
      .then(property => getTenants(property));

  }, []);

  const onFormikSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const newValues = {
      name: values.propertyName,
      address: values.propertyAddress,
      units: values.propertyUnits,
    };
    updateProperty(newValues);
  };

  const updateProperty = (payload) => {
    axios
      .patch(`${process.env.REACT_APP_PROXY}/api/properties/${payload.name}`,
        payload,
        { Authorization: `Bearer ${userContext.user.accessJwt}` }
      )
      .then(response => {
        setProperty({
          ...property,
          name: response.data.name,
          address: response.data.address,
          units: response.data.units,
        });
        setEditingStatus(false);
        Toast("Save successful!");
      })
      .catch((error) => {
        Toast(error.message);
      });
  };


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
      value: `${property.address}, ${property.city}, ${property.state}, ${property.zipcode}`,
      inputType: "text",
      comp: <div />,
    },
    {
      key: "propertyUnits",
      label: "Units",
      value: property.units,
      inputType: "text",
    }
  ]


  // const { property } = state;

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
            <div className="property-manager-section">
              {property.propertyManager.map(manager => {
                return <PropertyManagerCard
                  manager={manager}
                />
              })}
            </div>
            <div>
              <div className="section-container">
                <h2 className="section-title">TENANTS</h2>
              </div>
            </div>
            <BootstrapTable
              keyField='id'
              data={tenantArray}
              columns={columns}
              bootstrap4={true}
              headerClasses="table-header"
            />
          </div>

        )}

      </div>


    </div>

  )


}




export default Property;
