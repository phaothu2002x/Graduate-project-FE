import axios from 'axios';

const registerNewUser = (email, phone, username, password, confirmPass) => {
    return axios.post('http://localhost:8081/api/register', { email, phone, username, password, confirmPass });
};

export { registerNewUser };
