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

// router.route("/").get(getAllSets).post(createNewSet);
router.route("/").get(getAllSets);
router.route("/new").get(getBlankSet).post(createNewSet);
router.route("/:id").get(getSingleSet).patch(updateSet).delete(deleteSet);
router.route("/:id/uploads").post(uploadImage);
// router.route("/").get(getAllTimers).post(createTimer);
// router.route("/:id").get(getSingleTimer).patch(updateTimer).delete(deleteTimer);

module.exports = router;