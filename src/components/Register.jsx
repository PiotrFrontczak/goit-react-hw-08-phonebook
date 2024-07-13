import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    console.log('Sending user data:', userData);

    try {
      const response = await axios.post('https://connections-api.herokuapp.com/users/signup', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response);
      if (response.status === 201 || response.status === 200) {
        // Optionally store the token if you need it for further requests
        localStorage.setItem('token', response.data.token);
        // Navigate to login or contacts page
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        console.error('Full error response:', error.response);
        alert('Registration failed: ' + (error.response.data.message || 'Unknown error'));
      } else {
        console.error('Error:', error.message);
        alert('Registration failed: ' + error.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
