import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const EmployeeList = () => {
  const [initialEmployees, setInitialEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editedData, setEditedData] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: ''
  });
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchEmployees();
  }, []); 

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/employees');
      const fetchedEmployees = response.data.employees;
      setEmployees(fetchedEmployees);
      setInitialEmployees(fetchedEmployees);
      setTotalEmployees(fetchedEmployees.length);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = () => {
    const filteredEmployees = initialEmployees.filter(employee =>
      employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEmployees(filteredEmployees);
    setTotalEmployees(filteredEmployees.length);
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:4000/api/employeedelete`, { data: { id: employeeId } });
      fetchEmployees(); 
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const navigate = useNavigate();

  const handleEdit = (employeeId) => {
   
    navigate(`/editEmployee/${employeeId}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:4000/api/employeeupdate`, {
        id: editingEmployee._id,
        ...editedData
      });
      fetchEmployees();
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const sortByKey = (key) => {
   
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (sortKey === 'f_Name' || sortKey === 'f_Email') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  return (
    <div>
      <Navbar/>
      <h3 style={{backgroundColor:"yellow", margin:0, padding:0}}>EmployList</h3>
      <div style={{ display: 'flex', flexDirection: 'column', top: '70px', width: '100%', marginLeft:"70%"}}>
  <div style={{ padding: '10px'}}>
    <span>Total Employees: {totalEmployees}</span>
    <Link to="/createEmployee" style={{ backgroundColor: 'red', textDecoration: 'none', marginLeft: '15px' }}>Create Employee</Link>
  </div>
  <div style={{padding: '10px' }}>
    <label>Search</label>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by name"
    />
    <button onClick={handleSearch}>Search</button>
  </div>


</div>
<table style={{ borderCollapse: 'collapse', width: '100%' }}>
  <thead>
    <tr>
      <th onClick={() => sortByKey('_id')} style={{ border: '1px solid black', padding: '8px' }}>ID</th>
      <th style={{ border: '1px solid black', padding: '8px' }}>Image</th>
      <th onClick={() => sortByKey('f_Name')} style={{ border: '1px solid black', padding: '8px' }}>Name</th>
      <th onClick={() => sortByKey('f_Email')} style={{ border: '1px solid black', padding: '8px' }}>Email</th>
      <th style={{ border: '1px solid black', padding: '8px' }}>Mobile No</th>
      <th style={{ border: '1px solid black', padding: '8px' }}>Designation</th>
      <th style={{ border: '1px solid black', padding: '8px' }}>Gender</th>
      <th style={{ border: '1px solid black', padding: '8px' }}>Course</th>
      <th style={{ border: '1px solid black', padding: '8px' }}>Create date</th>
      <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {sortedEmployees.map((employee) => (
      <tr key={employee._id}>
        <td style={{ border: '1px solid black', padding: '8px' }}>{employee._id}</td>
       
        <td style={{ border: '1px solid black', padding: '8px' }}><img src={require(`../../../backend/uploads/${employee.f_Image}`)} alt="Employee" width="50" /></td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{employee.f_Name}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{employee.f_Email}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{employee.f_Mobile}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{employee.f_Designation}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{employee.f_gender}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{employee.f_Course}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>
          {
         
            <div>
              <button onClick={() => handleEdit(employee._id)} style={{backgroundColor:"transparent", border:'none'}}>Edit</button>
              <button onClick={() => handleDelete(employee._id)} style={{backgroundColor:"transparent", border:'none'}}>Delete</button>
            </div>
          }
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default EmployeeList;
