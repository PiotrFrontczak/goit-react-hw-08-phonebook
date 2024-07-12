import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Contacts from './components/Contacts';
import Navigation from './components/Navigation';
import UserMenu from './components/UserMenu';

const App = () => (
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
);

ReactDOM.render(<App />, document.getElementById('root'));
