import userServices from "../services/userServices";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let userData = await userServices.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        dataUser: userData.user
    });
};

let getAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameters`,
            users: []
        });
    };

    let users = await userServices.handleGetAllUsers(id);

    return res.status(200).json(users);
};

let editUser = async (req, res) => {
    let message = await userServices.handleUpdateUser(req.body);

    return res.status(200).json(message);
};

let createUser = async (req, res) => {
    let message = await userServices.handleCreateUser(req.body);
    return res.status(200).json({ message })
}

let deleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameter`
        });
    };
    let message = await userServices.handleDeleteUser(req.body.id);
    return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
    try {
        let data = await userServices.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log("getAllCode err: ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Err from server"
        })
    }
};

module.exports = {
    handleLogin: handleLogin,
    getAllUsers: getAllUsers,
    editUser: editUser,
    createUser: createUser,
    deleteUser: deleteUser,
    getAllCode: getAllCode,
}