import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/index.scss';

export const JoinStaffCard = ({ id, name, phoneNumber, email, tickets, tenants, admin }) => {

  const InfoLabel = ({ type }) => {
    if (type === "tickets") {
      return (
        <div className="info-font">
          <p className="number-font" >{tickets}</p> Open Tickets
        </div>
      );
    } else if (type === "tenants") {
      return (
        <div className="info-font">
          <p className="number-font" >{tenants}</p> Tenants
        </div>
      );
    }
  }

  const AdminLabel = () => {
    return (
      <div className="admin-label"> Admin </div>
    );
  }

  const tinyLinkSpacing = !(tickets && tenants) ? "tiny-link" : "tiny-link-info";

  return (
    <>
      <div className="card card-length">
        <div className="name-spacing">
          <Link to={`/manage/staff/${id}`}>
            <p className="name-font">
              {name}
            </p>
          </Link>
        </div>
        <div className="card-content">
          {admin && <AdminLabel />}
          <p className="info-font">
            {phoneNumber}
          </p>
          <p className="info-font">
            {email}
          </p>
          <hr className="card-divider" ></hr>
          {<InfoLabel type="tickets" />}
          {<InfoLabel type="tenants" />}
          <Link to={`/manage/staff/${id}`}>
            <p className={tinyLinkSpacing}>
              Reassign
            </p>
          </Link>
        </div>
      </div>
      <div className="card-separating-space"></div>
    </>
  );
}

JoinStaffCard.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  tickets: PropTypes.number,
  tenants: PropTypes.number,
  admin: PropTypes.bool,
}