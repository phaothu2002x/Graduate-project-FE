import axios from '~/setup/axios';

const fetchAllManageProduct = (currentPage, currentLimit) => {
    return axios.get(`/api/manage-products/read?page=${currentPage}&limit=${currentLimit}`);
};
const fetchAllProduct = (currentPage, currentLimit) => {
    return axios.get(`/api/products/read?page=${currentPage}&limit=${currentLimit}`);
};

const createNewProduct = (formData) => {
    return axios.post(`/api/manage-products/create`, formData);
};
// find product before update
const findProductById = (id) => {
    return axios.get(`/api/manage-products/findProduct/${id}`);
};
const updateProduct = (productData) => {
    return axios.put(`/api/manage-products/update`, { ...productData });
};

const deleteProduct = (product) => {
    return axios.delete(`/api/manage-products/delete`, { data: { id: product.id } });
};

const findAllSelection = () => {
    return axios.get(`/api/manage-products/findAllSelection`);
};
const findType = (id) => {
    return axios.get(`/api/manage-products/findType/${id}`);
};

export {
    fetchAllProduct,
    fetchAllManageProduct,
    deleteProduct,
    createNewProduct,
    updateProduct,
    findProductById,
    findAllSelection,
    findType,
};
