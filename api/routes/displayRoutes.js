const express = require("express");
const router = express.Router();
const {
    getAllSets,
    createNewSet,
    getSingleSet,
    updateSet,
    deleteSet,
    getBlankSet,
} = require("../controllers/timersController");

const { uploadImage } = require("../controllers/uploadsController");

router.route("/").get(getAllSets);
router.route("/:id").get(getSingleSet);

module.exports = router;
