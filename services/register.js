const path = require('path');
const User = require(path.join(__dirname, '../models/Users'));
const url = require('url');
const bcrypt = require('bcrypt');
const fieldPattern = [
    "firstname",
    "lastname",
    "username",
    "password",
    "sex",
    "email",
    "phone_number",
    "createAt",
    "lastUpdate",
    "role",
    "profile_pic"
];

const registerPage = (req, res) => {
    res.render('auth/register');
};
// ? ---------------------------------< create new user >---------------------------- 

const createUser = (req, res) => {

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            msg: 'Empty Field :('
        })
    }

    User.findOne({
        username: req.body.username.trim()
    }, (err, user) => {
        if (err) {
            return res.status(500).json({
                msg: "Server Error :(",
                err: err.msg
            });
        }
        if (user) {
            return res.status(400).json({
                msg: "Username Already Exist :("
            });
        }


        new User = {
            username: req.body.username,
            password: req.body.password
        }.save({}, (err, doc) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(400).send("Duplicate item!")
                }
                if (
                    err.message.includes('username') ||
                    err.message.includes('required')
                ) {
                    return res.status(400).send(err.message);
                }

            }
        })

    })
}




module.exports = {
    registerPage,
    createUser,
    getAllUser,
    loggedInUser,
    deletUser,
    UpdateUser,
    UpdatePass,
}