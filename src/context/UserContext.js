import React, { createContext, useState, useEffect } from 'react';
import { getUserAccount, fetchCurrentUser } from '~/services/userService';
import { toast } from 'react-toastify';
const UserContext = createContext();

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const defaultData = { isAuthenticated: false, token: '', account: {}, isLoading: true };
    const [user, setUser] = useState(defaultData);
    // console.log('check user ', user);
    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({ ...defaultData, isLoading: false });
    };

    const allowedPaths = ['/login', '/', '/product', '/#feature', '/register'];
    const regex = /^\/product\/\d+$/;
    function isPathAllowed(path) {
        // console.log(allowedPaths.includes(path));
        return allowedPaths.includes(path);
    }

    useEffect(() => {
        //window.location.pathname !== '/' &&
        // if (window.location.pathname !== '/login') {
        //     fetchUser();
        // } else {
        //     setUser({ ...user, isLoading: false });
        // }
        // console.log('check regex', regex.test(window.location.pathname));
        // console.log('check allow path', isPathAllowed(window.location.pathname));
        if (!(regex.test(window.location.pathname) || isPathAllowed(window.location.pathname))) {
            fetchUser();
        } else {
            setUser({ ...user, isLoading: false });
        }
    }, []);

    useEffect(() => {
        let jwtExisted = localStorage.getItem('jwt');
        if (jwtExisted) {
            fetchUser();
        }
    }, []);

    const fetchUser = async () => {
        let response = await getUserAccount();
        // console.log(response);
        if (response && response.EC === 0) {
            let token = response.DT.token;
            let userId = response.DT.currentUser.id;
            let username = response.DT.currentUser.username;
            let avatar = response.DT.currentUser.avatar;
            let email = response.DT.currentUser.email;
            let phone = response.DT.currentUser.phone;
            let groupWithRole = response.DT.groupWithRole;
            let updatedUserData = {
                isAuthenticated: true,
                token,
                account: { userId, email, username, phone, avatar, groupWithRole },
                isLoading: false,
            };
            setUser(updatedUserData);
        } else {
            setUser({ ...defaultData, isLoading: false });
            // toast.error('cannot get current user');
        }
    };

    return <UserContext.Provider value={{ user, loginContext, logoutContext, fetchUser }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
