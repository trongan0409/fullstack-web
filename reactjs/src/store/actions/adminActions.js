import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, handleGetAllUsers, deleteUserService, editUserService } from '../../services/userService';
import { Toast, toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderData err: ', e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleData err: ', e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.message.errCode === 0) {
                toast.success('Created succeed!');
                dispatch(createUserSuccess());
                dispatch(getAllUserStart());
            } else {
                dispatch(createUserFailed());
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.log('createUserFailed err: ', e);
        }
    }
}

export const createUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
})

export const createUserFailed = () => ({
    type: 'CREATE_USER_FAILED'
})

export const getAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(getAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(getAllUserFailed());
            }
        } catch (e) {
            dispatch(getAllUserFailed());
            console.log('getAllUserFailed err: ', e);
        }
    }
}

export const getAllUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    users: data
})

export const getAllUserFailed = () => ({
    type: actionTypes.GET_ALL_USER_FAILED
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Deleted succeed!');
                dispatch(deleteUserSuccess());
                dispatch(getAllUserStart());
            } else {
                dispatch(deleteUserFailed());
                toast.success('Deleted error!');
            }
        } catch (e) {
            toast.success('Deleted error!');
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed err: ', e);
        }
    }
}

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    users: data
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (userInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userInput);
            if (res && res.errCode === 0) {
                toast.success('Updated succeed!');
                dispatch(editUserSuccess());
                dispatch(getAllUserStart());
            } else {
                dispatch(editUserFailed());
                toast.success('Updated error!');
            }
        } catch (e) {
            toast.success('Updated error!');
            dispatch(editUserFailed());
            console.log('editUser err: ', e);
        }
    }
}

export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    users: data
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})


