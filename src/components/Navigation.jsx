import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Phonebook
      </Typography>
      <Button color="inherit" component={Link} to="/register">Register</Button>
      <Button color="inherit" component={Link} to="/login">Login</Button>
      <Button color="inherit" component={Link} to="/contacts">Contacts</Button>
    </Toolbar>
  </AppBar>
);

export default Navigation;
