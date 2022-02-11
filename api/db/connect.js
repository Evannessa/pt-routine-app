const mongoose = require("mongoose");

// const connectionString = 'mongodb+srv://MayaBradford17:<password>@nodeexpressprojects.mqm1l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = (url) => {
    //returning a promise
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
