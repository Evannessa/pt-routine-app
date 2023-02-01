const createError = require("http-errors");
const express = require("express");

const serverless = require('serverless-http');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// var indexRouter = require("./routes/index");
const factoryRouter = require("./routes/factoryRoutes");
const displayRouter = require("./routes/displayRoutes");
const linkInterfaceRouter = require("./routes/linkInterfaceRoutes");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const fileUpload = require("express-fileupload");
const app = express();

const port = process.env.PORT || 9000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload()); //! HAD TO PUT THIS BEFORE THE APP.USE() ROUTER
app.use('/.netlify/functions/api', ro)
app.use("/factory", factoryRouter);
app.use("/display", displayRouter);
app.use("/links", linkInterfaceRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
// app.use("/users", usersRouter);
// app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(9000, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();

module.exports = app;
module.exports.handler = serverless(app)
