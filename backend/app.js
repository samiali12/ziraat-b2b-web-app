const productsRoute = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const errorHandlerMiddleware = require('./middleware/error')

const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1",productsRoute)
app.use("/api/v1",userRoutes)

app.use(errorHandlerMiddleware)
  
module.exports = app