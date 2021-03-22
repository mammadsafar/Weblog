const mongoose = require('mongoose');

const essentialSchema = {
    type: String,
    trim: true,
};

const userSchema = new mongoose.Schema({
    firstname: {
        ...essentialSchema,
        lowercase: true,
        validate(value) {
            let reg = /^[a-z]{3,30}$/g;
            if (!reg.test(value)) {
                throw new Error("firstName should be have a-z ang be between 3 and 30.");
            }
        }
    },
    lastname: {
        ...essentialSchema,
        lowercase: true,
        validate(value) {
            let reg = /^[a-z]{3,30}$/g;
            if (!reg.test(value)) {
                throw new Error("firstName should be have a-z ang be between 3 and 30.");
            }
        }
    },
    username: {
        ...essentialSchema,
        unique: true,
        required: true,
        validate(value) {
            let reg = /^[a-z0-9 .@_]{4,}$/g;
            if (!reg.test(value)) {
                throw new Error("firstName could be have a-z A-Z _@. ang be greater thar 4 characters.");
            }
        }
    },
    password: {
        ...essentialSchema,
        required: true,

    },
    sex: {
        ...essentialSchema,
        enum: ['male', 'female', 'other']
    },
    email: {
        ...essentialSchema,
        validate(value) {
            let reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!reg.test(value)) {
                throw new Error("Email address not valid.");
            }
        }

    },
    phone_number: {
        ...essentialSchema,
        validate(value) {
            let reg = /^[0-9+]{10,15}$/g;
            if (!reg.test(value)) {
                throw new Error("firstName should be have a-z ang be between 3 and 30.");
            }
        }
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    lastUpdate: {
        type: Date,
        default: new Date(),
    },
    role: {
        ...essentialSchema,
        enum: ['admin', 'blogger'],
        defaul: 'blogger'
    },
    picture:{
        ...essentialSchema,
        default: ' ../public/images/profile/default.png'
    }
})

userSchema.pre('save', function(next) {
    const user = this;
    if (this.isNew || this.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    };
});


module.exports = mongoose.model('User', userSchema);