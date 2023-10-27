import axios from '~/setup/axios';

const fetchAllProduct = () => {
    return axios.get(`/api/manage-products/read`);
};

const deleteProduct = (product) => {
    return axios.delete(`/api/manage-products/delete`, { data: { id: product.id } });
};

export { fetchAllProduct, deleteProduct };
