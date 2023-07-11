import db from "../models/";

let handleCreatePostsServices = (postsInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkPosts = await db.Post.findOne({
                where: { title: postsInput.title }
            })
            if (checkPosts) {
                resolve({
                    errCode: 1,
                    errMessage: `This posts is already exist!`
                })
            } else {
                await db.Post.create({
                    typePosts: postsInput.typePosts,
                    title: postsInput.title,
                    contentHTML: postsInput.contentHTML,
                    contentMarkdown: postsInput.contentMarkdown,
                    imageLink: postsInput.image,
                })
                resolve({
                    errCode: 0,
                    errMessage: `Created successfully!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};

let handleGetPostsServices = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId === 'ALL') {
                let allPosts = await db.Post.findAll();
                resolve({
                    errCode: 0,
                    errMessage: `Get all Posts succeed!`,
                    data: allPosts
                })
            } else {
                let posts = await db.Post.findOne({ where: { id: inputId } });
                if (!posts) {
                    resolve({
                        errCode: 2,
                        errMessage: `This posts isn't exist!`
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: `Get posts successfully!`,
                        data: posts
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
};

let handleDeletePostsServices = (postsId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkPosts = await db.Post.findOne({
                where: { id: postsId },
                raw: false
            });
            if (!checkPosts) {
                resolve({
                    errCode: 2,
                    errMessage: `This Posts isn't exist!`
                });
            } else {
                await checkPosts.destroy();
                resolve({
                    errCode: 0,
                    errMessage: `Deleted successfully!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};

let handleEditPostsServices = (posts) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Post.findOne({
                where: { id: posts.id },
                raw: false
            })
            if (!check) {
                resolve({
                    errCode: 2,
                    errMessage: `This Posts isn't exist!`
                })
            } else {
                check.typePosts = posts.typePosts;
                check.title = posts.title;
                check.contentHTML = posts.contentHTML;
                check.contentMarkdown = posts.contentMarkdown;
                check.imageLink = posts.image;
                await check.save();
                resolve({
                    errCode: 0,
                    errMessage: `Updated successfully!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};

let handleGetDetailPost = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.findOne({
                where: { id: postId }
            })
            if (!post) {
                resolve({
                    errCode: 2,
                    errMessage: `This posts isn't exist!`
                })
            } else {
                resolve({
                    errCode: 0,
                    errMessage: `Get posts succeed!`,
                    data: post
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};

module.exports = {
    handleCreatePostsServices: handleCreatePostsServices,
    handleGetPostsServices: handleGetPostsServices,
    handleDeletePostsServices: handleDeletePostsServices,
    handleEditPostsServices: handleEditPostsServices,
    handleGetDetailPost: handleGetDetailPost
}