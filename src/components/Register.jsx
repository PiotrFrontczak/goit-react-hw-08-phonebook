import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://connections-api.herokuapp.com/users/signup', { email, password });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>Register</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField variant="outlined" margin="normal" required fullWidth label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField variant="outlined" margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>Register</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
