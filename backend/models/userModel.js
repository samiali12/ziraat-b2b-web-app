const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwtToken = require('jsonwebtoken')


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

    if (!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)

})

// JWT TOken
userSchema.methods.getJWTToken = function (next){
    return jwtToken.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.COOKIE_EXPIRE_DATE
    })
}

const User = mongoose.model('User', userSchema);
module.exports = User;