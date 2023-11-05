import React from 'react';
import "./Card.css"

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const { name, email, phone } = contact;

  return (
    <div className="contact-card">
      <div>
        <h4>{name}</h4>
        <p>Email: {email}</p>
        <p>Phone: {phone}
        </p>
        <div className="button-container">
          <button className="edit-button" onClick={() => onEdit(contact)}>Edit</button>
          <button className="delete-button" onClick={() => onDelete(contact)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
