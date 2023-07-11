import actionTypes from './actionTypes';
import {
    handleGetAllProducts,
    handleGetAllCodeService,
    handleCreateProductService,
    handleDeleteProductService,
    handleEditProductService,
    handleGetRecommendProducts,
    handleGetProductsByType
} from '../../services/ProductService';
import { Toast, toast } from 'react-toastify';

export const getAllProductStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = [];
            dispatch({ type: actionTypes.GET_ALL_PRODUCT_START })
            if (!id) {
                res = await handleGetAllProducts("ALL");
            } else {
                res = await handleGetAllProducts(id);
            }
            if (res && res.errCode === 0) {
                if (res.data.length > 1) {
                    dispatch(getAllProductSuccess(res.data.reverse()));
                } else {
                    dispatch(getAllProductSuccess(res.data));
                }

            } else {
                dispatch(getAllProductFailed());
            }
        } catch (e) {
            dispatch(getAllProductFailed());
            console.log('getAllProductFailed err: ', e);
        }
    }
}
export const getAllProductSuccess = (data) => ({
    type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
    products: data
})
export const getAllProductFailed = () => ({
    type: actionTypes.GET_ALL_PRODUCT_FAILED
})

export const getTypeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_TYPE_START })
            let res = await handleGetAllCodeService('CATEGORY');
            if (res && res.errCode === 0) {
                dispatch(getTypeSuccess(res.data));
            } else {
                dispatch(getTypeFailed());
            }
        } catch (e) {
            dispatch(getTypeFailed());
            console.log('getTypeFailed err: ', e);
        }
    }
}
export const getTypeSuccess = (data) => ({
    type: actionTypes.GET_TYPE_SUCCESS,
    types: data
})

export const getTypeFailed = () => ({
    type: actionTypes.GET_TYPE_FAILED
})

export const getStatusStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_STATUS_START })
            let res = await handleGetAllCodeService('STATUS');
            if (res && res.errCode === 0) {
                dispatch(getStatusSuccess(res.data));
            } else {
                dispatch(getStatusFailed());
            }
        } catch (e) {
            dispatch(getStatusFailed());
            console.log('getStatusFailed err: ', e);
        }
    }
}
export const getStatusSuccess = (data) => ({
    type: actionTypes.GET_STATUS_SUCCESS,
    statusProduct: data
})
export const getStatusFailed = () => ({
    type: actionTypes.GET_STATUS_FAILED
})

export const createProductStart = (dataInput) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_PRODUCT_START })
            let res = await handleCreateProductService(dataInput);
            if (res && res.message.errCode === 0) {
                toast.success('Created successfully!');
                dispatch(createProductSuccess());
                dispatch(getAllProductStart());
            } else {
                dispatch(createProductFailed());
            }
        } catch (e) {
            dispatch(createProductFailed());
            console.log('createProductFailed err: ', e);
        }
    }
}
export const createProductSuccess = (data) => ({
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
})

export const createProductFailed = () => ({
    type: actionTypes.CREATE_PRODUCT_FAILED
})

export const deleteProductStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_PRODUCT_START });
            let res = await handleDeleteProductService(id);
            if (res && res.errCode === 0) {
                toast.success('Deleted successfully!');
                dispatch(deleteProductSuccess());
                dispatch(getAllProductStart());
            } else {
                dispatch(deleteProductFailed());
            }
        } catch (e) {
            dispatch(deleteProductFailed());
            console.log('deleteProductFailed err: ', e);
        }
    }
}
export const deleteProductSuccess = (data) => ({
    type: actionTypes.DELETE_PRODUCT_SUCCESS,
})

export const deleteProductFailed = () => ({
    type: actionTypes.DELETE_PRODUCT_FAILED
})

export const editProductStart = (product) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_PRODUCT_START });
            let res = await handleEditProductService(product);
            if (res && res.errCode === 0) {
                toast.success('Updated successfully!');
                dispatch(editProductSuccess());
                dispatch(getAllProductStart());
            } else {
                dispatch(editProductFailed());
            }
        } catch (e) {
            dispatch(editProductFailed());
            console.log('editProductFailed err: ', e);
        }
    }
}
export const editProductSuccess = () => ({
    type: actionTypes.EDIT_PRODUCT_SUCCESS,
})

export const editProductFailed = () => ({
    type: actionTypes.EDIT_PRODUCT_FAILED
})

export const getReommendProductStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_RECOMMEND_PRODUCT_START });
            let res = await handleGetRecommendProducts(id);
            if (res && res.errCode === 0) {
                if (res.data.length > 1) {
                    dispatch(getReommendProductSuccess(res.data.reverse()));
                } else {
                    dispatch(getReommendProductSuccess(res.data));
                }

            } else {
                dispatch(getReommendProductFailed());
            }
        } catch (e) {
            dispatch(getReommendProductFailed());
            console.log('getReommendProductFailed err: ', e);
        }
    }
}
export const getReommendProductSuccess = (data) => ({
    type: actionTypes.GET_RECOMMEND_PRODUCT_SUCCESS,
    recommendProduct: data
})
export const getReommendProductFailed = () => ({
    type: actionTypes.GET_RECOMMEND_PRODUCT_FAILED
})

export const getSelfDesignStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_PRODUCT_BY_TYPE_START })
            let res = await handleGetProductsByType("C3");
            if (res && res.errCode === 0) {
                dispatch(getSelfDesignSuccess(res.data.reverse()));
            } else {
                dispatch(getSelfDesignFailed());
            }
        } catch (e) {
            dispatch(getSelfDesignFailed());
            console.log('getSelfDesignFailed err: ', e);
        }
    }
}
export const getSelfDesignSuccess = (data) => ({
    type: actionTypes.GET_PRODUCT_BY_TYPE_SUCCESS,
    productsSelfDesign: data
})
export const getSelfDesignFailed = () => ({
    type: actionTypes.GET_PRODUCT_BY_TYPE_FAILED
})