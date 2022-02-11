const express = require("express");
const router = express.Router();
const {
    getAllTimers,
    getAllSets,
    createNewSet,
    createTimer,
    getSingleTimer,
    updateTimer,
    deleteTimer,
} = require("../controllers/Timers");

router.route("/").get(getAllSets).post(createNewSet);
// router.route("/").get(getAllTimers).post(createTimer);
router.route("/:id").get(getSingleTimer).patch(updateTimer).delete(deleteTimer);

module.exports = router;
