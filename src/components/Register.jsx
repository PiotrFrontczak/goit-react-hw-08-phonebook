import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

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
      <Typography component="h1" variant="h5">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField variant="outlined" margin="normal" required fullWidth label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField variant="outlined" margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" fullWidth variant="contained" color="primary">Register</Button>
      </form>
    </Container>
  );
};

export default Register;
