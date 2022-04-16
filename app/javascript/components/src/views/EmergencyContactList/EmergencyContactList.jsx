import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import useMountEffect from '../../utils/useMountEffect';
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import TitleAndPen, { useEditingStatus } from '../components/TitleAndPen';
import ContactRow from '../components/ContactRow/ContactRow';

import './styles/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from "@fortawesome/free-solid-svg-icons";


const url = '/emergency_contacts/'

const EmergencyContacts = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [apiContacts, setApiContacts] = useState([]);
  const { isEditing, setEditingStatus } = useEditingStatus();

  useMountEffect(() => {
    userContext.apiCall('get', url, {}, {})
      .then(({ data }) => {
        setApiContacts(data);
      });
  });

  const handleDoneEditing = () => {
    setEditingStatus(false);
  };

  const handleDelete = (id) => {
    if(!isEditing) return;
    const continueDelete = window.confirm('Are you sure you want to delete the emergency contact?');
    if (!continueDelete) return;
    userContext.apiCall('delete', `${url}${id}`, {}, {})
      .then(() => {
        setApiContacts(apiContacts.filter(contact => contact.id !== id));
      });
  };

  const handleClick = (id) => {
    if(!isEditing) return;
    history.push(`/edit/emergencycontact/${id}`);
  };

  return (
    <div className='main-container'>
      <div className="contacts__container">
        <div className="section-header">
          <TitleAndPen title="Emergency Numbers" isEditing={isEditing} setEditingStatus={setEditingStatus} />

          <Link className="is-rounded" to="/add/emergencyContact">
            <i className="fas fa-plus-circle"></i> Create Emergency Number
          </Link>
        </div>
        <div className="contacts__disclaimer-container">
          <p className="contacts__disclaimer">In the event of a life-threatening emergency with your JOIN tenants, please dial 911.</p>
          <a className="contacts__emergency-button" href={`tel:911`}>
            <FontAwesomeIcon icon={faPhone} /> 911
          </a>
        </div>
        <div className="table-row">
          <div className="row_container">
            {
              apiContacts.map(contact => (
                <ContactRow key={contact.id}
                  isEditing={isEditing}
                  handleDelete={handleDelete}
                  handleClick={handleClick}
                  contactNumbers={contact.contact_numbers}
                  {...contact} />
              ))
            }
          </div>
        </div>
        {isEditing &&
          <div className="section-footer">
            <button className="button is-rounded is-primary mt-4" onClick={handleDoneEditing}>DONE</button>
          </div>
        }
      </div>
    </div>
  );
};

export default EmergencyContacts;
