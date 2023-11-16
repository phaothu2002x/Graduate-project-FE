import axios from '~/setup/axios';

const createOrder = (orderInfo) => {
    return axios.post(`/api/order/create`, { ...orderInfo });
};

export { createOrder };
