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


router.route("/").get(getAllSets); 
router.route("/new").get(getBlankSet).post(createNewSet);
router.route("/uploads").get(getAllUploads);
router.route("/:id").get(getSingleSet).patch(updateSet).delete(deleteSet);
router.route("/:id/uploads").post(uploadImage)


module.exports = router;
