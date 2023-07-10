const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("./asyncErrorHandler");
const jwtToken = require('jsonwebtoken')
const User = require('../models/userModel')

const isAuthenticated = asyncErrorHandler(async (request, response, next) => {

  // Retrieving the cookie
  const {token }= request.cookies

  if (!token) {
    return next(new ErrorHandler("Login to access. ", 401))
    console.log(token)
  }

  console.log(token)
  const decodedData = jwtToken.verify(token, process.env.JWT_SECRET_KEY)

  request.user = await User.findById(decodedData._id)

  next()
})

module.exports = {
  isAuthenticated
}