import React from 'react';
import { Link } from "react-router-dom";


function PropertyManagerCard({ manager }) {

  return (
    <>
      <Link key={manager.id} to={`/manage/manager/${manager.id}`}>
        <p>{`${manager.firstName} ${manager.lastName}`}</p>
        <p>{manager.phone}</p>
        <p>{manager.email}</p>
      </Link>
    </>
  )
};

export default PropertyManagerCard;
