const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwtToken = require('jsonwebtoken')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');


const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, 'Full name is required.'],
        minlength: [8, 'Full Name should be at least 4 characters'],
        maxLength: [18, 'Full Name cann\'t be exceed 30 characters'],

    },

    email: {
        type: String,
        required: [true, 'Email address is required.'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address.'],
    },

    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required.'],
    },

    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [8, 'Password should be at least 8 characters long.'],
        select: false
    },

    companyName: {
        type: String,
    },


    location: {
        country: String,
        state: String,
        city: String,
    },

    profilePicture: {
        public_id: {
            type: String,
        },
        image_url: {
            type: String,
        },
    },

    role: {
        type: String,
        default: "user",
    },

   
    resetPasswordToken: String,
    resetPassswordExpireDate: Date,

});


userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)

})

// JWT TOken
userSchema.methods.getJWTToken = function (next) {

    const payload = {
        id: this._id,
        email: this.email,
        iat: Math.floor(Date.now() / 1000), // current timestamp in seconds
        exp: Math.floor(Date.now() / 1000) + (74000) // expiration time in seconds (1 hour from now)
      };

    return jwtToken.sign(payload, process.env.JWT_SECRET_KEY)
}

userSchema.methods.generateNewPasswordToken = function (next) {

    const token = crypto.randomBytes(32).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
    this.resetPassswordExpireDate = Date.now() + 15 * 60 * 100
    return token
}


const User = mongoose.model('User', userSchema);
module.exports = User;