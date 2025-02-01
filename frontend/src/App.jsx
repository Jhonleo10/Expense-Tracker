import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className='p-3'>
        <Container className='logo'>
          <Navbar.Brand as={Link} to="/" className='logo'>Expense Tracker</Navbar.Brand>
          <Nav className="ml-auto">
            {authToken ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} onClick={() => { localStorage.removeItem('authToken'); setAuthToken(null); }} >Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      
      <Container className="mt-4">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<TransactionHistory />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
