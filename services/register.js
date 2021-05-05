const path = require('path');
const User = require(path.join(__dirname, '../models/User'));


const registerPage = (req, res) => {
    console.log(1234);
    res.render('auth/register');
};

// ? ---------------------------------< create new user >---------------------------- 

const createUser = (req, res) => {

    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({
            msg: 'Empty Field :('
        })
    }

    User.findOne({
        $or: [{
                username: req.body.username.trim()
            },
            {
                email: req.body.email.trim()
            }
        ]
    }, (err, user) => {
        if (err) {
            return res.status(500).json({
                msg: "Server Error :(",
                err: err.msg
            });
        }
        if (user) {
            return res.status(400).json({
                msg: "User Already Exist :("
            });
        }


        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        console.log(newUser);
        newUser.save({}, (err, doc) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(400).send("Duplicate item!")
                }
                if (
                    err.message.includes('username') ||
                    err.message.includes('required')
                ) {
                    return res.status(400).send("Server Error :(");
                }

            }
        })
        res.json({
            msg: "OK"
        });
    })
}

// ? ---------------------------------< create admin >---------------------------- 

const createAdmin = (req, res) => {

    if (!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.password || !req.body.sex || !req.body.email || !req.body.phone_number || !req.body.role) {
        return res.status(400).json({
            msg: 'Empty Field :('
        })
    }

    User.findOne({
        role: "admin"
    }, (err, user) => {
        if (err) {
            return res.status(500).json({
                msg: "Server Error :(",
                err: err.msg
            });
        }
        if (user) {
            return res.status(400).json({
                msg: "Admin Already Exist :("
            });
        }
        console.log(user);

        const newUser = new User({
            firstname: req.body.firstname.trim(),
            lastname: req.body.lastname.trim(),
            username: req.body.username.trim(),
            password: req.body.password,
            sex: req.body.sex,
            email: req.body.email,
            phone_number: req.body.phone_number,
            role: req.body.role
        });
        console.log(newUser);
        newUser.save( (err) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(400).send("Duplicate item!")
                }
                if (
                    err.message.includes('username') ||
                    err.message.includes('required')
                ) {
                    return res.status(400).send("Server Error :(");
                }

            }
        })
        res.json({
            msg: "OK"
        });
    })
};

module.exports = {
    registerPage,
    createUser,
    createAdmin,

}