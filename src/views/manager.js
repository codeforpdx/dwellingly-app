import React, { useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Link, useParams } from "react-router-dom";
import * as axios from "axios";
import { PROPERTY_MANAGER_DATA } from "./dummyData/pManagerData";

const Manager = () => {
  const { id } = useParams();
  // can remove this once api is configured to return properties and tenants
  const dummyDataManagerInfo = PROPERTY_MANAGER_DATA.find(
    (manager) => manager.id === id
  );

  const [manager, setManager] = useState(dummyDataManagerInfo);

  const contactInfoFields = ["firstName", "lastName", "phone", "email"];
  const contactInfoTitles = ["First Name", "Last Name", "Phone", "Email"];

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

  return (
    <div className="manager__container">
      <div className="manager__main">
        <h2 className="page-title">{manager.fullName}</h2>
        <div className="manager__contact-info-container">
          {contactInfoFields.map((field, index) => (
            <div className="manager__contact-info-container__row">
              <span className="__row--title">
                {contactInfoTitles[index]}
              </span>
              <span className="__row--value">
                {manager[field]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manager;
