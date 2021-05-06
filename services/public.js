const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
const Article = require(path.join(__dirname, '../models/article'));



const readArticle = (req, res) => {

    if (!req.session.user) {
        return res.render('article/public/readArticle');
    }

    Article.findById({
        _id: req.params.id
    }, (err, article) => {

        if (err) return res.status(500).json({
            msg: "Server Error :))"
        });


        if (req.session.user._id == article.owner || req.session.user.role === "admin") {
    
            res.render('article/readArticle');
        } else {
            if (req.session.user) {

                User.findOne({
                    _id: req.session.user._id
                }, (err, user) => {
    
                    if (err) return res.status(500).json({
                        msg: "Server Error :))"
                    });
                    if (user) {
                        res.render("article/public/userReadArticle")
                    }
    
    
                })
            }else{

                res.render("article/public/readArticle")
            }
        }


    })


}

// ? ---------------------------------< all article page >---------------------------- 
const allArticle = (req, res) => {

    res.render("article/public/allArticle")

}
// ? ---------------------------------< get All Article >---------------------------- 
const getAllArticle = (req, res) => {

    User.findOne({}, (err, user) => {

        if (err) return res.status(500).json({
            msg: "Server Error :))"
        });

        Article.find({}).skip(parseInt(req.body.page) * parseInt(req.body.limit) - parseInt(req.body.limit)).limit(parseInt(req.body.limit)).populate('owner').sort({
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
    User.findOne({}, (err, user) => {

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









module.exports = {
    allArticle,
    getAllArticle,
    readArticle,
    getOneArticle,

}