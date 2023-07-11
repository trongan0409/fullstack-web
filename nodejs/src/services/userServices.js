import { promise } from "bcrypt/promises";
import db from "../models";
import bcrypt from "bcryptjs";

let handleUserLogin = (userEmail, userPassword) => {

    return new Promise(async (resolve, reject) => {
        try {
            let notif = {};
            if (!userEmail || !userPassword) {
                notif.errCode = 1,
                    notif.errMessage = 'Missing parameter!',
                    resolve(notif)
            } else {
                let checkUser = await db.User.findOne({
                    where: { email: userEmail },
                    raw: true,
                    attributes: ['email', 'password', 'roleId', 'fullName']
                });
                if (checkUser) {
                    let comparePwd = bcrypt.compareSync(userPassword, checkUser.password);
                    if (comparePwd) {
                        notif.errCode = 0;
                        notif.errMessage = 'Login successed!';
                        delete checkUser.password;
                        notif.user = checkUser;
                        resolve(notif)
                    } else {
                        notif.errCode = 2;
                        notif.errMessage = 'Email or Password is incorrect. Please try again!';
                        resolve(notif)
                    }
                } else {
                    notif.errCode = 3;
                    notif.errMessage = 'Email or Password is incorrect. Please try again!';
                    resolve(notif)
                }
            }

        } catch (e) {
            reject(e)
        }
    })
};

let handleGetAllUsers = () => {

    return new Promise(async (resolve, reject) => {
        try {
            let usersData = await db.User.findAll();
            resolve({
                errCode: 0,
                errMessage: `Get users' data succeeds`,
                users: usersData
            });
        } catch (e) {
            reject(e);
        }
    })
};

let handleCreateUser = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.User.findOne({
                where: { email: dataInput.email }
            });
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'This email was used. Please try another email!'
                })
            } else {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(dataInput.password, salt);
                await db.User.create({
                    email: dataInput.email,
                    password: hash,
                    fullName: dataInput.fullName,
                    address: dataInput.address,
                    gender: dataInput.gender,
                    phoneNumber: dataInput.phoneNumber,
                    roleId: dataInput.roleId,
                    image: dataInput.avatar

                });
                resolve({
                    errCode: 0,
                    errMessage: 'Created successfully!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let handleDeleteUser = (userId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let foundUser = await db.User.findOne({
                where: { id: userId },
                raw: false
            });
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                });
            };
            await foundUser.destroy();
            resolve({
                errCode: 0,
                errMessage: `Deleted successfully!`
            });
        } catch (e) {
            reject(e);
        };
    })
};

let handleUpdateUser = (userData) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!userData.id || !userData.gender || !userData.roleId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters`
                });
            };
            let foundUser = await db.User.findOne({
                where: { id: userData.id },
                raw: false
            });
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: `User's not found!`
                });
            };
            foundUser.fullName = userData.fullName;
            foundUser.address = userData.address;
            foundUser.gender = userData.gender;
            foundUser.phoneNumber = userData.phoneNumber;
            foundUser.roleId = userData.roleId;

            await foundUser.save();

            resolve({
                errCode: 0,
                errMessage: `Updated successfully!`
            })
        } catch (e) {
            reject(e);
        }
    })
};

let getAllCodeService = (typeInput) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing required parameters!`
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser,
    getAllCodeService: getAllCodeService,
}