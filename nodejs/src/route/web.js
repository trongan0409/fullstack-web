import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import postsController from "../controllers/postsController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/createCRUD', homeController.getFormCreate);

    router.post('/postCRUD', homeController.postCRUD);
    router.get('/readCRUD', homeController.readCRUD);
    router.get('/editCRUD', homeController.getEditForm);
    router.post('/updateCRUD', homeController.updateCRUD);
    router.get('/deleteCRUD', homeController.deleteCRUD);

    //USER
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.getAllUsers);
    router.put('/api/edit-user', userController.editUser);
    router.post('/api/create-user', userController.createUser);
    router.delete('/api/delete-user', userController.deleteUser);

    router.get('/api/all-code', userController.getAllCode);

    //PRODUCT
    router.post('/api/create-product', productController.handleCreateProduct);
    router.get('/api/get-all-product', productController.getAllProduct);
    router.delete('/api/delete-product', productController.deleteProduct);
    router.put('/api/edit-product', productController.editProduct);
    router.get('/api/set-pagination', productController.setPagination);
    router.get('/api/get-recommend-product', productController.getRecommendProduct);
    router.get('/api/get-product-by-type', productController.getProductByType);



    //POSTS
    router.post('/api/create-posts', postsController.createPosts);
    router.get('/api/get-posts', postsController.getPosts);
    router.delete('/api/delete-posts', postsController.deletePosts);
    router.put('/api/edit-posts', postsController.editPosts);
    router.get('/api/get-detail-posts', postsController.getDetailPosts);



    app.use("/", router);
}

module.exports = initWebRoutes;