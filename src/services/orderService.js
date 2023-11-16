import axios from '~/setup/axios';

const fetchAllOrder = () => {
    return axios.get(`/api/order/read`);
};
const createOrder = (orderInfo) => {
    return axios.post(`/api/order/create`, { ...orderInfo });
};
const updateOrderStatus = (orderId, statusValue) => {
    return axios.put(`/api/order/update`, { orderId, statusValue });
};

export { createOrder, fetchAllOrder, updateOrderStatus };
