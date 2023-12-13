import axios from '~/setup/axios';

const fetchAllComments = (productId) => {
    return axios.get(`/api/comments`, { params: { id: productId } });
};

const createNewComment = (commentData) => {
    return axios.post(`/api/comments/create`, { ...commentData });
};
const deleteProductComment = (commentId) => {
    return axios.delete(`/api/comments/delete`, { data: { commentId: commentId } });
};
export { fetchAllComments, createNewComment, deleteProductComment };
