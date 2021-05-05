const path = require('path');
const multer = require('multer');
const User = require(path.join(__dirname, '../models/User'));
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


generalTools.updateArticleChecker = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login')
    };

    // return next();
};


generalTools.adminChecker = (req, res, next) => {
    console.log("============>", req.session.user);
    if (req.session.user.role === "admin") {

        User.findOne({
            $and: [{
                _id: req.session.user._id
            }, {
                role: "admin"
            }]
        }, (err, admin) => {
            console.log("=================<>", admin);
            console.log(err);
            if (err) return res.status(500).json({
                msg: err
            });

            if (admin) {
                res.render("admin/adminDashboard")
            } else {

                return next();
            }
        })
    } else {

        return next();
    }

};




// ? ---------------------------------< avatar Images >---------------------------- 

const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let a = path.join(__dirname, '/../public/images/avatars');
        console.log(a);
        cb(null, path.join(__dirname, '/../public/images/avatars'))
    },
    filename: function (req, file, cb) {
        let a = `${req.session.user.username}-${Date.now()}-${file.originalname}`;
        console.log(a);
        cb(null, `${req.session.user.username}-${Date.now()}-${file.originalname}`)
    }
})


generalTools.uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter: function (req, file, cb) {
        console.log(123);
        console.log(file);

        // if (!file.originalname.match(/\.(jpg|jpeg|png)$/g)) {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true)
        } else {
            cb(new Error('invalid type!'), false)

        }
        // if (fieldNameSize.length > 800000) {
        //     cb(new Error('high Size!'), false)
        // }

    }

})



// ? ---------------------------------< background Images >---------------------------- 


const BackgroundavatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let a = path.join(__dirname, '/../public/images/background_cover');
        console.log(a);
        cb(null, path.join(__dirname, '/../public/images/background_cover'))
    },
    filename: function (req, file, cb) {
        let a = `${req.session.user.username}-${Date.now()}-${file.originalname}`;
        console.log(a);
        cb(null, `${req.session.user.username}-${Date.now()}-${file.originalname}`)
    }
})

generalTools.uploadBackgrondAvatar = multer({
    storage: BackgroundavatarStorage,
    fileFilter: function (req, file, cb) {
        checkFile(file, cb)
    }
})

function checkFile(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/g;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


// ? ---------------------------------< article Images >---------------------------- 
const articleImage = multer.diskStorage({
    destination: function (req, file, cb) {
        let a = path.join(__dirname, '/../public/articles/images');
        console.log(a);
        cb(null, path.join(__dirname, '/../public/articles/images'))
    },
    filename: function (req, file, cb) {
        let a = `${req.session.user.username}-${Date.now()}-${file.originalname}`;
        console.log(a);
        cb(null, `${req.session.user.username}-${Date.now()}-${file.originalname}`)
    }
})


generalTools.uploadArticleImages = multer({
    storage: articleImage,
    fileFilter: function (req, file, cb) {
        console.log(123);
        console.log(file);

        // if (!file.originalname.match(/\.(jpg|jpeg|png)$/g)) {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true)
        } else {
            cb(new Error('invalid type!'), false)

        }
        // if (fieldNameSize.length > 800000) {
        //     cb(new Error('high Size!'), false)
        // }

    }

})


// ? ---------------------------------< profile Article >---------------------------- 
const articleProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        let a = path.join(__dirname, '/../public/articles/profiles');
        console.log(a);
        cb(null, path.join(__dirname, '/../public/articles/profiles'))
    },
    filename: function (req, file, cb) {
        let a = `${req.session.user.username}-${Date.now()}-${file.originalname}`;
        console.log(a);
        cb(null, `${req.session.user.username}-${Date.now()}-${file.originalname}`)
    }
})


generalTools.uploadArticleProfile = multer({
    storage: articleProfile,
    fileFilter: function (req, file, cb) {
        console.log(123);
        console.log(file);

        // if (!file.originalname.match(/\.(jpg|jpeg|png)$/g)) {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true)
        } else {
            cb(new Error('invalid type!'), false)

        }
    }
})







module.exports = generalTools;