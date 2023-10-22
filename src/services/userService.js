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

export { registerNewUser, LoginUser, fetchAllUsers };
