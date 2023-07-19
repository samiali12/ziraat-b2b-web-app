const app = require("./app")
const dbConnection = require("./database");

const dotenv = require('dotenv');

// config .env file
dotenv.config({path:'backend/config/.env'})

//------------ Mongo Connection ------------//
dbConnection()


const server = app.listen(process.env.PORT, () => {
  console.log(`Starting development server at http://127.0.0.1:${process.env.PORT}`);
});


// Handling Promise Rejection Error
process.on('unhandledRejection', (error) => {
  console.log(`Error: ${error.message}`)
  console.log(`Server is shut down due to unhandledRejectionError`)

  server.close( () => {
    process.exit(1)
  })
})