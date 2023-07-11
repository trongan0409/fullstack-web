import bcrypt from 'bcryptjs';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

let createCRUD = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hash = bcrypt.hashSync(data.password, salt);
            await db.User.create({
                email: data.email,
                password: hash,
                fullName: data.fullName,
                address: data.address,
                gender: data.gender,
                phoneNumber: data.phoneNumber,
            });
            let allUserData = db.User.findAll();
            resolve(allUserData);
        } catch (e) {
            reject(e);
        }
    });
}

let getData = () => {

    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll();
            resolve(data);
        } catch (e) {
            reject(e);
        }
    })
};

let getDataById = (userId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let dataUser = await db.User.findOne({
                where: { id: userId }
            });
            resolve(dataUser);
        } catch (e) {
            reject(e);
        }
    })
};

let updateData = (dataUser) => {

    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: { id: dataUser.id }
            });
            data.fullName = dataUser.fullName;
            data.address = dataUser.address;
            data.phoneNumber = dataUser.phoneNumber;
            await data.save();
            let allUsersData = await db.User.findAll();
            resolve(allUsersData);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteById = (userId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: { id: userId }
            });
            await data.destroy();
            let allUsers = await db.User.findAll();
            resolve(allUsers);
        } catch (e) {
            reject(e);
        }
    })
};

module.exports = {
    createCRUD: createCRUD,
    getData: getData,
    getDataById: getDataById,
    updateData: updateData,
    deleteById: deleteById
};