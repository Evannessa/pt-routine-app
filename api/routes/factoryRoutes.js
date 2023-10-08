const express = require("express");
const router = express.Router();
const {
    getAllSets,
    createNewSet,
    getSingleSet,
    updateSet,
    deleteSet,
    getBlankSet,
    updateAllSets,
} = require("../controllers/timersController");

const { uploadImage, getAllUploads, getImage } = require("../controllers/uploadsController");


// router.route("/").get(getAllSets).post(createNewSet);
//NOTE - the order of these matters
router.route("/").get(getAllSets); //.patch(updateAllSets);
router.route("/new").get(getBlankSet).post(createNewSet);
router.route("/uploads").get(getAllUploads);
router.route("/:id").get(getSingleSet).patch(updateSet).delete(deleteSet);
router.route("/:id/uploads").get(getImage).post(uploadImage)
// router.route("/").get(getAllTimers).post(createTimer);
// router.route("/:id").get(getSingleTimer).patch(updateTimer).delete(deleteTimer);

module.exports = router;
