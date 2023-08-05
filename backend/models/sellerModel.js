const sellerSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, 'Full name is required.'],
        minlength: [8, 'Full Name should be at least 4 characters'],
        maxLength: [18, 'Full Name cann\'t be exceed 30 characters'],

    },

    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        
    },

    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required.'],
    },

    password: {
        type: String,
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
        default: "seller",
    },

    verified: {
        type: Boolean,
        requirec: true, 
        default: false
    }, 
   

    emailVerificationToken: String,
    emailVerificationTokenExpireDate: Date,

    resetPasswordToken: String,
    resetPassswordExpireDate: Date,
});


sellerSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)

})


// JWT TOken
sellerSchema.methods.getJWTToken = function (next) {

    const payload = {
        id: this._id,
        email: this.email,
        iat: Math.floor(Date.now() / 1000), // current timestamp in seconds
        exp: Math.floor(Date.now() / 1000) + (74000) // expiration time in seconds (1 hour from now)
      };

    return jwtToken.sign(payload, process.env.JWT_SECRET_KEY)
}

// Generate email verification token
sellerSchema.methods.generateEmailVerificationToken = function () {
    
    const token = crypto.randomBytes(32).toString('hex')
    this.emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex')
    this.emailVerificationTokenExpireDate =  Date.now() + 15 * 60 * 100
    return token
};

// Generate password reset token
sellerSchema.methods.generateNewPasswordToken = function (next) {

    const token = crypto.randomBytes(32).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
    this.resetPassswordExpireDate = Date.now() + 60 * 60 * 1000
    return token
}


const User = mongoose.model('seller', sellerSchema);
module.exports = User;