import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { JoinStaffCard } from './components/JoinStaffCard';
import { Link, useHistory } from 'react-router-dom';
import RoleEnum from '../../Enums/RoleEnum';
import { useMediaQuery } from '@react-hook/media-query';
import ContactRow from '../components/ContactRow/ContactRow';
import { tabletWidth } from '../../constants';

export const JoinStaffList = () => {
  const [staff, setStaff] = useState([]);
  const context = useContext(UserContext);
  const history = useHistory();
  const secondColumnStart = staff && Math.ceil(staff.length / 3);
  const thirdColumnStart = staff && (staff.length - Math.floor(staff.length / 3));
  const isMobile = useMediaQuery(`(max-width: ${tabletWidth})`);

  useEffect(() => {
    const fetchData = () => {
      context.apiCall('get', '/staff_members', {}, {})
        .then(res => {
          var joinStaff = res.data.joinStaff;
          var admins = res.data.admins;

          setStaff(joinStaff.concat(admins));
        });
    };
    fetchData();
  }, []);

  const staffCard = (user) => {
    return user ?
      (
        <JoinStaffCard
          key={user.id}
          id={user.id}
          name={`${user.firstName} ${user.lastName}`}
          phoneNumber={user.phone}
          email={user.email}
          tickets={user.tickets ? user.tickets.length : 0}
          tenants={user.tenants ? user.tenants.length : 0}
          admin={user.role == RoleEnum.ADMIN} />
      )
      : <></>
  };

  const handleClick = (id) => {
    history.push(`/manage/staff/${id}`);
  };

  const mapPhoneNumber = (phone) => (
    [{
      number: phone
    }]
  );

  return (
    <>
      <div className='main-container'>
        <div className="section-header">
          <h2 className="page-title">JOIN Staff</h2>
          <Link className="button is-rounded is-primary ml-4" to='/staff/add'> + ADD NEW </Link>
        </div>
        {staff ?
          isMobile ?
            staff.map(contact => (
              <ContactRow key={contact.id}
                isEditing={false}
                handleClick={handleClick}
                handleDelete={() => null}
                name={`${contact.firstName} ${contact.lastName}`}
                contactNumbers={mapPhoneNumber(contact.phone)}
                email={contact.email} />
            ))
            : <div className="columns columns-spacing">
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
