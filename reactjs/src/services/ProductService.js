import axios from '../axios';

const handleGetAllProducts = async (inputId) => {
    return await axios.get(`/api/get-all-product?id=${inputId}`);
};

const handleGetAllCodeService = async (inputType) => {
    return await axios.get(`/api/all-code?type=${inputType}`);
}

const handleCreateProductService = async (inputData) => {
    return await axios.post(`/api/create-product`, inputData);
};

const handleDeleteProductService = async (id) => {
    return await axios.delete(`/api/delete-product`, {
        data: { id }
    });
}

const handleEditProductService = async (product) => {
    return await axios.put(`/api/edit-product`, product);
};

const handleGetRecommendProducts = async (id) => {
    return await axios.get(`/api/get-recommend-product?id=${id}`);
};

const handleGetProductsByType = async (type) => {
    return await axios.get(`/api/get-product-by-type?type=${type}`);
};


export {
    handleGetAllProducts,
    handleGetAllCodeService,
    handleCreateProductService,
    handleDeleteProductService,
    handleEditProductService,
    handleGetRecommendProducts,
    handleGetProductsByType
}

