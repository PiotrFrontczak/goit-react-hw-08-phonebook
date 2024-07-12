import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const UserMenu = () => {
  const navigate = useNavigate();
  const email = 'user@example.com'; // Replace this with the actual user email from context or state

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box display="flex" alignItems="center" sx={{ mt: 2, mb: 2 }}>
      <Typography variant="body1" sx={{ mr: 2 }}>{email}</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default UserMenu;
