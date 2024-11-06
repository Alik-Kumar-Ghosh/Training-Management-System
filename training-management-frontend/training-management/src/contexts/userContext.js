import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        userId: null,
        userType: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user'); //need to replace with actual API endpoint
                setUser({
                    userId: response.data.userId,
                    userType: response.data.userType,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading user data...</p>;

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

// fetching cookie in userContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [userId, setUserId] = useState(null);
//     const [userType, setUserType] = useState(null);

//     useEffect(() => {
//         // Helper function to parse cookies
//         const getCookieValue = (name) => {
//             const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//             return match ? match[2] : null;
//         };

//         // Get userId and userType from cookies
//         const id = getCookieValue('userId');
//         const type = getCookieValue('userType');

//         if (id && type) {
//             setUserId(id);
//             setUserType(type);
//         }
//     }, []);

//     return (
//         <UserContext.Provider value={{ userId, userType }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => useContext(UserContext);

