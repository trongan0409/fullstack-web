import actionTypes from '../actions/actionTypes';

const initialState = {
    types: [],
    message: [],
    allPosts: [],
    detailPosts: ''
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_POSTS_START:
            return {
                ...state,
            }
        case actionTypes.GET_ALL_POSTS_SUCCESS:
            state.allPosts = action.allPosts;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_POSTS_FAILED:
            state.allPosts = [];

            return {
                ...state,

            }
        case actionTypes.GET_POSTS_TYPE_START:
            return {
                ...state,
            }
        case actionTypes.GET_POSTS_TYPE_SUCCESS:
            state.types = action.types;
            return {
                ...state,
            }
        case actionTypes.GET_POSTS_TYPE_FAILED:
            state.types = [];
            return {
                ...state,
            }
        case actionTypes.CREATE_POSTS_START:
            return {
                ...state,
            }
        case actionTypes.CREATE_POSTS_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.CREATE_POSTS_FAILED:
            return {
                ...state,
            }
        case actionTypes.DELETE_POSTS_START:
            return {
                ...state,
            }
        case actionTypes.DELETE_POSTS_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.DELETE_POSTS_FAILED:
            return {
                ...state,
            }
        case actionTypes.EDIT_POSTS_START:
            return {
                ...state,
            }
        case actionTypes.EDIT_POSTS_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.EDIT_POSTS_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_POSTS_START:
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_POSTS_SUCCESS:
            state.detailPosts = action.detailPosts
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_POSTS_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default postsReducer;