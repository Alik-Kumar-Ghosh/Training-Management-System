import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from './logo.png';
import BASE_URL from '../../../utils/api';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request
      const response = await axios.post(`${BASE_URL}/login`, {
        userName,
        password
      },{ withCredentials: true }
    );

    console.log(response);

    console.log(document.cookie)

      function getCookieValue(name) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split('=');
          if (cookieName === name) {
            return decodeURIComponent(cookieValue);
          }
        }
        return null;
      }


      localStorage.setItem('isLoggedIn', 'true'); 
      localStorage.setItem('userType', response.data.userType); 
      localStorage.setItem('userId', response.data.userId);

      // Call getCookieValue after the axios call
      // const userId = getCookieValue('userId');
      // const userType = getCookieValue('userType');
  
      const userType = response.data.userType; // Assuming the response contains the user 
      const userId = response.data.userId;   
      console.log(userType)



      // Check and navigate based on userType
      if (userType === 'trainer') {
        navigate('/trainer/dashboard', { state: { userId, userType } });
      } else if (userType === 'admin') {
        navigate('/admin/dashboard', { state: { userId, userType } });
      } else {
        navigate('/user/dashboard', { state: { userId, userType } });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-container">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label>User Name</label>
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
