const express = require("express");
const router = express.Router();
const {
    getLink,
    getAllTags,
    getAllLinks,
    createNewLink,
    createMultipleNewLinks,
    updateLink,
    deleteLink,
    createTag,
} = require("../controllers/linksController");

router.route("/display").get(getAllLinks).post(createMultipleNewLinks);
router.route("/display/tags").get(getAllTags);
router.route("/display/:id").get(getLink).delete(deleteLink);
router.route("/create/tags").get(getAllTags).post(createTag);
router.route("/create/new").post(createNewLink);
router.route("/create/:id").get(getLink).patch(updateLink);

module.exports = router;
