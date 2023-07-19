const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("./asyncErrorHandler");
const jwtToken = require('jsonwebtoken')
const User = require('../models/userModel')

const isAuthenticated = asyncErrorHandler(async (request, response, next) => {

  const {token} = request.cookies

  console.log(request.cookies)

  if(!token){
    return next(new ErrorHandler("Login to access"))
  }


})

module.exports = {
  isAuthenticated
}