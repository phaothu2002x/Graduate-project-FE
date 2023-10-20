import axios from 'axios';

const registerNewUser = (email, phone, username, password, confirmPass) => {
    return axios.post('http://localhost:8081/api/register', { email, phone, username, password, confirmPass });
};

const LoginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8081/api/login', { valueLogin, password });
};

export { registerNewUser, LoginUser };
