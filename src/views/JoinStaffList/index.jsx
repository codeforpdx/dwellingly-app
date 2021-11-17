import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { JoinStaffCard } from './components/JoinStaffCard';
import { Link } from 'react-router-dom';
import RoleEnum from '../../Enums/RoleEnum';


export const JoinStaffList = () => {
  const [staff, setStaff] = useState([]);
  const context = useContext(UserContext);
  const secondColumnStart = staff && Math.ceil(staff.length / 3);
  const thirdColumnStart = staff && (staff.length - Math.floor(staff.length / 3));

  useEffect(() => {
    const fetchData = () => {
      context.apiCall('get', '/user?r=3', {}, {})
        .then(res => {
          var joinStaff = res.data.users;
          context.apiCall('get', '/user?r=4', {}, {})
            .then(res2 => {
              var admins = res2.data.users;

              setStaff(joinStaff.concat(admins));
            });
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
