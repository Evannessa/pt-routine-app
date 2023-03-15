const createError = require("http-errors");
const express = require("express");

const db = require("../models")
const Role = db.role

const { createProxyMiddleware } = require("http-proxy-middleware")

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv")
// const session = require('express-session')
// var indexRouter = require("./routes/index");
const factoryRouter = require("./routes/factoryRoutes");
const displayRouter = require("./routes/displayRoutes");
// const authRouter = require("./routes/authRoutes");

dotenv.config();

const connectDB = require("./db/connect");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const fileUpload = require("express-fileupload");
const app = express();

const port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug')
// app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Asynchronous


// //https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "SECRETKEY0239402asijofij9384029348938402adsa93840928304",
    saveUninitialized: true,
    cooke: { maxAge: oneDay },
    resave: false,


}))
// app.use(express.static(path.join(__dirname, "../stretches-site/build")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/uploads")));
// app.use("/api", createProxyMiddleware({}))
console.log("Directory name is", __dirname)
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

app.use(fileUpload()); //! HAD TO PUT THIS BEFORE THE APP.USE() ROUTER

app.use("/api/factory", factoryRouter);
app.use("/api/display", displayRouter);
// app.use("/links", linkInterfaceRouter);
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
