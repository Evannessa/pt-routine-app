const mongoose = require("mongoose");
const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        required: true,
        default: "#212121",
    },
});
const FilterGroupSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        default: "New Category",
        required: true,
    },
    propertyChoice: {
        type: String,
        enum: ["name", "tags", "url"],
        default: "name",
    },
    relation: ["equal"],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});
const TagGroupSchema = new mongoose.Schema({
    name: {},
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});
const LinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: "External", //TODO: turn this to enum value later
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    text: "",
    imagePath: "",
});

module.exports = {
    Link: mongoose.model("Link", LinkSchema),
    Tag: mongoose.model("Tag", TagSchema),
    TagGroup: mongoose.model("TagGroup", TagGroupSchema),
};
