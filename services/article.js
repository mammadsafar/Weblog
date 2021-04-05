const path = require('path');
const fs = require('fs');
const User = require(path.join(__dirname, '../models/User'));
const bcrypt = require('bcrypt');
const generalTools = require('../tools/general-tools');
const multer = require('multer');




const newArticle = (req, res) => {
    console.log("article/newArticle -----------");
    res.render('article/newArticle');

}

// ? ---------------------------------< article profile >---------------------------- 
const articleprofile = (req, res) => {

    const upload = generalTools.uploadArticleProfile.single('avatar');
    console.log(1);


    upload(req, res, function (err) {


        if (err instanceof multer.MulterError) {
            res.status(500).send('Server Error :/')

        } else if (err) {

            res.status(400).send("Bad Request!")

        } else {

            User.findByIdAndUpdate(
                req.session.user._id, {
                    avatar: `/images/avatars/${req.file.filename}`
                }, {
                    new: true
                }, (err, user) => {
                    if (err) {
                        console.log("============>   ", 4);
                        res.status(500).json({
                            msg: 'Server Error!'
                        })
                    } else {
                        console.log(user);
                        if (req.session.user.avatar && req.session.user.avatar !== '/images/avatars/default.png') {

                            fs.unlink(path.join(__dirname, '../public', req.session.user.avatar), err => {
                                if (err) {
                                    console.log(400);
                                    res.status(500).json({
                                        msg: 'Server Error!'
                                    })
                                } else {
                                    req.session.user = user;

                                    res.redirect('/dashboard');
                                }
                            })


                        } else {

                            req.session.user = user;

                            res.redirect('/dashboard');
                        }
                    }
                })
        }
    })
}


// ? ---------------------------------< article Images >---------------------------- 
const articleImage = (req, res) => {

    const upload = generalTools.uploadArticleImages.single('upload');
    console.log(1);


    upload(req, res, function (err) {

        console.log(req.file);

        if (err instanceof multer.MulterError) {
            res.status(500).send('Server Error :/')

        } else if (err) {

            res.status(400).send("Bad Request!")

        } else {
            let path = req.file.destination.split("public");
            res.json({
                uploaded: 1,
                url: `${path[1]}/${req.file.filename}`
            })
        }
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
    newArticle,
    articleprofile,
    articleImage,
    // UpdateUser,
    // UpdatePass,
    // UpdateUserAvatar,
    // uploadBackgrondAvatar,
}