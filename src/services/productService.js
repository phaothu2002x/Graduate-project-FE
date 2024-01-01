import axios from '~/setup/axios';

const fetchAllManageProduct = (currentPage, currentLimit) => {
    return axios.get(`/api/manage-products/read?page=${currentPage}&limit=${currentLimit}`);
};
const fetchAllProduct = (currentPage, currentLimit) => {
    return axios.get(`/api/products/read?page=${currentPage}&limit=${currentLimit}`);
};

const createNewProduct = (formData, typeSelect) => {
    // for (const [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
    return axios.post(`/api/manage-products/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        params: {
            typeSelect: typeSelect,
        },
    });
};

const findProductByIdinUser = (id) => {
    return axios.get(`/api/product/findProduct/${id}`);
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
const findAllSelectionSidebar = () => {
    return axios.get(`/api/products/findAllSelection`);
};
const findType = (id) => {
    return axios.get(`/api/manage-products/findType/${id}`);
};
const findSuggestion = (CategoryId) => {
    return axios.get(`/api/products/suggestion`, { params: { id: CategoryId } });
};

export {
    fetchAllProduct,
    fetchAllManageProduct,
    deleteProduct,
    createNewProduct,
    updateProduct,
    findProductById,
    findProductByIdinUser,
    findAllSelection,
    findAllSelectionSidebar,
    findType,
    findSuggestion,
};
