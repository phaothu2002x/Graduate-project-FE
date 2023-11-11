import axios from '~/setup/axios';

const addProductToCart = (productId, quantity) => {
    return axios.post(`/api/cart/create`, { productId, quantity });
};
const updateCart = (itemId, quantity) => {
    return axios.put(`/api/cart/update`, { itemId, quantity });
};

const fetchItemInCart = () => {
    return axios.get(`/api/cart/read`);
};

const deleteItemInCart = (itemId) => {
    return axios.delete(`/api/cart/delete`, { data: { id: itemId } });
};

export { addProductToCart, fetchItemInCart, deleteItemInCart, updateCart };
