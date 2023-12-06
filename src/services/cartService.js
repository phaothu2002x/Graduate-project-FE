import axios from '~/setup/axios';

const fetchItemInCart = () => {
    return axios.get(`/api/cart/read`);
};
const addProductToCart = (productId, quantity, price) => {
    return axios.post(`/api/cart/create`, { productId, quantity, price });
};
const updateCart = (itemId, quantity, totalPrice) => {
    return axios.put(`/api/cart/update`, { itemId, quantity, totalPrice });
};

const deleteItemInCart = (itemId) => {
    return axios.delete(`/api/cart/delete`, { data: { id: itemId } });
};

const fetchPaymentMethod = (id) => {
    return axios.get(`/api/cart/payment/${id}`);
};

const clearCart = () => {
    return axios.delete(`/api/cart/clear`);
};
export { addProductToCart, fetchItemInCart, deleteItemInCart, updateCart, fetchPaymentMethod, clearCart };
