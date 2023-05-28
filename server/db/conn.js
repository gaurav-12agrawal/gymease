const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })
const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to database")
    })
    .catch((error) => console.error("MongoDB connection failed:", error.message))