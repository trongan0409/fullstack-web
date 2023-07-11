import productServices from "../services/productServices";

let handleCreateProduct = async (req, res) => {
    let message = await productServices.handleCreateServices(req.body);
    return res.status(200).json({ message })
};

let getAllProduct = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameters`,
            users: []
        });
    };

    let products = await productServices.handleGetAllProducts(req.query.id);

    return res.status(200).json(products);
};

let deleteProduct = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameter`
        })
    }
    let message = await productServices.handleDeleteProduct(req.body.id);
    return res.status(200).json(message);
};

let editProduct = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missring required parameter!`
        });
    }
    let message = await productServices.handleEditUser(req.body);
    return res.status(200).json(message);
};

let setPagination = async (req, res) => {
    let { page, size } = req.query;
    if (!page || !size) {
        page = 0;
        size = 0;
    }
    let option = {
        limit: +size,
        offset: (+page) * (+size)
    }
    return res.status(200).json({ page, size, option });
}

let getRecommendProduct = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameter!`
        })
    }
    let product = await productServices.handleGetAllProducts(req.query.id);
    let data = await productServices.handleGetRecommendProduct(product.data);
    return res.status(200).json(data);
};

let getProductByType = async (req, res) => {
    if (!req.query.type) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameters`,
            products: []
        });
    };

    let products = await productServices.handleGetProductByType(req.query);

    return res.status(200).json(products);
};

module.exports = {
    handleCreateProduct: handleCreateProduct,
    getAllProduct: getAllProduct,
    deleteProduct: deleteProduct,
    editProduct: editProduct,
    setPagination: setPagination,
    getRecommendProduct: getRecommendProduct,
    getProductByType: getProductByType
}