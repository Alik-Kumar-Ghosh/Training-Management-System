import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './userProfile.css';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        employeeId: '',
        dob: '',
        dateOfJoining: '',
        phone: '',
        password: '********', // Masked password for display
    });
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    // Fetch user profile data on component mount
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('/api/profile'); // Replace with actual API endpoint
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleEditPhone = () => setIsEditingPhone(true);
    const handleEditPassword = () => setIsEditingPassword(true);

    const handlePhoneChange = (e) => setProfile({ ...profile, phone: e.target.value });
    const handlePasswordChange = (e) => setProfile({ ...profile, password: e.target.value });

    const handleUpdatePhone = async () => {
        try {
            await axios.put('/api/profile/phone', { phone: profile.phone });
            console.log('Phone updated successfully');
            setIsEditingPhone(false);
        } catch (error) {
            console.error('Error updating phone:', error);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            await axios.put('/api/profile/password', { password: profile.password });
            console.log('Password updated successfully');
            setIsEditingPassword(false);
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <div className="profile-details">
                <div className="profile-field">
                    <span>Name:</span>
                    <p>{profile.name}</p>
                </div>
                <div className="profile-field">
                    <span>Email:</span>
                    <p>{profile.email}</p>
                </div>
                <div className="profile-field">
                    <span>Employee ID:</span>
                    <p>{profile.employeeId}</p>
                </div>
                <div className="profile-field">
                    <span>Date of Birth:</span>
                    <p>{profile.dob}</p>
                </div>
                <div className="profile-field">
                    <span>Date of Joining:</span>
                    <p>{profile.dateOfJoining}</p>
                </div>

                {/* Editable fields for Phone */}
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
                    <span>Password:</span>
                    {isEditingPassword ? (
                        <>
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
                            <p>{profile.password}</p>
                            <button onClick={handleEditPassword} className="edit-button">✏️</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;



