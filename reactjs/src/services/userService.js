//import axios from 'axios';
import axios from '../axios';

const handleLoginApi = async (emailInput, passwordInput) => {
    return await axios.post('/api/login', {
        email: emailInput,
        password: passwordInput
    });
};

const handleGetAllUsers = async (inputId) => {
    return await axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = async (data) => {
    return await axios.post('/api/create-user', data)
};

const deleteUserService = async (userId) => {
    return await axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
};

const editUserService = async (userInput) => {
    return axios.put('/api/edit-user', userInput);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/all-code?type=${inputType}`);
};

export { handleLoginApi, handleGetAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService }

