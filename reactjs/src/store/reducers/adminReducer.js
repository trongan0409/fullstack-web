import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    isLoadingGender: false,
    users: []
}

const admninReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;

            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];

            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;

            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];

            return {
                ...state,

            }
        case actionTypes.GET_ALL_USER_SUCCESS:
            state.users = action.users;

            return {
                ...state,

            }
        case actionTypes.GET_ALL_USER_FAILED:
            state.users = [];

            return {
                ...state,

            }
        default:
            return state;
    }
}

export default admninReducer;