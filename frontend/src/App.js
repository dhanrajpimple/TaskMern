import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}  />
        <Route path="/employList" element={<EmployeeList  />} />
        <Route path="/createEmployee" element={<CreateEmployee/>} />
        <Route path="/editEmployee/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
