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

router.route("/display").get(getAllLinks);
router.route("/display/:id").get(getLink);
router.route("/create/tags").get(getAllTags).post(createTag);
router.route("/create/new").post(createNewLink);
router.route("/create/:id").get(getLink).patch(updateLink);

module.exports = router;
