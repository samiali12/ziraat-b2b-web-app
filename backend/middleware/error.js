
const ErrorHandler = require('../utils/errorHandler')

module.exports =  (err, request, response, next) => {

    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'

    response.status(err.statusCode).json({
        success: false,
        message: err.message
        //error: err.stack
    })

}
