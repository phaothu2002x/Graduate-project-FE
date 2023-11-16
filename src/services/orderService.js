import axios from '~/setup/axios';

const fetchAllOrder = () => {
    return axios.get(`/api/order/read`);
};
const createOrder = (orderInfo) => {
    return axios.post(`/api/order/create`, { ...orderInfo });
};

export { createOrder, fetchAllOrder };
