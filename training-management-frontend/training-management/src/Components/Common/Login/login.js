import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
const Login = () => {
  const navigate= useNavigate ();
  //const userType = 'trainer';
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserType = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await axios.get('/api/userType');
            const fetchedUserType = response.data.userType;

           
            setUserType(fetchedUserType);
            
            // Redirect based on userType
            if (fetchedUserType === 'trainer') {
                navigate('/trainer/dashboard');
            } else if (fetchedUserType === 'manager') {
                navigate('/user/dashboard');
            } else if (fetchedUserType === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (error) {
            console.error('Error fetching userType:', error);
        }
    };

    fetchUserType();
}, [navigate]);
  // const handleLogin = () => {
  //   if (userType === 'trainer') {
  //     navigate('/trainer/dashboard');
  // } else if (userType === 'manager') {
  //     navigate('/user/dashboard');
  // } else if (userType === 'admin') {
  //     navigate('/admin/dashboard');
  // } else {
  //     navigate('/user/dashboard');
  // }
   
   // e.preventDefault();
    // Handle login logic here
 // };

  return (
    <div className="login-container">
      <form >
        <div className="input-container">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <label>User ID</label>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div> 
       
        <button type="submit">Login</button>
        
       
      </form>
    </div>
  );
};

export default Login;
