const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
const Article = require(path.join(__dirname, '../models/article'));
const Comment = require(path.join(__dirname, '../models/comment'));

const getUser = (req, res) => {

    User.find({
        _id: req.session.user._id
    }, (err, user) => {
        if (err) {
            if (err) return res.status(500).json({
                msg: "Server Error :)"
            });
        }
        if (!user) {
            if (err) return res.status(404).json({
                msg: "User not found"
            });
        };


        res.json(user)


    })

}
const getUserById = (req, res) => {

    console.log(100);
    Article.find({
        owner: req.params.id
    }, (err, articles) => {
        if (err) {
            return res.redirect(url.format({
                pathname: "/api/auth/registerPage",
                status: 500,
                query: {
                    "msg": "Server Error :("
                }
            }))
        }
        if (!articles) {
            return res.redirect(url.format({
                status: 404,
                query: {
                    "msg": 'Username Not Found :('
                }
            }));
        };

        res.json(articles)


    })

}




const getComment = (req, res) => {

    User.find({}, {
        username: 1,
        avatar: 1
    }, (err, users) => {
        if (err) {
            return res.redirect(url.format({
                pathname: "/api/auth/registerPage",
                status: 500,
                query: {
                    "msg": "Server Error :("
                }
            }))
        }
        if (!users) {
            return res.redirect(url.format({
                status: 404,
                query: {
                    "msg": 'Username Not Found :('
                }
            }));
        };




        Comment.find({
            article: req.params.id
        }).populate('owner').exec( (err, comment) => {
            if (err) {
                return res.redirect(url.format({
                    pathname: "/api/auth/registerPage",
                    status: 500,
                    query: {
                        "msg": "Server Error :("
                    }
                }))
            }
            if (!comment) {
                return res.redirect(url.format({
                    status: 404,
                    query: {
                        "msg": 'comment Not Found :('
                    }
                }));
            };

            res.json(comment)


        })

    })

}



module.exports = {
    getUser,
    getUserById,
    getComment
}