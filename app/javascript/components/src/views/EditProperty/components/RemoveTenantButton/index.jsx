import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./styles/index.scss"

function RemoveTenantButton({ tenant, removeTenant, isEditing }) {

  return (
    <div className="remove-tenant-icon">
      {
        isEditing
          ?
          <FontAwesomeIcon
            icon={faTimesCircle}
            onClick={() => removeTenant(tenant)}
          />

          :
          <></>
      }
    </div>
  )
}

export default RemoveTenantButton; 
