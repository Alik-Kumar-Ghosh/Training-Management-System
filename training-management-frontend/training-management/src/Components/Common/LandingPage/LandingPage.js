import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Training Management System</h1>
      <p>About Us</p>
      <p>Contact</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default LandingPage;
