const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const essentialSchema = {
    type: String,
    trim: true,
};

const userSchema = new mongoose.Schema({
    firstname: {
        ...essentialSchema,
        // lowercase: true,
        // validate(value) {
        //     let reg = /^[a-z]{3,30}$/g;
        //     if (!reg.test(value)) {
        //         throw new Error("firstName should be have a-z and be between 3 and 30.");
        //     }
        // },
        default: 'Mr. No'
    },
    lastname: {
        ...essentialSchema,
        // lowercase: true,
        // validate(value) {
        //     let reg = /^[a-z]{3,30}$/g;
        //     if (!reg.test(value)) {
        //         throw new Error("firstName should be have a-z and be between 3 and 30.");
        //     }
        // },
        default: 'Body'
    },
    username: {
        ...essentialSchema,
        unique: true,
        required: true,
        // validate(value) {
        //     let reg = /^[a-z0-9 .@_]{4,}$/g;
        //     if (!reg.test(value)) {
        //         throw new Error("firstName could be have a-z A-Z _@. ang be greater thar 4 characters.");
        //     }
        // }
    },
    password: {
        ...essentialSchema,
        required: true,
        // validate(value) {
        //     let reg = /{8,20}$/g;
        //     if (!reg.test(value)) {
        //         throw new Error("password should be between 8 and 20 characters.");
        //     }
        // }

    },
    sex: {
        ...essentialSchema,
        lowercase: true,
        enum: ['male', 'female', 'other'],
        default: 'male'
    },
    email: {
        ...essentialSchema,
        validate(value) {
            let reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!reg.test(value)) {
                throw new Error("Email address not valid.");
            }
        },
        default: 'NoBody@email.com'

    },
    phone_number: {
        ...essentialSchema,
        validate(value) {
            let reg = /^[0-9+]{10,15}$/g;
            if (!reg.test(value)) {
                throw new Error("number should be between 10 and 15 character.");
            }
        },
        default: '09000000000'
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
        lowercase: true,
        enum: ['admin', 'blogger'],
        default: 'blogger'
    },
    avatar: {
        ...essentialSchema,
        default: '/images/avatars/default.png'
    },
    background_cover: {
        ...essentialSchema,
        default: '/images/background_cover/default.jpg'
    }
})

userSchema.pre('save', function (next) {
    const user = this;
    if (this.isNew || this.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    };
});

userSchema.pre("findOneAndUpdate", function (next) {
    if (this.getUpdate().$set) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(this.getUpdate().$set.password, salt);
        this.getUpdate().$set.password = hash;
        next();
    } else {
        next();
    }
});




module.exports = mongoose.model('User', userSchema);