import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const CreateEmployee = () => {
  const [f_Name, setF_Name] = useState('');
  const [f_Email, setF_Email] = useState('');
  const [f_Mobile, setF_Mobile] = useState('');
  const [f_Designation, setF_Designation] = useState('');
  const [f_gender, setF_Gender] = useState('Male');
  const [f_Course, setF_Course] = useState([]);
  const [f_Image, setF_Image] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!f_Name) {
      setNameError('Name is required');
      return;
    }
    if (!f_Email) {
      setEmailError('Email is required');
      return;
    }
   
    setNameError('');
    setEmailError('');

    const formData = new FormData();
    formData.append('f_Name', f_Name);
    formData.append('f_Email', f_Email);
    formData.append('f_Mobile', f_Mobile);
    formData.append('f_Designation', f_Designation);
    formData.append('f_gender', f_gender);
    f_Course.forEach((course) => {
      formData.append('f_Course', course);
    });
    formData.append('f_Image', f_Image);
  
    try {
      const response = await fetch('http://localhost:4000/api/employee', {
        method: 'POST',
        body: formData,
      });
    const repo = await response.json();

      if (repo.success) {
        alert(repo.message)
        setIsSuccess(true);
      } else {
        alert(repo.message)
        throw new Error('Failed to create employee');
      }
    } catch (error) {
      alert(error.message)
      console.error('Error creating employee:', error);
      // Handle error
    }
  };

  if (isSuccess) {
    return <Navigate to="/employList" />;
  }

  return (
    <div>
      <Navbar/>
      <h3 style={{backgroundColor:"yellow", margin:0, padding:0}}>create employee</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent:"center", alignItems:"center"}}>
        {/* Input fields for employee details */}
        <div style={{ display: 'flex'}}>
          <label style={{ marginBottom: '5px' }}>Name:</label>
          <input type="text" value={f_Name} onChange={(e) => setF_Name(e.target.value)} />
        </div>
        {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
        <div style={{ display: 'flex' }}>
          <label style={{ marginBottom: '5px' }}>Email:</label>
          <input type="email" value={f_Email} onChange={(e) => setF_Email(e.target.value)} />
        </div>
        {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
        <div style={{ display: 'flex', }}>
    <label style={{ marginBottom: '5px' }}>Mobile No:</label>
    <input type="text" value={f_Mobile} onChange={(e) => setF_Mobile(e.target.value)} />
  </div>
  <div style={{ display: 'flex', }}>
    <label style={{ marginBottom: '5px' }}>Designation:</label>
    <select value={f_Designation} onChange={(e) => setF_Designation(e.target.value)}>
      <option value="HR">HR</option>
      <option value="Manager">Manager</option>
      <option value="Sales">Sales</option>
    </select>
  </div>
  <div style={{ display: 'flex' }}>
    <label style={{ marginBottom: '5px' }}>Gender:</label>
    <div style={{display:"flex"}}>
      <label>
        <input type="radio" value="Male" checked={f_gender === 'Male'} onChange={(e) => setF_Gender(e.target.value)} /> Male
      </label>
      <label>
        <input type="radio" value="Female" checked={f_gender === 'Female'} onChange={(e) => setF_Gender(e.target.value)}  /> Female
      </label>
    </div>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={{ marginBottom: '5px' }}>Course:</label>
    <div>
      <label>
        <input type="checkbox" value="MCA" checked={f_Course.includes('MCA')} onChange={(e) => setF_Course([...f_Course, e.target.value])} /> MCA
      </label>
      <label>
        <input type="checkbox" value="BCA" checked={f_Course.includes('BCA')} onChange={(e) => setF_Course([...f_Course, e.target.value])} /> BCA
      </label>
      <label>
        <input type="checkbox" value="BSC" checked={f_Course.includes('BSC')} onChange={(e) => setF_Course([...f_Course, e.target.value])} /> BSC
      </label>
    </div>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={{ marginBottom: '5px' }}>Image Upload:</label>
    <input type="file" onChange={(e) => setF_Image(e.target.files[0])} />
  </div>
        <button type="submit" style={{width:'25%'}}>Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
