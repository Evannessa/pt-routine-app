
const db = require("../models")
const ROLES = db.ROLES
const Role = db.role
/**
 * @author: https://www.bezkoder.com/node-js-express-login-mongodb/
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
}
const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let role of req.body.roles) {
            if (!ROLES.includes(role)) {
                res.status(400).send({
                    message: `Failed! Role ${role} does not exist!`
                });
                return;
            }
        }
    }

    next();
};
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;
