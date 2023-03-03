const createError = require("http-errors");
const express = require("express");

// const serverless = require('serverless-http');
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
app.set('view engine', 'pug')
// app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../stretches-site/build")));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

app.use(fileUpload()); //! HAD TO PUT THIS BEFORE THE APP.USE() ROUTER

app.use("/factory", factoryRouter);
app.use("/display", displayRouter);
app.use("/links", linkInterfaceRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../stretches-site/build/index.html'));
});



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
// module.exports.handler = serverless(app)
