const dotenv = require("dotenv")
dotenv.config();

require('express-async-errors');
const createError = require("http-errors");



const express = require("express");


const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const helmet = require('helmet')
const rateLimiter = require('express-rate-limit');


// const session = require('express-session')
// var indexRouter = require("./routes/index");
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const factoryRouter = require("./routes/factoryRoutes");
const displayRouter = require("./routes/displayRoutes");
// const authRouter = require("./routes/authRoutes");


const connectDB = require("./db/connect");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const fileUpload = require("express-fileupload");
const app = express();

app.set('trust proxy', 1)
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60,
    })
);

const port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug')

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Asynchronous


// //https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
const oneDay = 1000 * 60 * 60 * 24;


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/uploads")));

app.use(fileUpload()); //! HAD TO PUT THIS BEFORE THE APP.USE() ROUTER

app.use("/api/factory", factoryRouter);
app.use("/api/display", displayRouter);
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)

app.use(notFound);
app.use(errorHandlerMiddleware);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});



const start = async () => {
    try {
        connectDB()
        // await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error);
    }

};

function initialize() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            addNewRole('user')
            addNewRole('admin')
        }
    })
}
function addNewRole(name) {
    new Role({
        name: name
    }).save(err => {
        if (err) {
            console.log("error", err)
        }
        console.log(`Added '${name}' to roles collection`)
    })

}

start()


module.exports = app;
