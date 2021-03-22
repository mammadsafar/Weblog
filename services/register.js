const path = require('path');
const User = require(path.join(__dirname, '../models/Users'));
const url = require('url');
const bcrypt = require('bcrypt');
const fieldPattern = [
    "firstName",
    "lastName",
    "userName",
    "Password",
    "birthDay",
    "Gender",
    "email",
    "phoneNumber"
];






module.exports = {
    registerPage,
    addUser,
    getAllUser,
    loggedInUser,
    deletUser,
    UpdateUser,
    UpdatePass,
}

