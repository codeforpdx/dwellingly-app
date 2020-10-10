import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../UserContext';
import axios from 'axios'
import { JoinStaffCard } from '../components/JoinStaffCard';
import { Link } from 'react-router-dom';
import RoleEnum from '../Enums/RoleEnum.js';


export const JoinStaff = () => {

	const [staff, setStaff] = useState([])
	const secondColumnStart = Math.floor(staff.length / 3)
	const thirdColumnStart = (staff.length - Math.floor(staff.length / 3))
	const auth_headers = { headers: { 'Authorization': `Bearer ${useContext(UserContext).user.accessJwt}` }}

	useEffect(() => {
		const URLs = ['/api/user?r=3', '/api/user?r=4']
		const fetchData = URL => {
			return axios
				.get(URL, auth_headers)
				.then(res => {
					setStaff(...staff, res.data.users)
				})
				.catch(err => {
					console.log(err)
				})
		}
		Promise.all(URLs.map(url => fetchData(url)))
	}, [])

	const staffCard = (user) => {
		return (
			<JoinStaffCard 
				key={user.id} 
				name={`${user.firstName} ${user.lastName}`} 
				phoneNumber={user.phone} 
				email={user.email} 
				tickets={user.tickets} 
				tenants={user.tenants} 
				admin={user.role == RoleEnum.ADMIN} />
		)
	}
	
	return (
		<>
      <div className="section-header">
        <h2 className="page-title">JOIN Staff</h2>
        <Link className="button" to='/staff/add'> + ADD NEW </Link>
      </div>
			<div className="columns columns-spacing">
				<div className="column">
					{staff.slice(0, secondColumnStart).map((user, index) => {return staffCard(user)})}
				</div>
				<div className="column">
					{staff.slice(secondColumnStart, thirdColumnStart).map((user, index) => {return staffCard(user)})}
				</div>
				<div className="column">
					{staff.slice(thirdColumnStart).map((user, index) => {return staffCard(user)})}
				</div>
			</div>
		</>
	);
}
