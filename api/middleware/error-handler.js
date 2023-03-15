const { CustomAPIError } = require("../errors/custom-error");

const { StatusCodes } = require("http-status-codes")

const errorHandlerMiddleware = (error, req, res, next) => {
    console.log(error)

    let customError = {

        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later"
    }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(",")
        customError.statusCode = 400
    }
    if (error.code && error.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(error.keyValue)} field, please choose another value`
        customError.statusCode = 400
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${error.value}`;
        customError.statusCode = 404
    }
    return res.status(customError.statusCode).json({ msg: customError.msg })

};

module.exports = errorHandlerMiddleware;
