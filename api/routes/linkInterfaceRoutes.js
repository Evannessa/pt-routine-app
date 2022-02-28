const express = require("express");
const router = express.Router();
const {
    getLink,
    getAllTags,
    getAllLinks,
    createNewLink,
    updateLink,
    createTag,
} = require("../controllers/linksController");

router.route("/").get(getAllLinks);
router.route("/tags").get(getAllTags).post(createTag);
router.route("/new").post(createNewLink);
router.route("/:id").get(getLink).patch(updateLink);

module.exports = router;
