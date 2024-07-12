import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Register from './components/Register';
import Login from './components/Login';
import Contacts from './components/Contacts';
import Navigation from './components/Navigation';
import UserMenu from './components/UserMenu';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#f50057', // Pink
    },
    background: {
      default: '#f3f4f6', // Light grey background
      paper: '#ffffff', // White paper background
    },
    text: {
      primary: '#333333', // Dark text
      secondary: '#555555', // Lighter dark text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router basename="/goit-react-hw-08-phonebook">
      <div>
        <Navigation />
        <UserMenu />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  </ThemeProvider>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
