const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
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
    console.log(1234);
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


        const newUser = new User ({
            username: req.body.username,
            password: req.body.password
        });
        console.log(newUser);
        newUser.save({}, (err, doc) => {
            console.log(doc);
            console.log(err);

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
        res.json({
            msg: "OK"
        });
    })
}
// ? ---------------------------------< get All User >---------------------------- 
const getAllUser = (req, res) => {
    console.log(1234);
    User.find({}, (err, user) => {
        if (err) {
            return res.redirect(url.format({
                pathname: "/api/auth/registerPage",
                status: 500,
                query: {
                    "msg": "Server Error :("
                }
            }))
        }
        if (!user) {
            return res.redirect(url.format({
                pathname: "/api/auth/registerPage",
                status: 400,
                query: {
                    "msg": 'Username Already Exist :('
                }
            }));
        };


        res.json(user)


    })
}

// ? ---------------------------------< logged In User >---------------------------- 
const loggedInUser = (req, res) => {
    if (!req.body.userName || !req.body.Password) {
        return res.status(400).json({
            msg: "Empty Field :(",
            err: err.msg
        });
    }

    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) return res.status(400).json({
            msg: "server error :("
        });
        if (!user) return res.status(404).json({
            msg: "Not Found :("
        })

        // console.log(bcrypt.compareSync(req.body.Password, user.Password));


        bcrypt.compare(req.body.Password, user.Password, function (err, result) {

            res.redirect('/user/dashboard')
        });

    })
}

// ? ---------------------------------< Update User >---------------------------- 
const UpdateUser = (req, res) => {
console.log(req.body);

    User.findOneAndUpdate({
        username: req.params.username.trim()
    }, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        sex: req.body.sex,
        email: req.body.email,
        phone_number: req.body.phone_number,
        lastUpdate: new Date(),
    }, {
        new: true
    }, (err, userUpdate) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)"
        });
        res.send("OK");
    })
}
// ? ---------------------------------< Update Pass >---------------------------- 
const UpdatePass = (req, res) => {


    User.findOne({
        username: req.params.username.trim()
    }, {}, {
        new: true
    }, (err, user) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)"
        });

        if (!user) {
            return res.status(404).json({
                msg: "Not Found :("
            });
        };

        // ! ------------------------------------- check pass
        bcrypt.compare(req.body.oldPassword, user.password, function (err, isMatch) {

            if (err) {
                return res.redirect(url.format({
                    pathname: "/login",
                    query: {
                        "msg": 'Server Error :('
                    }
                }));
            };

            if (!isMatch) return res.status(400).json({
                msg: "Bad Request :("
            });
            // ! ------------------------------- hash pass
            User.findOneAndUpdate({
                _id: user._id
            }, {
                password: req.body.newPassword
            }, {
                new: true
            }, (err, employee) => {
                if (err) return res.status(500).json({
                    msg: "Server Error :)",
                    err: err.msg
                });
                res.send("OK :)")
            })

        });



    })
}

// ? ---------------------------------< delet User >---------------------------- 
const deletUser = (req, res) => {

    User.findOneAndDelete({
        username: req.params.username.trim()
    }, (err, user) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });

        res.send("ok");
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