import axios from '~/setup/axios';

const fetchAllProduct = () => {
    return axios.get(`/api/manage-products/read`);
};

export { fetchAllProduct };
