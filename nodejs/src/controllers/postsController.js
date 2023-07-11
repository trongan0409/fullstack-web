import postsServices from "../services/postsServices";

let createPosts = async (req, res) => {
    let message = await postsServices.handleCreatePostsServices(req.body);
    return res.status(200).json(message);
};

let getPosts = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameter!`
        })
    }
    let message = await postsServices.handleGetPostsServices(req.query.id);
    return res.status(200).json(message);
};

let deletePosts = async (req, res) => {
    console.log('check req: ', req.body.id);
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameter!`
        })
    }
    let mess = await postsServices.handleDeletePostsServices(req.body.id);
    return res.status(200).json(mess);
};

let editPosts = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameter!`
        });
    } else {
        let mess = await postsServices.handleEditPostsServices(req.body);
        return res.status(200).json(mess);
    }
};

let getDetailPosts = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missring required parameter!`
        })
    }
    let data = await postsServices.handleGetDetailPost(req.query.id);
    return res.status(200).json(data);
};

module.exports = {
    createPosts: createPosts,
    getPosts: getPosts,
    deletePosts: deletePosts,
    editPosts: editPosts,
    getDetailPosts: getDetailPosts
}
