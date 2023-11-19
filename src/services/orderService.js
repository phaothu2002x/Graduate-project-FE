import axios from '~/setup/axios';

const fetchAllOrder = (currentPage, currentLimit) => {
    return axios.get(`/api/order/read?page=${currentPage}&limit=${currentLimit}`);
};
const createOrder = (orderInfo) => {
    return axios.post(`/api/order/create`, { ...orderInfo });
};
const updateOrderStatus = (orderId, statusValue) => {
    return axios.put(`/api/order/update`, { orderId, statusValue });
};

const deleteOrder = (orderId) => {
    return axios.delete(`/api/order/delete`, { data: { id: orderId } });
};

export { createOrder, fetchAllOrder, updateOrderStatus, deleteOrder };
