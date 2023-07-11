import actionTypes from '../actions/actionTypes';

const initialState = {
    products: [],
    types: [],
    statusProduct: [],
    message: [],
    recommendProduct: [],
    productsSelfDesign: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_PRODUCT_START:
            return {
                ...state,
            }
        case actionTypes.GET_ALL_PRODUCT_SUCCESS:
            state.products = action.products;
            return {
                ...state,

            }
        case actionTypes.GET_ALL_PRODUCT_FAILED:
            state.products = [];

            return {
                ...state,

            }
        case actionTypes.GET_TYPE_START:
            return {
                ...state,

            }
        case actionTypes.GET_TYPE_SUCCESS:
            state.types = action.types;
            return {
                ...state,

            }
        case actionTypes.GET_TYPE_FAILED:
            state.types = [];

            return {
                ...state,

            }
        case actionTypes.GET_STATUS_START:
            return {
                ...state,
            }
        case actionTypes.GET_STATUS_SUCCESS:
            state.statusProduct = action.statusProduct;
            return {
                ...state,
            }
        case actionTypes.GET_STATUS_FAILED:
            state.statusProduct = [];
            return {
                ...state,
            }
        case actionTypes.CREATE_PRODUCT_START:
            return {
                ...state,
            }
        case actionTypes.CREATE_PRODUCT_SUCCESS:
            state.message = action.message;
            return {
                ...state,
            }
        case actionTypes.CREATE_PRODUCT_FAILED:
            state.message = [];
            return {
                ...state,
            }
        case actionTypes.DELETE_PRODUCT_START:
            return {
                ...state,
            }
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            state.message = action.message;
            return {
                ...state,
            }
        case actionTypes.DELETE_PRODUCT_FAILED:
            state.message = [];
            return {
                ...state,
            }
        case actionTypes.EDIT_PRODUCT_START:
            return {
                ...state,
            }
        case actionTypes.EDIT_PRODUCT_SUCCESS:
            state.message = action.message;
            return {
                ...state,
            }
        case actionTypes.EDIT_PRODUCT_FAILED:
            state.message = [];
            return {
                ...state,
            }
        case actionTypes.GET_RECOMMEND_PRODUCT_START:
            return {
                ...state,
            }
        case actionTypes.GET_RECOMMEND_PRODUCT_SUCCESS:
            state.recommendProduct = action.recommendProduct;
            return {
                ...state,

            }
        case actionTypes.GET_RECOMMEND_PRODUCT_FAILED:
            state.recommendProduct = [];

            return {
                ...state,

            }
        case actionTypes.GET_PRODUCT_BY_TYPE_START:
            return {
                ...state,
            }
        case actionTypes.GET_PRODUCT_BY_TYPE_SUCCESS:
            state.productsSelfDesign = action.productsSelfDesign;
            return {
                ...state,

            }
        case actionTypes.GET_PRODUCT_BY_TYPE_FAILED:
            state.productsSelfDesign = [];

            return {
                ...state,

            }
        default:
            return state;
    }
}

export default productReducer;