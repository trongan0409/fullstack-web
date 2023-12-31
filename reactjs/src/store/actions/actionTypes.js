const actionTypes = Object.freeze({
    //app

    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user

    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //Admin

    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    CREATE_USER_START: 'CREATE_USER_START',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    EDIT_USER_START: 'EDIT_USER_START',
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',


    DELETE_USER_START: 'DELETE_USER_START',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    GET_ALL_USER_START: 'GET_ALL_USER_START',
    GET_ALL_USER_SUCCESS: 'GET_ALL_USER_SUCCESS',
    GET_ALL_USER_FAILED: 'GET_ALL_USER_FAILED',

    //PRODUCT

    GET_ALL_PRODUCT_START: 'GET_ALL_PRODUCT_START',
    GET_ALL_PRODUCT_SUCCESS: 'GET_ALL_PRODUCT_SUCCESS',
    GET_ALL_PRODUCT_FAILED: 'GET_ALL_PRODUCT_FAILED',

    GET_TYPE_START: 'GET_TYPE_START',
    GET_TYPE_SUCCESS: 'GET_TYPE_SUCCESS',
    GET_TYPE_FAILED: 'GET_TYPE_FAILED',

    GET_STATUS_START: 'GET_STATUS_START',
    GET_STATUS_SUCCESS: 'GET_STATUS_SUCCESS',
    GET_STATUS_FAILED: 'GET_STATUS_FAILED',

    CREATE_PRODUCT_START: 'CREATE_PRODUCT_START',
    CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',
    CREATE_PRODUCT_FAILED: 'CREATE_PRODUCT_FAILED',

    DELETE_PRODUCT_START: 'DELETE_PRODUCT_START',
    DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
    DELETE_PRODUCT_FAILED: 'DELETE_PRODUCT_FAILED',

    EDIT_PRODUCT_START: 'EDIT_PRODUCT_START',
    EDIT_PRODUCT_SUCCESS: 'EDIT_PRODUCT_SUCCESS',
    EDIT_PRODUCT_FAILED: 'DELETE_PRODUCT_FAILED',

    GET_RECOMMEND_PRODUCT_START: 'GET_RECOMMEND_PRODUCT_START',
    GET_RECOMMEND_PRODUCT_SUCCESS: 'GET_RECOMMEND_PRODUCT_SUCCESS',
    GET_RECOMMEND_PRODUCT_FAILED: 'GET_RECOMMEND_PRODUCT_FAILED',

    GET_PRODUCT_BY_TYPE_START: 'GET_PRODUCT_BY_TYPE_START',
    GET_PRODUCT_BY_TYPE_SUCCESS: 'GET_PRODUCT_BY_TYPE_SUCCESS',
    GET_PRODUCT_BY_TYPE_FAILED: 'GET_PRODUCT_BY_TYPE_FAILED',

    //POSTS

    GET_POSTS_TYPE_START: 'GET_POSTS_TYPE_START',
    GET_POSTS_TYPE_SUCCESS: 'GET_POSTS_TYPE_SUCCESS',
    GET_POSTS_TYPE_FAILED: 'GET_POSTS_TYPE_FAILED',

    CREATE_POSTS_START: 'CREATE_POSTS_START',
    CREATE_POSTS_SUCCESS: 'CREATE_POSTS_SUCCESS',
    CREATE_POSTS_FAILED: 'CREATE_POSTS_FAILED',

    GET_ALL_POSTS_START: 'GET_ALL_POSTS_START',
    GET_ALL_POSTS_SUCCESS: 'GET_ALL_POSTS_SUCCESS',
    GET_ALL_POSTS_FAILED: 'GET_ALL_POSTS_FAILED',

    DELETE_POSTS_START: 'DELETE_POSTS_START',
    DELETE_POSTS_SUCCESS: 'DELETE_POSTS_SUCCESS',
    DELETE_POSTS_FAILED: 'DELETE_POSTS_FAILED',

    EDIT_POSTS_START: 'EDIT_POSTS_START',
    EDIT_POSTS_SUCCESS: 'EDIT_POSTS_SUCCESS',
    EDIT_POSTS_FAILED: 'EDIT_POSTS_FAILED',

    GET_DETAIL_POSTS_START: 'GET_DETAIL_POSTS_START',
    GET_DETAIL_POSTS_SUCCESS: 'GET_DETAIL_POSTS_SUCCESS',
    GET_DETAIL_POSTS_FAILED: 'GET_DETAIL_POSTS_FAILED',
})

export default actionTypes;