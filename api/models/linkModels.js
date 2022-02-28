const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
    },
});

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

module.exports = {
    Link: mongoose.model("Link", LinkSchema),
    Tag: mongoose.model("Tag", TagSchema),
};
