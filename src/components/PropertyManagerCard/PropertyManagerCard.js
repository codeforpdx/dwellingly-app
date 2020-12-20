import React from 'react';
import { Link } from "react-router-dom";
import './PropertyManagerCard.scss';
import '../../components/ManagerSearchPanel/ManagerSearchPanel.js';
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
        <button onClick={() => removePropertyManager(manager.id)}>
          <Icon id="close-icon" icon="close" />
        </button> :
        <></>}
    </div >
  )
};

export default PropertyManagerCard;
