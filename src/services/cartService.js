import axios from '~/setup/axios';

const addProductToCart = (productId, quantity) => {
    return axios.post(`/api/cart/create/`, { productId, quantity });
};

const fetchAllProduct = () => {
    return axios.get(`/api/cart/read`);
};

export { addProductToCart, fetchAllProduct };
