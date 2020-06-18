import React, { useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Link, useParams } from "react-router-dom";
import * as axios from "axios";
import { PROPERTY_MANAGER_DATA } from "./dummyData/pManagerData";

const Manager = () => {
	const { id } = useParams();
	const dummyDataManagerInfo = PROPERTY_MANAGER_DATA.find(manager => manager.id === id);
	
  const [manager, setManager] = useState(dummyDataManagerInfo);

  // use getManager once /users/?id api endpoint returns properties and tenants for property managers
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

  return <div>manager</div>;
};

export default Manager;
