import ProfileDropdown from "./profileDropDown";
import React, { useState } from 'react';

const UserProfileBubble = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const toggleProfileMenu = () => {
    setShowProfileMenu((prevState) => !prevState);
  };
  return (
    <div className="user-profile" onClick={toggleProfileMenu}>
      {" "}
      <img
        src="https://via.placeholder.com/40"
        alt="User"
        className="profile-icon"
      />{" "}
      {showProfileMenu && <ProfileDropdown />}{" "}
    </div>
  );
};

export default UserProfileBubble;