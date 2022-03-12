const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (error, req, res, next) => {
    if (error instanceof CustomAPIError) {
        return res.status(error.statusCode).json({ msg: error.message });
    }
    // res.locals.error = error;
    // console.log("Error is", error, res.locals.error);
    // if (error.statusCode >= 100 && error.statusCode < 600) {
    //     return res.status(error.statusCode).json({ msg: error.message });
    // } else {
    //     return res.status(500);
    // }
    return res.status(500).json({ msg: error.message });
};

module.exports = errorHandlerMiddleware;
