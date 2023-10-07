// Import required modules and libraries.
const productsRoute = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoute = require('./routes/authRoutes')

const errorHandlerMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const session = require('./session')
const passport = require('passport')
const cloudinary = require('cloudinary').v2

//------------ Express Middleware Configuration ------------//

// Use the built-in middleware to parse incoming JSON data.
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Enable cookies and sessions
}));

//------------ Configure Body Parser for Data ----------//

// Use the 'body-parser' middleware to parse JSON data from request bodies.
app.use(bodyParser.json());

//------------ Cookie Parser Configuration ------------//

// Use the 'cookie-parser' middleware to parse cookies from incoming requests.
app.use(cookieParser());

cloudinary.config({ 
  cloud_name: 'dss4xjbc8', 
  api_key: '192813273465878', 
  api_secret: process.env.JWT_SECRET_KEY 
});


// Use the session to store the user data into session
session(app)


// Configure session serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});



//------------ Error Handling Middleware ------------//

// Use the 'errorHandlerMiddleware' to handle errors in the application.
app.use(errorHandlerMiddleware);


//------------ Define Routes ------------//

// Mount the 'productsRoute' middleware under the "/api/v1" path.
app.use("/api/v1", productsRoute);

// Mount the 'userRoutes' middleware under the "/api/v1" path.
app.use("/api/v1", userRoutes);

// Mount the authRoute middlware under the "/api/v1" path.
app.use("/api/v1/", authRoute)

// Export the configured Express application to be used elsewhere.
module.exports = app;
