const asyncErrorHandler = require("./asyncErrorHandler");

const isAuthenticated = asyncErrorHandler(async (request, response, next) => {

  if (request.session) {
    // User is logged in
    
    next();
  } else {
    // User is not logged in; handle as needed (e.g., redirect to login)
    response.status(401).json({
      message: 'Unauthorized' 
    })
  }

})

module.exports = {
  isAuthenticated
}