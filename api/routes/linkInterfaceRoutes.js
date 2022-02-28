const express = require("express");
const router = express.Router();
const {
    getAllTags,
    getAllLinks,
    createNewLink,
    createTag,
} = require("../controllers/linksController");

router.route("/").get(getAllLinks);
router.route("/tags").get(getAllTags).post(createTag);
router.route("/new").post(createNewLink);

module.exports = router;
