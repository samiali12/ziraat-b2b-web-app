const bcrypt = require('bcrypt');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const { sendToken } = require('../utils/userToken');
const sendEmail = require("../utils/messages")

const passport = require('passport')



const userRegistration = asyncErrorHandler(async (request, response) => {
    // getting required attribute during the registration
    const { fullName, email, phoneNumber, password } = request.body
    const user = await User.create({ fullName, email, phoneNumber, password })

    user.save().then(
        (error) => {
            //duplicate key
            if ( error && error.code === 'E11000' ) {
               return next(new ErrorHandler("User with this email is already exits",401))
            }else{
                return response.status(200).json({
                    message: "User Registered Succesfully",
                    user
                })
            }
    
        }
    )

})


const userLogin = asyncErrorHandler(async (request, response, next) => {

    const { email, password } = request.body
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return (next(new ErrorHandler('Invalid credentials1.', 401)))
    }

    // Compare the provided password with the stored password
    const hashPassword = await bcrypt.hash(password, 10)
    if (hashPassword == user.password) {
        return (next(new ErrorHandler('Invalid credentials2.', 401)))
    }

    sendToken(user, 200, response, "User Login Successfully")
})

const userLogout = asyncErrorHandler(async (request, response, next) => {

    // Clear any authentication-related tokens or cookies
    response.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    response.status(200).json({
        success: true,
        message: "Logout successfully"
    })

})

const passwordResettingUrl = asyncErrorHandler(async (request, response, next) => {

    const user = await User.findOne({ email: request.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 401))
    }

    // Get reset password token
    const passwordToken = user.generateNewPasswordToken()
    console.log(passwordToken)
    await user.save({ validateBeforeSave: false })
    const resetPasswordUrl = `${request.protocol}://${request.get("host")}/api/v1/password/reset/${passwordToken}`
    const message = `Your password reset token is \n ${resetPasswordUrl}`

    try {

        await sendEmail({
            email: user.email,
            subject: "Ziraat-B2B Password Recovery",
            message,
        })

        response.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPassswordExpireDate = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }

})

const passwordResetting = asyncErrorHandler(async (request, response, next) => {

    resetPasswordToken = crypto.createHash('sha256').update(request.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        //resetPassswordExpireDate: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400))
    }

    if (request.body.password != request.body.confirmPassword) {
        return next(new ErrorHandler("Both password must be same", 400))
    }

    user.resetPasswordToken = undefined
    user.resetPassswordExpireDate = undefined

    await user.save()

    sendToken(user, 200, response)

})

// update user password 
const updatePassword = asyncErrorHandler(async (request, response, next) => {

    const user = await User.findOne(request.user.id).select('+password')
    const isPassword = await User.comparePassword(request.body.oldPassword)

    if (!isPassword) {
        return next(new ErrorHandler('Old password is incorrect', 400))
    }

    if (request.body.newPassword != request.body.confirmPassword) {
        return next(new ErrorHandler('Please type same password. ', 400))
    }

    user.password = request.body.newPassword;
    await user.save()
    sendToken(user, 200, response)
})

const authorizationRoles = (allowedRoles) => {
    return (req, res, next) => {
        // Assuming you have the authenticated user's role available in the request object
        const userRole = req.user.role;

        if (allowedRoles.includes(userRole)) {
            // User has the required role, proceed with the next middleware
            next();
        } else {
            // User is not authorized, send a response with appropriate status code and message
            return new ErrorHandler(`Role ${request.user.role} cann't access this resources`)
        }
    };
}



// Get User Details
const getUserDetails = asyncErrorHandler(async (request, response, next) => {

    const user = await User.findOne({ _id: request.params.id })

    response.status(200).json({
        sucess: true,
        user
    })
})

const profileUpdate = asyncErrorHandler(async (request, response, next) => {

    let user = await User.findOne({ _id: request.params.id })

    console.log(user)
    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }

    user = await User.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    response.status(200).json({
        sucess: true,
        user
    })
})

const deleteUser = asyncErrorHandler(async (request, response, next) => {

    let user = await User.findOne({ _id: request.params.id })

    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }

    await User.findByIdAndRemove(user._id)

    response.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })

})

// Export the controller functions
module.exports = {
    userRegistration,
    userLogin,
    userLogout,
    getUserDetails,
    updatePassword,
    passwordResettingUrl,
    passwordResetting,
    authorizationRoles,
    deleteUser,
    profileUpdate
}