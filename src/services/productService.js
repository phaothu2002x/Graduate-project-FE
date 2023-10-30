import axios from '~/setup/axios';

const fetchAllProduct = (currentPage, currentLimit) => {
    return axios.get(`/api/manage-products/read?page=${currentPage}&limit=${currentLimit}`);
};

const createNewProduct = (productData) => {
    return axios.post(`/api/manage-products/create`, { ...productData });
};

const deleteProduct = (product) => {
    return axios.delete(`/api/manage-products/delete`, { data: { id: product.id } });
};

export { fetchAllProduct, deleteProduct, createNewProduct };
