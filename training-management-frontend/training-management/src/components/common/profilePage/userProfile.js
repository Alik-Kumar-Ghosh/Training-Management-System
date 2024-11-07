import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../utils/api';
import logo from './logo.png';
import './userProfile.css';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        userName:'',
        email: '',
        employeeId: '',
        dob: '',
        dateOfJoining: '',
        phone: '',
        password:''  // Masked password for display
    });
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');

    // const location = useLocation();
    // const { userId, userType } = location.state || {};

    // function getCookieValue(name) {
    //     const cookies = document.cookie.split('; ');
    //     for (let cookie of cookies) {
    //       const [cookieName, cookieValue] = cookie.split('=');
    //       if (cookieName === name) {
    //         return decodeURIComponent(cookieValue);
    //       }
    //     }
    //     return null; // Return null if cookie is not found
    //   }
    
      function getCookieValue(name) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
               // console.log(`Found cookie: ${cookieName} = ${cookieValue}`); // Debugging
                return decodeURIComponent(cookieValue);
            }
        }
       // console.warn(`Cookie ${name} not found`); // Debugging
        return null;
    }
    
    const userId = getCookieValue('userId'); 
    const userType = getCookieValue('userType');
    console.log(userId)
    console.log(userType)

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/profile`, {
                    withCredentials: true,
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        

        fetchProfileData();
    }, [userId]);

    const handleEditPhone = () => setIsEditingPhone(true);
    const handleEditPassword = () => setIsEditingPassword(true);

    const handlePhoneChange = (e) => setProfile({ ...profile, phone: e.target.value });
    const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
    const handlePasswordChange = (e) => setProfile({ ...profile, password: e.target.value });

    const handleUpdatePhone = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/user/update-user`, {
                userId,
                phone: profile.phone,
            });
            console.log('Phone updated successfully');
            setProfile(response.data); // Update profile with latest data from server
            setIsEditingPhone(false);
        } catch (error) {
            console.error('Error updating phone:', error);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/user/update-user`, {
                userId,
                password: profile.password,
            });
            console.log('Password updated successfully');
            setProfile(response.data); // Update profile with latest data from server
            setIsEditingPassword(false);
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };
    // to do handle failed password update
    // handle all the errors without disrupting the page


    return (
        <div className="profile-container">
            <img src={logo} alt="Logo" className="logo" />
            <div className="profile-details">
                <h2>User Profile</h2>
                <div className="profile-field">
                    <span>Name:</span>
                    <p>{profile.name}</p>
                </div>
                <div className="profile-field">
                    <span>Username:</span>
                    <p>{profile.userName}</p>
                </div>
                <div className="profile-field">
                    <span>Email:</span>
                    <p>{profile.email}</p>
                </div>
                <div className="profile-field">
                    <span>Employee ID:</span>
                    <p>{userId}</p>
                </div>
                <div className="profile-field">
                    <span>Date of Birth:</span>
                    <p>{profile.dob}</p>
                </div>
                <div className="profile-field">
                    <span>Date of Joining:</span>
                    <p>{profile.doj}</p>
                </div>

                {/* Editable field for Phone */}
                <div className="profile-field">
                    <span>Phone:</span>
                    {isEditingPhone ? (
                        <>
                            <input
                                type="text"
                                value={profile.phone}
                                onChange={handlePhoneChange}
                                className="edit-input"
                            />
                            <button onClick={handleUpdatePhone} className="update-button">Update Phone</button>
                        </>
                    ) : (
                        <>
                            <p>{profile.phone}</p>
                            <button onClick={handleEditPhone} className="edit-button">✏️</button>
                        </>
                    )}
                </div>

                {/* Editable field for Password */}
                <div className="profile-field">
                    <span>Change Password</span>
                    {isEditingPassword ? (
                        <>
                        <input
                                type="password"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={handleOldPasswordChange}
                                className="edit-input"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                onChange={handlePasswordChange}
                                className="edit-input"
                            />
                            <button onClick={handleUpdatePassword} className="update-button">Update Password</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEditPassword} className="edit-button">✏️</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;





// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import BASE_URL from '../../../utils/api';
// import logo from './logo.png';
// import './userProfile.css';
// import { useLocation } from 'react-router-dom';

// const UserProfile = () => {
//     const [profile, setProfile] = useState({
//         name: '',
//         userName:'',
//         email: '',
//         employeeId: '',
//         dob: '',
//         dateOfJoining: '',
//         phone: '',
//         password:''  // Masked password for display
//     });
//     const [isEditingPhone, setIsEditingPhone] = useState(false);
//     const [isEditingPassword, setIsEditingPassword] = useState(false);
//     const [oldPassword, setOldPassword] = useState('');

//     const location = useLocation();
//     const { userId, userType } = location.state || {};

//     function getCookieValue(name) {
//         const cookies = document.cookie.split('; ');
//         for (let cookie of cookies) {
//             const [cookieName, cookieValue] = cookie.split('=');
//             if (cookieName === name) {
//                 return decodeURIComponent(cookieValue);
//             }
//         }
//         return null; // Return null if cookie is not found
//     }
    
//     // Usage
//     // const userId = getCookieValue("userId");
//     // const userType = getCookieValue("userType");
    
//     console.log("User ID:", userId);
//     console.log("User Type:", userType);

//     useEffect(() => {
//         const fetchProfileData = async () => {
//             try {
//                 console.log(userId)
//                 const response = await axios.get(`${BASE_URL}/user/profile}`,{
//                     withCredentials:true
//                 }); // Replace with actual API endpoint
//                 console.log(response)
//                 setProfile(response.data);
//             } catch (error) {   
//                 console.error('Error fetching profile data:', error);
//             }
//         };
//         fetchProfileData();
//     }, [userId]);

//     const handleEditPhone = () => setIsEditingPhone(true);
//     const handleEditPassword = () => setIsEditingPassword(true);

//     const handlePhoneChange = (e) => setProfile({ ...profile, phone: e.target.value });
//     const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
//     const handlePasswordChange = (e) => setProfile({ ...profile, password: e.target.value });

//     const handleUpdatePhone = async () => {
//         try {
//             const response = await axios.put(`${BASE_URL}/user/update-user`, {
//                 userId,
//                 phone: profile.phone,
//             });
//             console.log('Phone updated successfully');
//             setProfile(response.data); // Update profile with latest data from server
//             setIsEditingPhone(false);
//         } catch (error) {
//             console.error('Error updating phone:', error);
//         }
//     };

//     const handleUpdatePassword = async () => {
//         try {
//             const response = await axios.put(`${BASE_URL}/user/update-user`, {
//                 userId,
//                 password: profile.password,
//             });
//             console.log('Password updated successfully');
//             setProfile(response.data); // Update profile with latest data from server
//             setIsEditingPassword(false);
//         } catch (error) {
//             console.error('Error updating password:', error);
//         }
//     };
//     // to do handle failed password update
//     // handle all the errors without disrupting the page


//     return (
//         <div className="profile-container">
//             <img src={logo} alt="Logo" className="logo" />
//             <div className="profile-details">
//                 <h2>User Profile</h2>
//                 <div className="profile-field">
//                     <span>Name:</span>
//                     <p>{profile.name}</p>
//                 </div>
//                 <div className="profile-field">
//                     <span>Username:</span>
//                     <p>{profile.userName}</p>
//                 </div>
//                 <div className="profile-field">
//                     <span>Email:</span>
//                     <p>{profile.email}</p>
//                 </div>
//                 <div className="profile-field">
//                     <span>Employee ID:</span>
//                     <p>{profile.employeeId}</p>
//                 </div>
//                 <div className="profile-field">
//                     <span>Date of Birth:</span>
//                     <p>{profile.dob}</p>
//                 </div>
//                 <div className="profile-field">
//                     <span>Date of Joining:</span>
//                     <p>{profile.dateOfJoining}</p>
//                 </div>

//                 {/* Editable field for Phone */}
//                 <div className="profile-field">
//                     <span>Phone:</span>
//                     {isEditingPhone ? (
//                         <>
//                             <input
//                                 type="text"
//                                 value={profile.phone}
//                                 onChange={handlePhoneChange}
//                                 className="edit-input"
//                             />
//                             <button onClick={handleUpdatePhone} className="update-button">Update Phone</button>
//                         </>
//                     ) : (
//                         <>
//                             <p>{profile.phone}</p>
//                             <button onClick={handleEditPhone} className="edit-button">✏️</button>
//                         </>
//                     )}
//                 </div>

//                 {/* Editable field for Password */}
//                 <div className="profile-field">
//                     <span>Change Password</span>
//                     {isEditingPassword ? (
//                         <>
//                         <input
//                                 type="password"
//                                 placeholder="Old Password"
//                                 value={oldPassword}
//                                 onChange={handleOldPasswordChange}
//                                 className="edit-input"
//                             />
//                             <input
//                                 type="password"
//                                 placeholder="New Password"
//                                 onChange={handlePasswordChange}
//                                 className="edit-input"
//                             />
//                             <button onClick={handleUpdatePassword} className="update-button">Update Password</button>
//                         </>
//                     ) : (
//                         <>
//                             <button onClick={handleEditPassword} className="edit-button">✏️</button>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './UserProfile.css';
// import logo from './logo.png';

// const UserProfile = () => {
//     const [profile, setProfile] = useState({
//         name: 'xyz',
//         email: 'zyz@12.com',
//         employeeId: 'aiushd',
//         dob: 'sdaiusjd',
//         dateOfJoining: 'sdasd',
//         phone: 'sdasdassssssssssss',
//         password: '********', // Masked password for display
//     });
//     const [isEditingPhone, setIsEditingPhone] = useState(false);
//     const [isEditingPassword, setIsEditingPassword] = useState(false);

//     // Fetch user profile data on component mount
//     useEffect(() => {
//         const fetchProfileData = async () => {
//             try {
//                 const response = await axios.get('/api/profile'); // Replace with actual API endpoint
//                 setProfile(response.data);
//             } catch (error) {
//                 console.error('Error fetching profile data:', error);
//             }
//         };

//         fetchProfileData();
//     }, []);

//     const handleEditPhone = () => setIsEditingPhone(true);
//     const handleEditPassword = () => setIsEditingPassword(true);

//     const handlePhoneChange = (e) => setProfile({ ...profile, phone: e.target.value });
//     const handlePasswordChange = (e) => setProfile({ ...profile, password: e.target.value });

//     const handleUpdatePhone = async () => {
//         try {
//             await axios.put('/api/profile/phone', { phone: profile.phone });
//             console.log('Phone updated successfully');
//             setIsEditingPhone(false);
//         } catch (error) {
//             console.error('Error updating phone:', error);
//         }
//     };

//     const handleUpdatePassword = async () => {
//         try {
//             await axios.put('/api/profile/password', { password: profile.password });
//             console.log('Password updated successfully');
//             setIsEditingPassword(false);
//         } catch (error) {
//             console.error('Error updating password:', error);
//         }
//     };

//     return (
//         <div className="profile-container">
//             <img src={logo} alt="Logo" className="logo" />
//             <div className="profile-details">
//             <h2>User Profile</h2>
//                 <div className="profile-field">
//                     <span>Name:</span>
//                     <p>{profile.name}</p>
//                 </div>
//                 <div className="profile-field">
//                     <span>Email:</span>
//                     <p>{profile.email}</p>
//                 </div>
//                 <div className="profile-field">
//                     <span>Employee ID:</span>
//                     <p>{profile.employeeId}</p>
//                 </div>
//                 <div className="profile-field">
//                     <span>Date of Birth:</span>
//                     <p>{profile.dob}</p>
//                 </div>
//                 <div className="profile-field">
//                     <span>Date of Joining:</span>
//                     <p>{profile.dateOfJoining}</p>
//                 </div>

//                 {/* Editable fields for Phone */}
//                 <div className="profile-field">
//                     <span>Phone:</span>
//                     {isEditingPhone ? (
//                         <>
//                             <input
//                                 type="text"
//                                 value={profile.phone}
//                                 onChange={handlePhoneChange}
//                                 className="edit-input"
//                             />
//                             <button onClick={handleUpdatePhone} className="update-button">Update Phone</button>
//                         </>
//                     ) : (
//                         <>
//                             <p>{profile.phone}</p>
//                             <button onClick={handleEditPhone} className="edit-button">✏️</button>
//                         </>
//                     )}
//                 </div>

//                 {/* Editable field for Password */}
//                 <div className="profile-field">
//                     <span>Password:</span>
//                     {isEditingPassword ? (
//                         <>
//                             <input
//                                 type="password"
//                                 placeholder="New Password"
//                                 onChange={handlePasswordChange}
//                                 className="edit-input"
//                             />
//                             <button onClick={handleUpdatePassword} className="update-button">Update Password</button>
//                         </>
//                     ) : (
//                         <>
//                             <p>{profile.password}</p>
//                             <button onClick={handleEditPassword} className="edit-button">✏️</button>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;



