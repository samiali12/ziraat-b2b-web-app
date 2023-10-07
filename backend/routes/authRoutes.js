const express = require('express');
const router = express.Router();

// Endpoint to check if a user is authenticated
router.get('/auth/check-auth', (request, response) => {
   
    console.log(request.session)
    if (request.session && request.session.user) {
        // User is authenticated
        console.log(request.session)
        response.status(200).json({ isAuthenticated: true, userId: request.session.user.id });
    } else {
        console.log('Updating')
        // User is not authenticated
        response.status(501).json({ isAuthenticated: false });
    }
});


module.exports = router;