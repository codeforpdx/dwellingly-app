import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../UserContext';
import axios from 'axios'
import { JoinStaffCard } from '../components/JoinStaffCard';
import { Link } from 'react-router-dom';


export const JoinStaff = () => {

	const [staff, setStaff] = useState([])
	const [secondColumnStart, setSecondColumnStart] = useState(0)
	const [thirdColumnStart, setThirdColumnStart] = useState(0)

	const auth_headers = { headers: { 'Authorization': `Bearer ${useContext(UserContext).user.accessJwt}` }}

	useEffect(() => {
		const URLs = ['/api/user?r=3', '/api/user?r=4']
		const fetchData = URL => {
			return axios
				.get(URL, auth_headers)
				.then( res => {
					setStaff(...staff, res.data.users)
					setSecondColumnStart(Math.floor(staff.length / 3))
					setThirdColumnStart(staff.length - Math.floor(staff.length / 3))
				})
		}
		Promise.all(URLs.map(url => fetchData(url)))
	}, [])

	return (
		<>
      <div className="section-header">
        <h2 className="page-title">JOIN Staff</h2>
        <Link className="button" to='/staff/add'> + ADD NEW </Link>
      </div>
			<div className="columns columns-spacing">
				<div className="column">
					{staff.slice(0, secondColumnStart).map((user, index) => {
						console.log("hi")
						return (
							<JoinStaffCard key={user.id} name={user.firstName} phoneNumber={user.phone} email={user.email} tickets={7} tentants={user.tenants} admin={true} />
						)
					})}
				</div>
				<div className="column">
					{staff.slice(secondColumnStart, thirdColumnStart).map((row, id) => {

						return (
							<JoinStaffCard key={row.id} name={row.name} phoneNumber={row.phone} email={row.email} tickets={row.tickets} tenants={row.tenants} admin={row.admin} />
						);
					})}
				</div>
				<div className="column">
					{staff.slice(thirdColumnStart).map((row, id) => {
						return (
							<JoinStaffCard key={row.id} name={row.name} phoneNumber={row.phone} email={row.email} tickets={row.tickets} tenants={row.tenants} admin={row.admin} />
						);
					})}
				</div>
			</div>
		</>
	);
}
