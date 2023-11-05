import React, { useState, useEffect } from "react";
import ContactCard from "../components/Card";
import "./Dashboard.css";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const uri = process.env.REACT_APP_BACKEND_URI;
  
  useEffect(() => {
    const userToken = localStorage.getItem("contact-token");
    if (!userToken) {
      window.location.href = "/login";
    }

    const fetchContacts = async () => {
      try {
        const response = await fetch(`${uri}/api/contacts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("contact-token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setContacts(data.data);
        } else {
          console.error("Error fetching contacts");
        }
      } catch (error) {
        console.error("Error during contact fetch:", error);
      }
    };

    fetchContacts();
  }, []);
  const handleDelete = async (contactId) => {
        try {
          const response = await fetch(
            `${uri}/api/contacts/${contactId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("contact-token")}`,
              },
            }
          );
    
          if (response.ok) {
            setContacts((prevContacts) =>
              prevContacts.filter((contact) => contact._id !== contactId)
            );
          } else {
            console.error("Error deleting contact");
          }
        } catch (error) {
          console.error("Error during contact delete:", error);
        }
      };
  const handleEdit = (contactId) => {
    setEditingContactId(contactId);
    const contactToEdit = contacts.find((contact) => contact._id === contactId);
    setEditedName(contactToEdit.name);
    setEditedEmail(contactToEdit.email);
    setEditedPhone(contactToEdit.phone);
  };

  const handleSave = async () => {
    if (editingContactId) {
      try {
        const response = await fetch(
          `${uri}/api/contacts/${editingContactId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("contact-token")}`,
            },
            body: JSON.stringify({
              name: editedName,
              email: editedEmail,
              phone: editedPhone,
            }),
          }
        );

        if (response.ok) {
          setContacts((prevContacts) =>
            prevContacts.map((contact) => {
              if (contact._id === editingContactId) {
                return {
                  ...contact,
                  name: editedName,
                  email: editedEmail,
                  phone: editedPhone,
                };
              }
              return contact;
            })
          );
          setEditingContactId(null);
          setEditedName("");
          setEditedEmail("");
          setEditedPhone("");
        } else {
          console.error("Error saving contact");
        }
      } catch (error) {
        console.error("Error during contact update:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingContactId(null);
    setEditedName("");
    setEditedEmail("");
    setEditedPhone("");
  };

  const handleCreateContact = () => {
    setShowCreateForm(true); 
  };

  const handleCreateContactSubmit = async () => {
    try {
      const response = await fetch(`${uri}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("contact-token")}`,
        },
        body: JSON.stringify({
          name: newContactName,
          email: newContactEmail,
          phone: newContactPhone,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.data);

        setNewContactName("");
        setNewContactEmail("");
        setNewContactPhone("");
        setShowCreateForm(false);
      } else {
        console.error("Error creating contact");
      }
    } catch (error) {
      console.error("Error during contact creation:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("contact-token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
     
      <button onClick={handleLogout} className="lg-btn">
        Logout
      </button>
     
      <h2>Dashboard</h2>
      <button onClick={handleCreateContact} className="cr-btn">
        Create Contact
      </button>
      {showCreateForm && (
        <div className="create-contact-form">
          <h3>Create New Contact</h3>
          <input
            type="text"
            placeholder="Name"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={newContactEmail}
            onChange={(e) => setNewContactEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={newContactPhone}
            onChange={(e) => setNewContactPhone(e.target.value)}
          />
          <button onClick={handleCreateContactSubmit}>Submit</button>
        </div>
      )}
      <div className="card-gallery">
  {Array.isArray(contacts) ? (
    contacts.map((contact) => (
      <div key={contact._id} className="card">
        <ContactCard
          contact={contact}
          onEdit={() => handleEdit(contact._id)}
          onDelete={() => handleDelete(contact._id)}
        />
        {editingContactId === contact._id && (
          <div className="edit-table">
            <input
              type="text"
              placeholder="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        )}
      </div>
    ))
  ) : (
    <>
    <p>Loading contacts...</p>
    {window.location.reload()}</>
  )}
</div>
    </div>
  );
};

export default Dashboard;