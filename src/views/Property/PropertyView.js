import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as axios from "axios";
import Toast from '../../utils/toast';
import UserContext from '../../UserContext';



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

  }

  useEffect(() => {
    getProperty();
  }, []);

  const { property } = state;

  return (
    <div>
      <p>HELLO!</p>
    </div>
  )


}




export default Property;
