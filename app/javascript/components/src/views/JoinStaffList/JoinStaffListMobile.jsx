import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';
import ContactRow from '../components/ContactRow/ContactRow';


const JoinStaffListMobile = () => {
  const [staff, setStaff] = useState([]);
  const history = useHistory();
  const context = useContext(UserContext);

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

  const handleClick = (id) => {
    history.push(`/manage/staff/${id}`);
  }

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
        
        <div className="table-row">
          <div className="row_container">
            {staff.map(contact => (
              <ContactRow key={contact.id}
                isEditing={false}
                handleClick={handleClick}
                handleDelete={() => null}
                name={`${contact.firstName} ${contact.lastName}`}
                contactNumbers={mapPhoneNumber(contact.phone)}
                email={contact.email} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinStaffListMobile;