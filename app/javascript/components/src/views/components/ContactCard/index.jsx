import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import './styles/index.scss';

function ContactCard({ contact, isEditing, removeContact, linkUrl }) {

  return (
    <div className="contact-card-box box">
      <div>
        <Link key={contact.id} to={`${linkUrl}/${contact.id}`}>
          <p className="bold">{`${contact.firstName} ${contact.lastName}`}</p>
        </Link>

        <p className="information">{contact.phone}</p>
        <p className="information">{contact.email}</p>
      </div>
      {isEditing ?
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={() => removeContact(contact.id)}
          className={"remove-contact-button"}
        />
        :
        <></>}
    </div >
  )
};

export default ContactCard;
