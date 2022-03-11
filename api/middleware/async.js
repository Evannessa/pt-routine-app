/**
 * controller is still async, wait for promise to be settled, either
 * resolved or rejected, and pass i req, res, and next to "express"
 * if there is an error, we'll catch it over here.
 * @param {*} callback - the controller passed in as an argument
 * @returns
 */
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
