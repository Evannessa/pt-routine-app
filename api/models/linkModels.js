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
        default: "External",
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

module.exports = {
    Link: mongoose.model("Link", LinkSchema),
    Tag: mongoose.model("Tag", TagSchema),
};
