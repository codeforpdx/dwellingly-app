import React from 'react';

const NewStaffItem = ({
  id,
  firstName,
  lastName,
  propertyName,
  staff,
  handleStaffAssignmentChange,
  staffList,
}) => (
  <div className="collapsible__row columns">
    <div className="collapsible__col column">{`${firstName} ${lastName}`}</div>
    <div className="collapsible__col column">
      {propertyName}
      <br />
      <span className="subtext">Property Manager Name (fix this)</span>
    </div>
    <div className="dashboard__colapsible_col column">
      <div className="select is-rounded">
        <select
          onChange={(e) => handleStaffAssignmentChange(e, id)}
          value={staff || 'default'}>
          <option value="default" disabled>
            Staff Name
          </option>
          {staffList.map(({ id, firstName, lastName }) => (
            <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default NewStaffItem;
