const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
const bcrypt = require('bcrypt');





const showDashboard = (req, res) => {
console.log("hasan kachal-----------");
    res.render('Dashboard');

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
                    "msg": 'Any User Not Exist :('
                }
            }));
        };


        res.json(user)


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
        username: req.body.username.trim(),
        sex: req.body.sex,
        email: req.body.email,
        phone_number: req.body.phone_number,
        lastUpdate: new Date(),
    }, {
        new: true
    }, (err, userUpdate) => {
        console.log(err);
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
    showDashboard,
    getAllUser,
    deletUser,
    UpdateUser,
    UpdatePass,
}