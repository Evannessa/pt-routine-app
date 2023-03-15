const express = require("express");
const { verifySignUp } = require("../middleware")
const router = express.Router();
const {
    signIn,
    signUp,
    signOut
} = require("../controllers/authController");


router.route("/auth/signin").get(signIn);
router.route("/auth/signup").post(signUp)

module.exports = router;

