import axios from '~/setup/axios';

const fetchProducts = (data) => {
    return axios.get(`/api/products/search`, { params: data });
};

const fetchFilter = (data) => {
    return axios.get(`/api/products/filter`, { params: data });
};

export { fetchProducts, fetchFilter };
