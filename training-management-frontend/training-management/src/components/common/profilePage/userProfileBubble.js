import ProfileDropdown from "./profileDropDown";
import React, { useState } from 'react';
import UserProfileLogo from './userProfileLogo.png'; 

const UserProfileBubble = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const toggleProfileMenu = () => {
    setShowProfileMenu((prevState) => !prevState);
  };
  return (
    <div className="user-profile" onClick={toggleProfileMenu}>
      {" "}
      <img
        src={UserProfileLogo}
        alt="User"
        className="profile-icon"
      />{" "}
      {showProfileMenu && <ProfileDropdown />}{" "}
    </div>
  );
};

export default UserProfileBubble;