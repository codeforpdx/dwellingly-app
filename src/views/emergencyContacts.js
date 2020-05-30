import React from 'react';
import { Link } from "react-router-dom"
import { useState } from 'react';

const fakeData = {
    emergency_contacts: [
        {
            id: 1,
            name: "Narcotics Anonymous",
            description: "",
            contact_numbers: [
                {
                    id: 1,
                    number: "503-345-9839",
                    numtype: "",
                    extension: ""
                }
            ]
        },
        {
            id: 2,
            name: "Washington Co. Crisis Team",
            description: "Suicide prevention and referrals",
            contact_numbers: [
                {
                    id: 2,
                    number: "503-291-9111",
                    numtype: "Call",
                    extension: ""
                },
                {
                    id: 3,
                    number: "503-555-3321",
                    numtype: "Text",
                    extension: ""
                }
            ]
        },
        {
            id: 3,
            name: "Child Abuse/Reporting",
            description: "",
            contact_numbers: [
                {
                    id: 4,
                    number: "503-730-3100",
                    numtype: "",
                    extension: ""
                }
            ]
        },
    ]
};

const EmergencyContact = ({ isEditing, id, name, description, contact_numbers: contactNumbers }) => (
    <div className="emergencyContact__row">
        {isEditing && 
            <div className="emergencyContact__delete_action" onClick={() => console.log('delete contact id: ' + id)}>
                <i className="fas fa-minus-circle icon"></i>
            </div>
        }
        <div className="emergencyContact__main_column">
            {name}
            <div className="subtext">{description}</div>
        </div>
        <div className="emergencyContact__contact_column">
            {contactNumbers.map(({ numtype, number }, i) => {
                const label = numtype ? `${numtype}: ` : '';
                return (
                    <div key={number}>
                        {(i >= 1) && <span> | </span>}
                        <span className="emergencyContact__contact_action">
                            {label}<a href={`tel:${number}`}>{number}</a>
                        </span>
                    </div>
                );
            })}
        </div>
    </div>
);

const EmergencyContacts = () => {
    const [editMode, setEditMode] = useState(false);

    const handleStartEditing = () => setEditMode(true);
    const handleDoneEditing = () => {
        setEditMode(false);
    }

    return (
        <div className="emergency_contacts__container">
            <div className="section-header">
                <div className="page-title">
                    <h2>Emergency Numbers</h2>
                    <div className="rounded" onClick={handleStartEditing}><i className="fas fa-pen icon"></i></div>
                </div>
                <Link className="is-rounded" to="/add/emergencyContact">
                    <i className="fas fa-plus-circle"></i> Create Emergency Numbers
                </Link>
            </div>
            <div className="table-row">
                <div className="row_container">
                    {
                        fakeData.emergency_contacts.map(contact => (
                            <EmergencyContact key={contact.id} isEditing={editMode} { ...contact } />
                        ))
                    }
                </div>
            </div>
            {editMode &&
                <div className="section-footer">
                    <button className="active button is-rounded" onClick={handleDoneEditing}>DONE</button>
                </div>
            }
        </div>
    )
}

export default EmergencyContacts;