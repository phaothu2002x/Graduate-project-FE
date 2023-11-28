import React, { createContext, useState, useEffect } from 'react';
import { getUserAccount, fetchCurrentUser } from '~/services/userService';
import { toast } from 'react-toastify';
const UserContext = createContext();

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const defaultData = { isAuthenticated: false, token: '', account: {}, isLoading: true };
    const [user, setUser] = useState(defaultData);

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({ ...defaultData, isLoading: false });
    };

    useEffect(() => {
        if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
            fetchUser();
        } else {
            setUser({ ...user, isLoading: false });
        }
    }, []);

    const fetchUser = async () => {
        let response = await getUserAccount();
        if (response && response.EC === 0) {
            let groupWithRole = response.DT.groupWithRole;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;
            let phone = response.DT.phone;
            let avatar = response.DT.avatar;
            let userId = response.DT.userId;
            let userData = {
                isAuthenticated: true,
                token,
                account: { userId, groupWithRole, email, username, phone, avatar },
                isLoading: false,
            };
            setUser(userData);
        } else {
            setUser({ ...defaultData, isLoading: false });
        }
    };

    const fetchUpdatedUser = async () => {
        let response = await fetchCurrentUser(user.account.userId);
        if (response && response.EC === 0) {
            return response.DT;
        } else {
            toast.error('cannot get current user');
        }
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext, fetchUser, fetchUpdatedUser }}>{children}</UserContext.Provider>
    );
};

export { UserProvider, UserContext };
