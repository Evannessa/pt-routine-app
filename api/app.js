const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");

const createError = require("http-errors");

const xss = require("xss-clean");

// TODO: Add this back in later
// const helmet = require("helmet");
// const rateLimiter = require("express-rate-limit");

// const session = require('express-session')
// var indexRouter = require("./routes/index");
// const authRouter = require("./routes/authRoutes");
// const userRouter = require("./routes/userRoutes");
const factoryRouter = require("./routes/factoryRoutes");
const displayRouter = require("./routes/displayRoutes");

const connectDB = require("./db/connect");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const fileUpload = require("express-fileupload");

app.set("trust proxy", 1);

//TODO: add this back in later
// app.use(
//     rateLimiter({
//         windowMs: 15 * 60 * 1000,
//         max: 60,
//     })
// );

const port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
// app.use(helmet({ crossOriginEmbedderPolicy: false}));



app.use(xss());
app.use(mongoSanitize());

app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan("dev"));
app.use(express.json());

app.use(fileUpload()); 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/uploads")));
app.use("/api/factory", factoryRouter);
app.use("/api/display", displayRouter);
app.use('/uploads', (_, res, next) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  })


// TODO: To be replaced when authentication is added
// app.use("/api/auth", authRouter);
// app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

const start = async () => {
    try {
        connectDB();
        // await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
            //
        });
    } catch (error) {
        console.error("There was an error")
        // console.log(error);
    }
};
start();



module.exports = app;
