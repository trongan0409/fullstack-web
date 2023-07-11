import axios from '../axios';

const handleGetAllCodeService = async (inputType) => {
    return await axios.get(`/api/all-code?type=${inputType}`);
};

const handleCreatePostsService = async (postsInput) => {
    return await axios.post(`/api/create-posts`, postsInput);
};

const handleGetAllPosts = async (inputId) => {
    return await axios.get(`/api/get-posts?id=${inputId}`);
};

const handleDeletePostsService = async (id) => {
    return await axios.delete(`/api/delete-posts`, {
        data: { id }
    });
};

const handleEditPostsService = async (posts) => {
    return await axios.put(`/api/edit-posts`, posts);
};

const handleGetDetailPost = async (id) => {
    return await axios.get(`/api/get-detail-posts?id=${id}`);
}

export {
    handleGetAllCodeService,
    handleCreatePostsService,
    handleGetAllPosts,
    handleDeletePostsService,
    handleEditPostsService,
    handleGetDetailPost
}

