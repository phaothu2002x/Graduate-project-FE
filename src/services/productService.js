import axios from '~/setup/axios';

const fetchAllProduct = (currentPage, currentLimit) => {
    return axios.get(`/api/manage-products/read?page=${currentPage}&limit=${currentLimit}`);
};

const createNewProduct = (productData) => {
    return axios.post(`/api/manage-products/create`, { ...productData });
};
// find product before update
const findProductById = (id) => {
    return axios.get(`/api/manage-products/findProduct/${id}`);
};
const updateProduct = (id) => {
    return axios.put(`/api/manage-products/update/${id}/item`);
};

const deleteProduct = (product) => {
    return axios.delete(`/api/manage-products/delete`, { data: { id: product.id } });
};

const findAllSelection = () => {
    return axios.get(`/api/manage-products/findAllSelection`);
};

export { fetchAllProduct, deleteProduct, createNewProduct, updateProduct, findProductById, findAllSelection };
