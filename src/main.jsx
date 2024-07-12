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
    mode: 'dark', // Change to 'light' if you prefer a light theme
    primary: {
      main: '#90caf9', // Light blue
    },
    secondary: {
      main: '#f48fb1', // Pink
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e', // Dark paper background
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0bec5', // Light grey text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
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
