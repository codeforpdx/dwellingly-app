import React from 'react';


function PropertyManagerCard({ manager }) {

  return (
    <>
      <div>
        <p>{`${manager.firstName} ${manager.lastName}`}</p>
        <p>{manager.phone}</p>
        <p>{manager.email}</p>
      </div>
    </>
  )
};

export default PropertyManagerCard;
