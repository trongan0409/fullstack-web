import db from '../models/index';
import CRUDservices from '../services/CRUDservices';

let getHomePage = (req, res) => {
    return res.render('homePage');
};

let getFormCreate = (req, res) => {
    return res.render('test/createCRUD');
};
let getFormCreateProduct = (req, res) => {
    return res.render('test/createProduct');
};

let postCRUD = async (req, res) => {
    let data = req.body;
    let dataUser = await CRUDservices.createCRUD(data);
    return res.render('test/readCRUD', {
        dataTB: dataUser
    });
};

let readCRUD = async (req, res) => {
    let dataTB = await CRUDservices.getData();
    return res.render('test/readCRUD', { dataTB });
};

let getEditForm = async (req, res) => {
    let userId = req.query.id;
    let userData = await CRUDservices.getDataById(userId);
    return res.render('test/editCRUD', { userData });
};

let updateCRUD = async (req, res) => {
    let dataUser = req.body;
    let allUsers = await CRUDservices.updateData(dataUser);
    return res.render('test/readCRUD', {
        dataTB: allUsers
    });
};

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    let allUser = await CRUDservices.deleteById(userId);
    return res.render('test/readCRUD', {
        dataTB: allUser
    })
};

module.exports = {
    getHomePage: getHomePage,
    getFormCreate: getFormCreate,
    postCRUD: postCRUD,
    readCRUD: readCRUD,
    getEditForm: getEditForm,
    updateCRUD: updateCRUD,
    deleteCRUD: deleteCRUD
};