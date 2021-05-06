const path = require('path');
const fs = require('fs');
const User = require(path.join(__dirname, '../models/User'));
const Article = require(path.join(__dirname, '../models/article'));
const Comment = require(path.join(__dirname, '../models/comment'));
const generalTools = require('../tools/general-tools');
const multer = require('multer');





const newArticle = (req, res) => {
    res.render('article/newArticle');

}
const readArticle = (req, res) => {
    res.render('article/readArticle');

}

// ? ---------------------------------< my Articles Pass >---------------------------- 
const myArticles = (req, res) => {

    res.render("article/myarticles")

}

// ? ---------------------------------< article profile >---------------------------- 
const articleprofile = (req, res) => {

    const upload = generalTools.uploadArticleProfile.single('avatar');



    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).send('Server Error :/')

        } else if (err) {

            return res.status(400).send("Bad Request!")

        } else {

            let path = req.file.destination.split("public");
            `${path[1]}/${req.file.filename}`
            Article.findOneAndUpdate({
                _id: req.session.article._id
            }, {
                profile: `${path[1]}/${req.file.filename}`,
            }, (err, article) => {

                if (err) {

                    return res.status(500).json({
                        msg: "Server Error :("
                    });
                }

                res.render('article/myarticles')


            });


        }
    })
}


// ? ---------------------------------< article Images >---------------------------- 
const articleImage = (req, res) => {

    const upload = generalTools.uploadArticleImages.single('upload');



    upload(req, res, function (err) {


        if (err instanceof multer.MulterError) {
            return res.status(500).send('Server Error :/')

        } else if (err) {

            return res.status(400).send("Bad Request!")

        } else {
            let path = req.file.destination.split("public");
            res.json({
                uploaded: 1,
                url: `${path[1]}/${req.file.filename}`
            })
        }
    })
}

// todo ---------------------------------< add New Article >---------------------------- 
const addNewArticle = (req, res) => {


    let data = req.body.text

    let Location = path.join(__dirname, '../public/articles/text');

    let ArticleName = `${req.session.user.username}-${Date.now()}-article.html`;


    fs.writeFileSync(`${Location}/${ArticleName}`, ` ${ data }`)

    const newArticle = new Article({
        title: req.body.title,
        owner: req.session.user._id,
        text: `/articles/text/${ArticleName}`,
        summery: req.body.summery.substring(0, 80)

    });

    req.session.article = newArticle;

    newArticle.save((err) => {
        if (err) {
            if (err.code === 11000) {
                return res.status(400).send("Duplicate item!")
            }
            return res.status(400).send("Server Error :(");
        }
    })
    req.session.article = newArticle;
    res.redirect('../login')


}


// ? ---------------------------------< getMyArticle >---------------------------- 
const getMyArticle = (req, res) => {
    User.findOne({
        _id: req.session.user._id
    }, {
        username: 1
    }, (err, user) => {

        if (err) return res.status(500).json({
            msg: "Server Error :))"
        });
        Article.find({owner : req.session.user._id }).skip(parseInt(req.body.page) * parseInt(req.body.limit) - parseInt(req.body.limit)).limit(parseInt(req.body.limit)).populate('owner').sort({
            'lastUpdate': -1
        }).exec((err, articles) => {
            if (err) return res.status(500).json({
                msg: "Server Error :)("
            });

            if (!articles) {
                return res.status(404).json({
                    msg: "Not Found :("
                });
            };
            res.json({
                articles
            })


        })

    })
}

// ? ---------------------------------< get one Article >---------------------------- 
const getOneArticle = (req, res) => {
    User.findOne({
        _id: req.session.user._id
    }, {
        username: 1
    }, (err, user) => {

        if (err) return res.status(500).json({
            msg: "Server Error :))"
        });

        Article.find({
            _id: req.params.id
        }).populate('owner').exec((err, article) => {
            if (err) return res.status(500).json({
                msg: "Server Error :)("
            });

            if (!article) {
                return res.status(404).json({
                    msg: "Not Found :("
                });
            };

            res.json({
                article
            })


        })

    })
}


// ? ---------------------------------< delete User >---------------------------- 
const deleteArticle = (req, res) => {
    User.findOne({
        _id: req.session.user._id
    }, {
        username: 1
    }, (err, user) => {
        if (err) return res.status(500).json({
            msg: "Server Error :))"
        });

        Article.findOne({
            _id: req.params.id
        }).populate('owner').exec((err, articles) => {
            if (err) return res.status(500).json({
                msg: "Server Error :)"
            });

            if (!articles) {
                return res.status(404).json({
                    msg: "Not Found :("
                });
            } else {

                Article.findOneAndDelete({
                    _id: req.params.id
                }, (err, user) => {
                    if (err) return res.status(500).json({
                        msg: "Server Error :)"
                    });

                    res.send("ok");
                })

            }




        })

    })





}


// ? ---------------------------------< edit article page >---------------------------- 

const updateArticlePage = (req, res) => {
    res.render('article/updateArticlePage');

}
// ? ---------------------------------< update Article >---------------------------- 
const updateArticle = (req, res) => {



    const obj = {

        title: req.body.title,
        summery: req.body.text.substring(0, 80),
        lastUpdate: new Date(),

    }
    // !---------- < delete empty field in object > ------------
    for (const key in obj) {
        if (!obj[key]) {
            delete obj[key]
        }
    }


    User.findOne({
        _id: req.session.user._id
    }, (err, user) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)"
        });

        Article.findOneAndUpdate({
            _id: req.body.id
        }, obj, {
            new: true
        }, (err, articleUpdate) => {

            if (err) return res.status(500).json({
                msg: "Server Error :)"
            });

            fs.readFile(path.join(__dirname, '../public', articleUpdate.text), "utf8", function (err, data) {
                if (err) {
                    return res.status(400).send("Server Error :(");
                }
                fs.writeFile(path.join(__dirname, '../public', articleUpdate.text), ` ${ req.body.text }`, function (err) {
                    if (err) {
                        return res.status(400).send("Server Error :(");
                    }

                    req.session.article = articleUpdate;
                    res.status(200).send("Updated article");
                })
            });


        })
    })








}



// * ---------------------------------< Comment >---------------------------- 
const addComment = (req, res) => {
console.log(100200300);
console.log(req.body);
    const newComment = new Comment({
        body: req.body.massage,
        owner: req.session.user._id,
        article: req.params.id,
    });



    newComment.save((err) => {
        if (err) {

            if (err.code === 11000) {
                return res.status(400).send("Duplicate item!")
            }
            return res.status(400).send("Server Error :(");
        }
    })

    res.json('ok')


}

const deleteComment = (req, res) => {
  
    Comment.findOneAndDelete({
        _id: req.params.id
    }, (err, comment) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)====<"
        });

        res.send("ok");
    })

}


module.exports = {
    newArticle,
    articleprofile,
    articleImage,
    addNewArticle,
    myArticles,
    getMyArticle,
    getOneArticle,
    deleteArticle,
    updateArticle,
    updateArticlePage,
    readArticle,
    addComment,
    deleteComment,
}