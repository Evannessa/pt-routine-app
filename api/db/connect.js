const mongoose = require("mongoose");

const connectDB = (url) => {
    console.log(url);
    //returning a promise
    return mongoose.connect(url);
};

module.exports = connectDB;
