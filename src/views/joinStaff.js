import React from 'react';
import { JoinStaffCard } from '../components/JoinStaffCard';
import { JOIN_STAFF_DATA } from '../components/JoinStaffCard/data';
import { Link } from 'react-router-dom';


export const JoinStaff = () => {
	const secondColumnStart = Math.floor(JOIN_STAFF_DATA.length / 3);
	const thirdColumnStart = JOIN_STAFF_DATA.length - Math.floor(JOIN_STAFF_DATA.length / 3);

	return (
		<>
      <div className="section-header">
        <h2 className="page-title">JOIN Staff</h2>
        <Link className="button" to='/staff/add'> + ADD NEW </Link>
      </div>
			<div className="columns columns-spacing">
				<div className="column">
					{JOIN_STAFF_DATA.slice(0, secondColumnStart).map((row, index) => {
						return (
							<JoinStaffCard key={row.id} name={row.name} phoneNumber={row.phone} email={row.email} tickets={row.tickets} tenants={row.tenants} admin={row.admin} />
						);
					})}
				</div>
				<div className="column">
					{JOIN_STAFF_DATA.slice(secondColumnStart, thirdColumnStart).map((row, id) => {

						return (
							<JoinStaffCard key={row.id} name={row.name} phoneNumber={row.phone} email={row.email} tickets={row.tickets} tenants={row.tenants} admin={row.admin} />
						);
					})}
				</div>
				<div className="column">
					{JOIN_STAFF_DATA.slice(thirdColumnStart).map((row, id) => {
						return (
							<JoinStaffCard key={row.id} name={row.name} phoneNumber={row.phone} email={row.email} tickets={row.tickets} tenants={row.tenants} admin={row.admin} />
						);
					})}
				</div>
			</div>
		</>
	);
}
