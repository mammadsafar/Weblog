const url = require('url');
const generalTools = {};

generalTools.sessionChecker = (req, res, next) => {
    console.log("sessionChecker");
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect('/dashboard')
    }
    return next();
}

generalTools.loginChecker = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login')
    };

    return next();
};


module.exports = generalTools;