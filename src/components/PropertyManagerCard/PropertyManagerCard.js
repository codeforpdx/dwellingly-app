import React from 'react';
import { Link } from "react-router-dom";
import './PropertyManagerCard.scss';


function PropertyManagerCard({ manager }) {

  return (
    <div className="property-manager-box box">
      <Link key={manager.id} to={`/manage/manager/${manager.id}`}>
        <p className="bold">{`${manager.firstName} ${manager.lastName}`}</p>
      </Link>
      <p className="information">{manager.phone}</p>
      <p className="information">{manager.email}</p>

    </div>
  )
};

export default PropertyManagerCard;
