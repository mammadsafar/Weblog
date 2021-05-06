const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
const bcrypt = require('bcrypt');

const loginPage = (req, res) => {
    res.render('auth/login')
}


const loggedInUser = (req, res) => {
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
        if (!user) return res.status(404).json({
            msg: "Not Found :("
        })

        bcrypt.compare(req.body.password, user.password, function (err, isMatch) {

            if (err) {
                return res.status(500).json({msg : "Server Error"});
            };

            if (!isMatch) return res.status(404).json({msg : "User Not Found!"});
            req.session.user = user;
            // console.log(req.session);
            // console.log(req.session.user);
            res.send();

        });

    })
}



module.exports = {
    loggedInUser,
    loginPage,
}