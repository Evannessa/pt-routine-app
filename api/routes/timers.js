const express = require("express");
const router = express.Router();
const {
    getAllSets,
    createNewSet,
    getSingleSet,
    updateSet,
    deleteSet,
    getBlankSet,
} = require("../controllers/Timers");

// router.route("/").get(getAllSets).post(createNewSet);
router.route("/").get(getAllSets);
router.route("/new").get(getBlankSet).post(createNewSet);
router.route("/:invoiceId").get(getSingleSet).patch(updateSet).delete(deleteSet);
// router.route("/").get(getAllTimers).post(createTimer);
// router.route("/:id").get(getSingleTimer).patch(updateTimer).delete(deleteTimer);

module.exports = router;
