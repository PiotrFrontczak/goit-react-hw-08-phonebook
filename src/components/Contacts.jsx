import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Container, Typography, Paper, TextField, Button, Box } from '@mui/material';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

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

  const handleAddContact = async (e) => {
    e.preventDefault();
    setError('');
    const newContact = { name, number };
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://connections-api.goit.global/contacts', newContact, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setContacts([...contacts, response.data]);
      setName('');
      setNumber('');
    } catch (error) {
      console.error('Error adding contact:', error);
      setError('Failed to add contact. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Contacts
        </Typography>
        <Box component="form" onSubmit={handleAddContact} sx={{ mb: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="number"
            label="Number"
            name="number"
            autoComplete="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Contact
          </Button>
        </Box>
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
