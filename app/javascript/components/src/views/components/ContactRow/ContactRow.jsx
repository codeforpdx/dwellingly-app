import React from 'react';
import './styles.scss';

const ContactRow = ({ isEditing, handleDelete, handleClick, id, name, description, contactNumbers, email }) => {

    const handleContactDelete = () => {
        if(!isEditing) return;
        handleDelete(id);
    };

    const handleContactClick = () => handleClick(id);
  
    return (
      <div className="contact__row">
        {isEditing &&
          <div className="contact__delete_action" onClick={handleContactDelete}>
            <i className="fas fa-minus-circle icon"></i>
          </div>
        }
        <div className={`contact__main_column ${isEditing ? 'active' : ''}`} onClick={handleContactClick}>
          {name}
          <div className="contact__subtext">{description ?? email}</div>
        </div>
        <div className="contact__column">
          {contactNumbers.map(({ numType, number }, i) => {
            const label = numType ? `${numType}: ` : '';
            return (
              <div key={number} className="number-container">
                {(i >= 1) && <span>&nbsp;| </span>}
                <span className="contact__action">
                  {label}<a href={`tel:${number}`}>{number}</a>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  export default ContactRow;