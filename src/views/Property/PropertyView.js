import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as axios from "axios";
import Toast from '../../utils/toast';
import UserContext from '../../UserContext';
import Tenant from "../Tenant";



const Property = () => {
  const userContext = useContext(UserContext);

  const { id } = useParams();
  const propertyName = id;

  const initialState = {
    property: null,
  }

  const [state, setState] = useState(initialState);
  const [isEditing, setEditingStatus] = useState(false);

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

  const getProperty = async () => {

    const propertyResponse = await axios.get(`${process.env.REACT_APP_PROXY}/api/properties/${propertyName}`, { headers: { Authorization: `Bearer ${userContext.user.accessJwt}` } });
    const property = propertyResponse.data;

    setState({ property })

  }

  useEffect(() => {
    getProperty();
  }, []);

  const getTableData = () => [
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


  const { property } = state;

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
              tableData={getTableData()}
              validationSchema={validationSchema}
              isEditing={isEditing}
              submitHandler={onFormikSubmit}
              cancelHandler={onCancelClick}
              calendarState={calendarState}
            />
          </div>
        )}

      </div>


    </div>

  )


}




export default Property;
