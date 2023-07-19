const productsRoute = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const errorHandlerMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()


//------------ Express Middle Configuration ------------//
app.use(express.json());

//------------ Cookie Parser Configuration ------------//
app.use(cookieParser())


app.use(errorHandlerMiddleware)

app.use("/api/v1", productsRoute)
app.use("/api/v1", userRoutes)


module.exports = app