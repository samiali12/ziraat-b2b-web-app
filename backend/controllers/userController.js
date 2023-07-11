const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const User = require('../models/userModel')

const bcrypt = require('bcrypt');
const { sendToken } = require('../utils/userToken');


const userRegistration = asyncErrorHandler(async (request, response) => {

    // getting required attribute during the registration
    const { fullName, email, phoneNumber, password } = request.body

    const user = await User.create({ fullName, email, phoneNumber, password })

    const token = user.getJWTToken()

    sendToken(user, 201, response)
})


const userLogin = asyncErrorHandler(async (request, response, next) => {

    const { email, password } = request.body

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return (next(new ErrorHandler('Invalid credentials.', 401)))
    }

    // Compare the provided password with the stored password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return (next(new ErrorHandler('Invalid credentials.', 401)))
    }

   sendToken(user, 200, response)

})

const userLogout = asyncErrorHandler(async (request, response, next) => {

    response.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    response.status(200).json({
        success: true,
        message: "Logout successfully"
    })

})


const authorizationRoles = (request, response, next) => {
    return(next(new ErrorHandler("Login to accffffess. ", 401)))
}



// Export the controller functions
module.exports = {
    userRegistration,
    userLogin,
    userLogout,
    authorizationRoles,
}