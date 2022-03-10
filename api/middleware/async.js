const asyncWrapper = (callback) => {
    return async (req, res, next) => {
        try {
            await callback(req, res, next);
        } catch (error) {
            next(error); //passing this to a next middleware
        }
    };
};

module.exports = asyncWrapper;
