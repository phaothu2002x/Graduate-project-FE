import axios from '~/setup/axios';

const addProductToCart = (productId, quantity) => {
    return axios.post(`/api/cart/create`, { productId, quantity });
};

const fetchItemInCart = () => {
    return axios.get(`/api/cart/read`);
};

export { addProductToCart, fetchItemInCart };
