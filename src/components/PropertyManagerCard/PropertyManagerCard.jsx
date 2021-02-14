import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import './PropertyManagerCard.scss';
import '../ManagerSearchPanel/ManagerSearchPanel';
import Icon from '../icon/Icon';



function PropertyManagerCard({ manager, isEditing, removePropertyManager }) {

  return (
    <div className="property-manager-box box">
      <div>
        <Link key={manager.id} to={`/manage/manager/${manager.id}`}>
          <p className="bold">{`${manager.firstName} ${manager.lastName}`}</p>
        </Link>

        <p className="information">{manager.phone}</p>
        <p className="information">{manager.email}</p>
      </div>
      {isEditing ?
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={() => removePropertyManager(manager.id)}
        />
        :
        <></>}
    </div >
  )
};

export default PropertyManagerCard;
