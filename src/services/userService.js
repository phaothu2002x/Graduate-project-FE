import axios from '~/setup/axios';

const registerNewUser = (email, phone, username, password, confirmPass) => {
    return axios.post('/api/register', { email, phone, username, password, confirmPass });
};

const LoginUser = (valueLogin, password) => {
    return axios.post('/api/login', { valueLogin, password });
};

const logoutUser = () => {
    return axios.post('/api/logout');
};

const fetchAllUsers = (page, limit) => {
    return axios.get(`/api/manage-user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
    return axios.delete('/api/manage-user/delete', { data: { id: user.id } });
};

const fetchRole = (user) => {
    return axios.get('/api/role/read');
};

const createUser = (userData) => {
    return axios.post('/api/manage-user/create', { ...userData });
};

const updateCurrentUser = (userData) => {
    return axios.put('/api/manage-user/update', { ...userData });
};
const updateProfileUser = (fromData) => {
    return axios.put('/api/profile/update', fromData);
};

const getUserAccount = () => {
    return axios.get('/api/account');
};

const fetchCurrentUser = (userId) => {
    return axios.get(`/api/profile/read`, {
        params: {
            user: userId,
        },
    });
};

export {
    registerNewUser,
    LoginUser,
    logoutUser,
    fetchAllUsers,
    fetchCurrentUser,
    deleteUser,
    fetchRole,
    createUser,
    updateCurrentUser,
    updateProfileUser,
    getUserAccount,
};
