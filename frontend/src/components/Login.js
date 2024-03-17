import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies library

const Login = () => {
  const [userName, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/login', { userName, Password });
      console.log(response.data);
      // Store the username in cookies
      Cookies.set('username', userName);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div style={{"display":"flex", "flexDirection":"column", gap:"30px"}}>
      <h2 style={{'backgroundColor':"yellow", "height":"50px"}}>Login</h2>
      <form onSubmit={handleSubmit}style={{"display":"flex", "flexDirection":"column", marginLeft:"25%", gap:"30px"}} >
      <div>
      <label style={{marginRight:"25px"}}>Username</label>
        <input type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)}  style={{"width":"50%",gap:"30px", height:"25px" }} />
        </div>
        <div>
        <label style={{marginRight:"25px"}}>password</label>
        <input type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} style={{"width":"50%" ,gap:"30px", height:"25px" }} />
        </div>
        <button type="submit" style={{"width":"50%",gap:"30px",height:"25px", marginLeft:"8%" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
