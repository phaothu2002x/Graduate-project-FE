import axios from 'axios';

const registerNewUser = (email, phone, username, password, confirmPass) => {
    return axios.post('http://localhost:8081/api/register', { email, phone, username, password, confirmPass });
};

const LoginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8081/api/login', { valueLogin, password });
};

const fetchAllUsers = (page, limit) => {
    return axios.get(`http://localhost:8081/api/manage-user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
    return axios.delete('http://localhost:8081/api/manage-user/delete', { data: { id: user.id } });
};

const fetchRole = (user) => {
    return axios.get('http://localhost:8081/api/role/read');
};

const createUser = (userData) => {
    return axios.post('http://localhost:8081/api/manage-user/create', { ...userData });
};

export { registerNewUser, LoginUser, fetchAllUsers, deleteUser, fetchRole, createUser };
