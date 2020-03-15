import React from 'react';

function StaffAssignment(props) {
    const { data, onStaffAssignmentChange } = props;
    const {name, facility} = data;

    return (
        <div className="collapsible__row columns">
            <div className="collapsible__col column">{name}</div>
            <div className="collapsible__col column">
                {facility.name}<br />
                <span className="subtext">{facility.manager}</span>
            </div>
            <div className="dashboard__colapsible_col column">
                <div className="select is-rounded">
                    <select
                        onChange={onStaffAssignmentChange}
                    >
                        <option>None</option>
                        {
                            facility.staff.map((staffDataItem,index)=><option key={`staffOption--${index}`}>{staffDataItem.name}</option>)
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}

export default StaffAssignment;