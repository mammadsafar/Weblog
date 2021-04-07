const path = require('path');
const fs = require('fs');
// const User = require(path.join(__dirname, '../models/User'));
const Article = require(path.join(__dirname, '../models/article'));
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
            console.log(req.file);
            console.log(req.session);
            if (req.session.article === undefined) {

                let path = req.file.destination.split("public");
                req.session.article = {
                    profile: `${path[1]}/${req.file.filename}`
                };

                // res.redirect('/dashboard');
            } else {

                fs.unlink(path.join(__dirname, '../public', req.session.article.profile), err => {
                    if (err) {
                        console.log(400);
                        res.status(500).json({
                            msg: 'Server Error!'
                        })
                    } else {
                        let path = req.file.destination.split("public");
                        req.session.article.profile = `${path[1]}/${req.file.filename}`;

                        // res.redirect('/dashboard');
                    }
                })

            }
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

// ? ---------------------------------< add New Article >---------------------------- 
const addNewArticle = (req, res) => {
    console.log(1234);

    // const upload = generalTools.uploadArticleImages.single('upload');
    // console.log(1);
    if (req.session.article === undefined) {
        req.session.article = {
            profile: '/articles/images/profiles/default.jpg'
        };
    }

    const newArticle = new Article({
        title: req.body.title,
        owner: req.session.user._id,
        profile: req.session.article.profile,

    });
    console.log(newArticle);
    newArticle.save({}, (err, doc) => {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                return res.status(400).send("Duplicate item!")
            }
            return res.status(400).send("Server Error :(");
        }
    })
    req.session.article.id = newArticle;
    res.json({
        msg: "OK"
    });


}

// ? ---------------------------------< Update Article >---------------------------- 
const addText = (req, res) => {

    let path = `/articles/text/${req.session.user.username}-${Date.now()}.html`;
    console.log(1);
    // fs.createWriteStream(`../public${path}`, (err) => {
    var from = fs.createWriteStream(`../public${path}`);
    console.log(from);
    from.once('open', function () {
        from.write("from");
        from.end();
    });
    console.log("==>", from)
    try {
        if (fs.existsSync(`../public${path}`)) {
            console.log("The file/from.txt exists");
        }
    } catch (err) {
        console.error(err)
    }
    console.log(200);
    // if (err) return res.status(500).send("Server Error :/")

    console.log(req.body.text);

    fs.writeFile(`../public${path}`, req.body.text, function (err) {
        if (err) return console.log(err);
        console.log(32);
        Article.findByIdAndUpdate(req.session.article.id, {
            text: path,
            summery: req.body.summery
        }, (err, article) => {
            if (err) {
                return res.status(500).json({
                    msg: "Server Error :(",
                    err: err.msg
                });
            }
            if (!article) {
                return res.status(400).json({
                    msg: "Article already not Exist :("
                });
            }
            console.log(req.session);
            if (article.text !== "") {
                fs.unlink(path.join(__dirname, '../public', article.text), err => {
                    if (err) {
                        console.log(400);
                        res.status(500).json({
                            msg: 'Server Error!'
                        })
                    }
                })
            }

        })
        console.log('Saved!');
    });

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
    addNewArticle,
    addText,
    // UpdateUserAvatar,
    // uploadBackgrondAvatar,
}