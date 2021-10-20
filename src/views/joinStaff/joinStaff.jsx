import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../UserContext';
import axios from 'axios';
import { JoinStaffCard } from '../../components/JoinStaffCard';
import { Link } from 'react-router-dom';
import RoleEnum from '../../Enums/RoleEnum';
import Toast from '../../utils/toast';


export const JoinStaff = () => {

  const [staff, setStaff] = useState([]);
  const secondColumnStart = staff && Math.ceil(staff.length / 3);
  const thirdColumnStart = staff && (staff.length - Math.floor(staff.length / 3));
  const auth_headers = { headers: { 'Authorization': `Bearer ${useContext(UserContext).user.accessJwt}` } };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('/api/user?r=3', auth_headers)
        .then(res => {
          var joinStaff = res.data.users;
          axios
            .get('/api/user?r=4', auth_headers)
            .then(res2 => {
              var admins = res2.data.users;

              setStaff(joinStaff.concat(admins));
            })
        })
        .catch(error => {
          Toast(error.message, 'error');
        });
    };
    fetchData();
  }, []);

  const staffCard = (user) => {
    return user ?
      (
        <JoinStaffCard
          key={user.id}
          name={`${user.firstName} ${user.lastName}`}
          phoneNumber={user.phone}
          email={user.email}
          tickets={user.tickets ? user.tickets.length : 0}
          tenants={user.tenants ? user.tenants.length : 0}
          admin={user.role == RoleEnum.ADMIN} />
      )
      : <></>
  };

  return (
    <>
      <div className='main-container'>
        <div className="section-header">
          <h2 className="page-title">JOIN Staff</h2>
          <Link className="button is-rounded is-primary ml-4" to='/staff/add'> + ADD NEW </Link>
        </div>
        {staff ?
          <div className="columns columns-spacing">
            <div className="column">
              {staff.slice(0, secondColumnStart).map((user, index) => { return staffCard(user); })}
            </div>
            <div className="column">
              {staff.slice(secondColumnStart, thirdColumnStart).map((user, index) => { return staffCard(user); })}
            </div>
            <div className="column">
              {staff.slice(thirdColumnStart).map((user, index) => { return staffCard(user); })}
            </div>
          </div>
          : <></>
        }
      </div>
    </>
  );
};
