const bcrypt = require('bcrypt');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const { sendToken } = require('../utils/userToken');
const sendEmail = require("../utils/messages")


const userRegistration = asyncErrorHandler(async (request, response, next) => {

    // getting required attribute during the registration
    const { email, password, role } = request.body

    if (await User.findOne({ email })) {
        return response.status(401).json({
            message: "Email is already exits. Try different "
        })
    }

    const user = await User.create({ email, password, role })

    const verificationToken = user.generateEmailVerificationToken()

    const emailVerificationUrl = `http://localhost:3000/verify-email/token/${verificationToken}`

    try {

        sendEmail({
            email: user.email,
            subject: "Ziraat-B2B Email Verification",
            message: `Click the below link to verify your email \n ${emailVerificationUrl}`
        })

        await user.save()
        response.status(200).json({
            success: true,
            message: "User Registerd Successfully",
            user
        })
        //await sendToken(user, 200, response, "User Registered Successfully.")
    }

    catch (error) {
        return response.status(401).json({
            message: "Some things wrong happening",
            success: false
        })
    }
})

const sendEmailVerification = asyncErrorHandler(async (request, response, next) => {

    const user = await User.findOne({ email: request.body.email });


    if (!user) {
        
        return response.status(401).json({
            message: "Some things wrong happening",
            success: false
        })
    }

    try {

        const verificationToken = user.generateEmailVerificationToken()
        const emailVerificationUrl = `http://localhost:3000/verify-email/token/${verificationToken}`
        sendEmail({
            email: user.email,
            subject: "Ziraat-B2B Email Verification",
            message: `Click the below link to verify your email \n ${emailVerificationUrl}`
        })

        await user.save({ validateBeforeSave: false })
        return response.status(200).json({
            success: true,
            message:"Email verification link is send"
        })
    }
    catch(err){
        return response.status(501).json({
            success: false,
            message: "Some things wrong happening. Try gain later"
        })
    }



})

const userLogin = asyncErrorHandler(async (request, response, next) => {

    const { email, password } = request.body

    const user = await User.findOne({ email }).select("+password")

    //console.log(user)

    if (!user) {
        return response.status(401).json({
            success: false,
            message: "Invalid Email"
        })
    }


    // Compare the provided password with the stored password
    const hashPassword = await bcrypt.compare(password, user.password)

    console.log(hashPassword)

    if (!hashPassword) {
        return response.status(401).json({
            success: false,
            message: "Invalid Password"
        })
    }
    else {
        sendToken(user, 200, response, "User Login Successfully")

    }

})

const emailVerification = asyncErrorHandler(async (request, response, next) => {

    console.log("Hello")
    const token = request.params.token

    const newToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({ emailVerificationToken: newToken })

    if (!user) {
        console.log(user)
        return response.status(401).json(
            {
                success: false,
                message: "Something wrong happening"
            })
    }

   
    user.verified = true
    user.emailVerificationToken = undefined
    user.emailVerificationTokenExpireDate = undefined

    await user.save({ validateBeforeSave: true })

    response.status(200).json({
        success: true,
        message: "Email verified Successfully"
    })
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

    console.log(request.body.email)

    if (!user) {
        return response.status(401).json({
            success: false,
            message: "Ziraat-B2B have no email"
        })
    }

    // Get reset password token
    const passwordToken = user.generateNewPasswordToken()
    console.log(passwordToken)
    await user.save({ validateBeforeSave: false })
    const resetPasswordUrl = `http://localhost:3000/password-reset/token/${passwordToken}`
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
    })

    if (!user) {
        console.log(user)
        return response.status(401).json({
            success: false,
            message: "Reset password token is invalid or has been expired"
        })
    }

    user.password = request.body.password
    user.resetPasswordToken = undefined
    user.resetPassswordExpireDate = undefined

    await user.save()

    sendToken(user, 200, response, "Password Reset Successfully")

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
    emailVerification,
    sendEmailVerification,
    userLogout,
    getUserDetails,
    updatePassword,
    passwordResettingUrl,
    passwordResetting,
    authorizationRoles,
    deleteUser,
    profileUpdate
}