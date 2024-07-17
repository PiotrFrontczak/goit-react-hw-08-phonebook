import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const { data } = await axios.get('https://connections-api.goit.global/docs/10:45#/Contact/get_contacts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, [navigate]);

  return (
    <div>
      <h2>Your Contacts</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>{contact.name}: {contact.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
