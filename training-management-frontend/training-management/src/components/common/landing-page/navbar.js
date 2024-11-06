import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './navbar.css'

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <nav className="navbar">
       <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#benefits">Benefits</a></li>
        <li><a href="#trainings">Trainings</a></li>
        {isLoggedIn ? (
          <li><Link to="/dashboard">Dashboard</Link></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
