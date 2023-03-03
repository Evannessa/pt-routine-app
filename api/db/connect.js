const mongoose = require("mongoose");

// const connectDB = async (url) => {
//     //returning a promise
//     console.log(url)
//     return mongoose.connect(url, {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true
//     });
// };

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`Mongo database is connected! ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB;
