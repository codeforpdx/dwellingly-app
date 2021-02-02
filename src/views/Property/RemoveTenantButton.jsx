import React from "react";



function RemoveTenantButton({ tenant, removeTenant, isEditing }) {

  return (
    <>
      {
        isEditing
          ?
          < button onClick={() => removeTenant(tenant)
          }> X</button >
          :
          <></>
      }
    </>
  )
}

export default RemoveTenantButton; 
