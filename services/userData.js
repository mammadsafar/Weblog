const path = require('path');
const User = require(path.join(__dirname, '../models/User'));


const getUser = (req, res) => {
// console.log(req.session.user);
// console.log(req.session);
    User.find({_id: req.session.user._id}, (err, user) => {
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
                status: 404,
                query: {
                    "msg": 'Username Not Found :('
                }
            }));
        };


        res.json(user)


    })
    
}



module.exports = {
    getUser
}