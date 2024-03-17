import React from 'react';
import EmployeeList from './EmployeeList';
import Navbar from './Navbar';

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <h1 style={{background:"yellow", margin:0, padding:0}}>Dashboard</h1>
      <h1 style={{textAlign:"center"}}>welcome to admin panel</h1>
    </div>
  );
};

export default Dashboard;
