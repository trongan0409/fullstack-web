import actionTypes from './actionTypes';
import {
    handleGetAllPosts,
    handleGetAllCodeService,
    handleCreatePostsService,
    handleDeletePostsService,
    handleEditPostsService,
    handleGetDetailPost
} from '../../services/PostsService';
import { Toast, toast } from 'react-toastify';

export const getAllPostsStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = [];
            dispatch({ type: actionTypes.GET_ALL_POSTS_START })
            if (!id) {
                res = await handleGetAllPosts("ALL");
            } else {
                res = await handleGetAllPosts(id);
            }
            if (res && res.errCode === 0) {
                if (res.data.length > 1) {
                    dispatch(getAllPostsSuccess(res.data.reverse()));
                } else {
                    dispatch(getAllPostsSuccess(res.data));
                }

            } else {
                dispatch(getAllPostsFailed());
            }
        } catch (e) {
            dispatch(getAllPostsFailed());
            console.log('getAllPostsFailed err: ', e);
        }
    }
}
export const getAllPostsSuccess = (data) => ({
    type: actionTypes.GET_ALL_POSTS_SUCCESS,
    allPosts: data
})
export const getAllPostsFailed = () => ({
    type: actionTypes.GET_ALL_POSTS_FAILED
})

export const getPostsTypeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_POSTS_TYPE_START })
            let res = await handleGetAllCodeService('POSTSTYPE');
            if (res && res.errCode === 0) {
                dispatch(getPostsTypeSuccess(res.data));
            } else {
                dispatch(getPostsTypeFailed());
            }
        } catch (e) {
            dispatch(getPostsTypeFailed());
            console.log('getPostsTypeFailed err: ', e);
        }
    }
}
export const getPostsTypeSuccess = (data) => ({
    type: actionTypes.GET_POSTS_TYPE_SUCCESS,
    types: data
})

export const getPostsTypeFailed = () => ({
    type: actionTypes.GET_POSTS_TYPE_FAILED
})

export const createPostsStart = (postsInput) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_POSTS_START })
            let res = await handleCreatePostsService(postsInput);
            if (res && res.errCode === 0) {
                toast.success('Created successfully!');
                dispatch(createPostsSuccess());
                dispatch(getAllPostsStart());
            } else {
                dispatch(createPostsFailed());
            }
        } catch (e) {
            dispatch(createPostsFailed());
            console.log('createPostsFailed err: ', e);
        }
    }
}
export const createPostsSuccess = () => ({
    type: actionTypes.CREATE_POSTS_SUCCESS,
})

export const createPostsFailed = () => ({
    type: actionTypes.CREATE_POSTS_FAILED
})

export const deletePostsStart = (postsId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_POSTS_START });
            let res = await handleDeletePostsService(postsId);
            if (res && res.errCode === 0) {
                toast.success('Deleted successfully!');
                dispatch(deletePostsSuccess());
                dispatch(getAllPostsStart());
            } else {
                dispatch(deletePostsFailed());
            }
        } catch (e) {
            dispatch(deletePostsFailed());
            console.log('deletePostsFailed err: ', e);
        }
    }
}
export const deletePostsSuccess = () => ({
    type: actionTypes.DELETE_POSTS_SUCCESS,
})

export const deletePostsFailed = () => ({
    type: actionTypes.DELETE_POSTS_FAILED
})

export const editPostsStart = (posts) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_POSTS_START });
            let res = await handleEditPostsService(posts);
            if (res && res.errCode === 0) {
                toast.success('Updated successfully!');
                dispatch(editPostsSuccess());
                dispatch(getAllPostsStart());
            } else {
                dispatch(editPostsFailed());
            }
        } catch (e) {
            dispatch(editPostsFailed());
            console.log('editPostsFailed err: ', e);
        }
    }
}
export const editPostsSuccess = () => ({
    type: actionTypes.EDIT_POSTS_SUCCESS,
})

export const editPostsFailed = () => ({
    type: actionTypes.EDIT_POSTS_FAILED
})

export const getDetailPostsStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DETAIL_POSTS_START })
            let res = await handleGetDetailPost(id);
            if (res && res.errCode === 0) {
                dispatch(getDetailPostsSuccess(res.data))
            }
        } catch (e) {
            dispatch(getDetailPostsFailed());
            console.log('getDetailPostsFailed err: ', e);
        }
    }
}
export const getDetailPostsSuccess = (data) => ({
    type: actionTypes.GET_DETAIL_POSTS_SUCCESS,
    detailPosts: data
})
export const getDetailPostsFailed = () => ({
    type: actionTypes.GET_DETAIL_POSTS_FAILED
})