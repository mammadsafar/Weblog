const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
const url = require('url');
const bcrypt = require('bcrypt');

const loginPage = (req, res) => {
    res.render('auth/login')
}


const loggedInUser = (req, res) => {
// console.log("req.body");
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            msg: "Empty Field :("
        });
    }

    let search={};
    if(req.body.username.match(/@/g)){
        search =  {email: req.body.email }
    }else{
        search = { username: req.body.username }
    }

    User.findOne({
        ...search
    }, (err, user) => {
        if (err) return res.status(400).json({
            msg: "server error :("
        });
        // console.log("3");
        if (!user) return res.status(404).json({
            msg: "Not Found :("
        })
        // console.log("4");

        bcrypt.compare(req.body.password, user.password, function (err, isMatch) {

            if (err) {
                return res.redirect(url.format({
                    pathname: "/login",
                    query: {
                        "msg": 'Server Error :('
                    }
                }));
            };

            if (!isMatch) return res.redirect(url.format({
                pathname: "/login",
                query: {
                    "msg": 'User Not Found :('
                }
            }));
            // console.log("5");
            req.session.user = user._id;
            // console.log(req.session.user);
            res.send();

        });

    })
}



module.exports = {
    loggedInUser,
    loginPage,
}