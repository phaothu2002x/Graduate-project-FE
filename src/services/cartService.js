import axios from '~/setup/axios';

const addProductToCart = (productId, quantity, price) => {
    return axios.post(`/api/cart/create`, { productId, quantity, price });
};
const updateCart = (itemId, quantity, totalPrice) => {
    return axios.put(`/api/cart/update`, { itemId, quantity, totalPrice });
};

const fetchItemInCart = () => {
    return axios.get(`/api/cart/read`);
};

const deleteItemInCart = (itemId) => {
    return axios.delete(`/api/cart/delete`, { data: { id: itemId } });
};

export { addProductToCart, fetchItemInCart, deleteItemInCart, updateCart };
