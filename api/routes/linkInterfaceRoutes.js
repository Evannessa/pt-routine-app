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
    createFilterGroup,
    getFilterGroup,
    updateFilterGroup,
    getAllFilterGroups,
    deleteFilterGroup,
    deleteTag,
} = require("../controllers/linksController");
const { uploadImage } = require("../controllers/uploadsController");
router.route("/display").get(getAllLinks).post(createMultipleNewLinks);
router.route("/display/tags").get(getAllTags);
router.route("/display/tags/:id").delete(deleteTag);
router.route("/display/groups").post(createFilterGroup).get(getAllFilterGroups);
router
    .route("/display/groups/:id")
    .get(getFilterGroup)
    .patch(updateFilterGroup)
    .delete(deleteFilterGroup);
router.route("/display/:id").get(getLink).delete(deleteLink);
router.route("/create/tags").get(getAllTags).post(createTag);
router.route("/create/new").post(createNewLink);
router.route("/create/:id").get(getLink).patch(updateLink);
router.route("/create/:id/uploads").post(uploadImage);

module.exports = router;
