import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from './Navbar';


const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [editedData, setEditedData] = useState({
    f_Name: '',
    id:id,
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: [],
    f_Image: null
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/employees`, id); 
      setEmployee(response.data.employee);
      setEditedData({
        f_Name: response.data.employee.f_Name,
        f_Email: response.data.employee.f_Email,
        f_Mobile: response.data.employee.f_Mobile,
        f_Designation: response.data.employee.f_Designation,
        f_gender: response.data.employee.f_gender,
        f_Course: response.data.employee.f_Course,
        f_Image: response.data.employee.f_Image
      });
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', editedData.id);
    formData.append('f_Name', editedData.f_Name);
    formData.append('f_Email', editedData.f_Email);
    formData.append('f_Mobile', editedData.f_Mobile);
    formData.append('f_Designation', editedData.f_Designation);
    formData.append('f_gender', editedData.f_gender);
    editedData.f_Course.forEach((course) => {
      formData.append('f_Course', course);
    });
    formData.append('f_Image', editedData.f_Image);
  
    try {
      const response = await fetch(`http://localhost:4000/api/employeeupdate`, {
        method: 'PUT',
        body: formData
      });
      const repo = await response.json();
      console.log(repo);
      if (repo.success) {
        alert(repo.message)
        setIsSuccess(true);
      } else {
        alert(repo.message)
        throw new Error('Failed to update employee');
      }
    } catch (error) {
      alert(error.message)
      console.error('Error updating employee:', error);
    }
  };
  

  if (isSuccess) {
    return <Navigate to="/employList" />;
  }

  return (
    <div>
      <Navbar />
      <h2 style={{backgroundColor:"yellow", margin:0, padding:0}}>Edit Employee</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems:"center", justifyContent:'center'}}>
  
  <div style={{ display: 'flex', marginBottom: '10px', flexDirection:"column" }}>
    <label style={{ marginRight: '10px' }}>
      Name:
      <input type="text" value={editedData.f_Name} onChange={(e) => setEditedData({ ...editedData, f_Name: e.target.value })} />
    </label>
    <label style={{ marginRight: '10px' }}>
      Email:
      <input type="email" value={editedData.f_Email} onChange={(e) => setEditedData({ ...editedData, f_Email: e.target.value })} />
    </label>
  </div>
  <div style={{ display: 'flex', marginBottom: '10px', flexDirection:"column" }}>
    <label style={{ marginRight: '10px' }}>
      Mobile No:
      <input type="text" value={editedData.f_Mobile} onChange={(e) => setEditedData({ ...editedData, f_Mobile: e.target.value })} />
    </label>
    <label style={{ marginRight: '10px' }}>
      Designation:
      <select value={editedData.f_Designation} onChange={(e) => setEditedData({ ...editedData, f_Designation: e.target.value })}>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>
    </label>
  </div>
  <div style={{ display: 'flex', marginBottom: '10px',flexDirection:"column" }}>
    <label style={{ marginRight: '10px' }}>
      Gender:
      <label style={{ marginRight: '10px' }}>
        <input type="radio" value="Male" checked={editedData.f_gender === 'Male'} onChange={(e) => setEditedData({ ...editedData, f_gender: e.target.value })} /> Male
      </label>
      <label>
        <input type="radio" value="Female" checked={editedData.f_gender === 'Female'} onChange={(e) => setEditedData({ ...editedData, f_gender: e.target.value })} /> Female
      </label>
    </label>
    <label style={{ marginRight: '10px' }}>
      Course:
      <label style={{ marginRight: '10px' }}>
        <input type="checkbox" value="MCA" checked={editedData.f_Course.includes('MCA')} onChange={(e) => setEditedData({ ...editedData, f_Course: [...editedData.f_Course, e.target.value] })} /> MCA
      </label>
      <label style={{ marginRight: '10px' }}>
        <input type="checkbox" value="BCA" checked={editedData.f_Course.includes('BCA')} onChange={(e) => setEditedData({ ...editedData, f_Course: [...editedData.f_Course, e.target.value] })} /> BCA
      </label>
      <label>
        <input type="checkbox" value="BSC" checked={editedData.f_Course.includes('BSC')} onChange={(e) => setEditedData({ ...editedData, f_Course: [...editedData.f_Course, e.target.value] })} /> BSC
      </label>
    </label>
  </div>
  <div style={{ display: 'flex', marginBottom: '10px', flexDirection:"column" }}>
    <label style={{ marginRight: '10px' }}>
      Image Upload:
      <input type="file" onChange={(e) => setEditedData({ ...editedData, f_Image: e.target.files[0] })} />
    </label>
  </div>
  <button type="submit">Submit</button>
</form>

    </div>
  );
};

export default EditEmployee;
