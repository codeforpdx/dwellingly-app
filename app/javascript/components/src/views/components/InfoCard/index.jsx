import React from 'react';
import { Link } from "react-router-dom";

const InfoCard = ({ link, title, descriptionOne, descriptionTwo }) => (
  <div className="info-card-box box">
    <div>
      <Link key={title} to={link}>
        <p className="bold">{title}</p>
      </Link>

      <p className="information">{descriptionOne}</p>
      <p className="information">{descriptionTwo}</p>
    </div>
  </div>
);

export default InfoCard;
