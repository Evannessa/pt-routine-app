const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (error, req, res, next) => {
    if (error instanceof CustomAPIError) {
        return res.status(error.statusCode).json({ msg: error.message });
    }
    return res.status(error.status).json({ msg: error.message });
};

module.exports = errorHandlerMiddleware;
