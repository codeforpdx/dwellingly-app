import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import useMountEffect from '../../utils/useMountEffect';
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import TitleAndPen, { useEditingStatus } from '../../components/TitleAndPen';

import './emergencyContacts.scss';

const EmergencyContact = ({ isEditing, handleDelete, id, name, description, contact_numbers: contactNumbers }) => {
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
        {contactNumbers.map(({ numtype, number }, i) => {
          const label = numtype ? `${numtype}: ` : '';
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
};

const EmergencyContacts = () => {
  const userContext = useContext(UserContext);
  const [apiContacts, setApiContacts] = useState([]);
  const { isEditing, setEditingStatus } = useEditingStatus();

  useMountEffect(() => {
    userContext.apiCall('get', '/emergencycontacts', {}, {})
      .then(({ data }) => {
        setApiContacts(data.emergency_contacts);
      });
  });

  const handleDoneEditing = () => {
    setEditingStatus(false);
  };
  const handleDelete = id => {
    const continueDelete = window.confirm('Are you sure you want to delete the emergency contact?');
    if(!continueDelete) return;
    userContext.apiCall('delete', `/emergencycontacts/${id}`, {}, {})
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
        <div className="table-row">
          <div className="row_container">
            {
              apiContacts.map(contact => (
                <EmergencyContact key={contact.id} isEditing={isEditing} handleDelete={handleDelete} {...contact} />
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
