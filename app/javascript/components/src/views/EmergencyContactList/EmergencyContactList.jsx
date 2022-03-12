import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import useMountEffect from '../../utils/useMountEffect';
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import TitleAndPen, { useEditingStatus } from '../components/TitleAndPen';

import './styles/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const EmergencyContactList = ({ isEditing, handleDelete, id, name, description, contact_numbers: contactNumbers }) => {
  const history = useHistory();

  const handleContactDelete = () => handleDelete(id);
  const handleContactEdit = () => isEditing && history.push(`/edit/emergencycontact/${id}`);

  return (
    <div className="emergencyContact__row">
      {isEditing &&
        <div className="emergencyContact__delete_action" onClick={handleContactDelete}>
          <i className="fas fa-minus-circle icon"></i>
        </div>
      }
      <div className={`emergencyContact__main_column ${isEditing ? 'active' : ''}`} onClick={handleContactEdit}>
        {name}
        <div className="subtext">{description}</div>
      </div>
      <div className="emergencyContact__contact_column">
        {contactNumbers.map(({ numType, number }, i) => {
          const label = numType ? `${numType}: ` : '';
          return (
            <div key={number} className="number-container">
              {(i >= 1) && <span>&nbsp;| </span>}
              <span className="emergencyContact__contact_action">
                {label}<a href={`tel:${number}`}>{number}</a>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const url = '/emergency_contacts/'

const EmergencyContacts = () => {
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
  const handleDelete = id => {
    const continueDelete = window.confirm('Are you sure you want to delete the emergency contact?');
    if (!continueDelete) return;
    userContext.apiCall('delete', `${url}${id}`, {}, {})
      .then(() => {
        setApiContacts(apiContacts.filter(contact => contact.id !== id));
      });
  };

  return (
    <div className='main-container'>
      <div className="emergency_contacts__container">
        <div className="section-header">
          <TitleAndPen title="Emergency Numbers" isEditing={isEditing} setEditingStatus={setEditingStatus} />

          <Link className="is-rounded" to="/add/emergencyContact">
            <i className="fas fa-plus-circle"></i> Create Emergency Number
          </Link>
        </div>
        <div className="emergency_contacts__disclaimer-container">
          <p className="emergency_contacts__disclaimer">In the event of a life-threatening emergency with your JOIN tenants, please dial 911.</p>
            <a className="emergency_contacts__emergency-button" href={`tel:911`}>
              <FontAwesomeIcon icon={faPhone} /> 911
            </a>
        </div>
        <div className="table-row">
          <div className="row_container">
            {
              apiContacts.map(contact => (
                <EmergencyContactList key={contact.id} isEditing={isEditing} handleDelete={handleDelete} {...contact} />
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
