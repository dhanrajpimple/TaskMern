import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate(); 

 
  const username = Cookies.get('username');

 
  const logout = () => {
  
    Cookies.remove('username');

    navigate('/');
  };

  return (
    <nav style={{display:"flex", justifyContent:"space-around", alignItems:"center", backgroundColor:"skyblue"}}>
      <ul style={{display:"flex", justifyContent:"space-between", listStyle:"none", textDecoration:"none"}}>
        <li>
          <Link to="/dashboard" style={{marginRight:"50px",  textDecoration: 'none', color: 'inherit'}}>Home</Link>
        </li>
        <li>
          <Link to="/employList" style={{marginRight:"50px",  textDecoration: 'none', color: 'inherit'}}>Employee List</Link>
        </li>
      </ul>
      <div>
       {username}-
        <button onClick={logout} style={{backgroundColor:"transparent", marginLeft:"50px", border: 'none'}}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
