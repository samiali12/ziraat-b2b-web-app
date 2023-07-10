
const mongoose = require('mongoose');

const dbConnection = () => {

    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
        
    }).then((data) => {
        console.log(`Connected to MongoDB at ${data.connection.host}`);
    })
}

module.exports = dbConnection
