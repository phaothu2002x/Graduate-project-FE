import React, { createContext, useState, useEffect } from 'react';
import { getUserAccount } from '~/services/userService';
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
            let userData = {
                isAuthenticated: true,
                token,
                account: { groupWithRole, email, username },
                isLoading: false,
            };
            setUser(userData);
        } else {
            setUser({ ...defaultData, isLoading: false });
        }
    };

    return <UserContext.Provider value={{ user, loginContext, logoutContext }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
