import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../utils/api'

const ProfileDropdown = () => {
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`);
      console.log("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="profile-dropdown">
      <Link to="/profile">
        <button onClick={() => console.log("View Profile")}>
          View Profile
        </button>
      </Link>
      <Link to="/">
        <button onClick={() => console.log("Home")}>
          Home
        </button>
      </Link>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
