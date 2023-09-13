import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ExpensePage from './pages/ExpensePage';
import IncomePage from './pages/IncomePage';

import { useNavigate } from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';





function App() {
  const navigate = useNavigate()
  return (
    <>
     <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link href="#income" onClick={() => navigate('income-page')}>Income Group</Nav.Link>
            <Nav.Link href="#expense" onClick={() => navigate('expense-page')}>Expense Group</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="expense-page" element={<ExpensePage/>}/>
      <Route path="income-page" element={<IncomePage/>}/>
    </Routes>
    </>
  );
}



export default App;