const path = require('path');
const fs = require('fs');
const User = require(path.join(__dirname, '../models/User'));
const Article = require(path.join(__dirname, '../models/article'));
const generalTools = require('../tools/general-tools');
const multer = require('multer');





const newArticle = (req, res) => {
    res.render('article/newArticle');

}
const readArticle = (req, res) => {
    res.render('article/readArticle');

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

    console.log("not ok");

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

        console.log("==========>  ", newArticle);
        req.session.article = newArticle;

        newArticle.save( (err) => {
            console.log("save article");
            if (err) {
                console.log("ok baby");
                console.log(err);
                if (err.code === 11000) {
                    return res.status(400).send("Duplicate item!")
                }
                return res.status(400).send("Server Error :(");
            }
        })
        console.log("ok");
        req.session.article = newArticle;
        console.log(req.session.article);
        res.redirect('../login')




    






}

// ? ---------------------------------< my Articles Pass >---------------------------- 
const myArticles = (req, res) => {

    res.render("article/myarticles")

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

        Article.find({}).skip(parseInt(req.body.page) * parseInt(req.body.limit) - parseInt(req.body.limit)).limit(parseInt(req.body.limit)).populate('owner').sort('lastUpdate').exec((err, articles) => {
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
console.log("================> ", req.params.id);
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
console.log(" you are so =====================================> <=========");
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


// ? ---------------------------------< article page >---------------------------- 

const updateArticlePage = (req, res) => {
    res.render('article/updateArticlePage');

}
// ? ---------------------------------< update Article >---------------------------- 
const updateArticle = (req, res) => {


    fs.unlink(path.join(__dirname, '../public', req.session.article.text), err => {
        if (err) {
            console.log(400);
            res.status(500).json({
                msg: 'Server Error!'
            })
        }
        console.log("delete complete");
    })



    console.log("create new article");

    let data = req.body.text

    let Location = path.join(__dirname, '../public/articles/text');

    let ArticleName = `${req.session.user.username}-${Date.now()}-article.html`;


    fs.writeFile(`${Location}/${ArticleName}`, ` ${ data }`, function (err) {
        if (err) {
            return res.status(400).send("Server Error :(");
        }


        const obj = {

            title: req.body.title,
            text: `/articles/text/${ArticleName}`,
            summery: req.body.summery.substring(0, 80)

        }
        // !---------- < delete empty field in object > ------------
        for (const key in obj) {
            if (!obj[key]) {
                delete obj[key]
            }
        }



        Article.findOneAndUpdate({
            _id: req.body._id
        }, obj, {
            new: true
        }, (err, articleUpdate) => {
            console.log(err);
            if (err) return res.status(500).json({
                msg: "Server Error :)"
            });

            console.log("ok");
            req.session.article = articleUpdate;
            console.log(req.session.article);
            res.status(200).send("Updated article");
        })




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
}