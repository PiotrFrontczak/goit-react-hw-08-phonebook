import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Container, Typography, Paper } from '@mui/material';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://connections-api.goit.global/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Contacts
        </Typography>
        <List>
          {contacts.map((contact) => (
            <ListItem key={contact.id}>
              <ListItemText primary={contact.name} secondary={contact.number} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Contacts;
