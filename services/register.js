const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
const url = require('url');

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
    console.log(1234);
    res.render('auth/register');
};
// ? ---------------------------------< create new user >---------------------------- 

const createUser = (req, res) => {

    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({
            msg: 'Empty Field :('
        })
    }

    User.findOne({
        $or: [{
                username: req.body.username.trim()
            },
            {
                email: req.body.email.trim()
            }
        ]
    }, (err, user) => {
        if (err) {
            return res.status(500).json({
                msg: "Server Error :(",
                err: err.msg
            });
        }
        if (user) {
            return res.status(400).json({
                msg: "User Already Exist :("
            });
        }


        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        console.log(newUser);
        newUser.save({}, (err, doc) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(400).send("Duplicate item!")
                }
                if (
                    err.message.includes('username') ||
                    err.message.includes('required')
                ) {
                    return res.status(400).send("Server Error :(");
                }

            }
        })
        res.json({
            msg: "OK"
        });
    })
}


module.exports = {
    registerPage,
    createUser,

}