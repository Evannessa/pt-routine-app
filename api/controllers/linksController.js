const mongoose = require("mongoose");
const { Link, Tag } = require("../models/linkModels");

const createNewLink = async (req, res) => {
    //pass the body  into the response

    try {
        console.log(req.body);
        let name = req.body.name;
        let url = req.body.url;
        const obj = { name: name, url: url };
        const link = await Link.create(obj);
        res.status(201).send({ link });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};
const getAllTags = async (req, res) => {
    console.log(req);
    try {
        const tags = await Tag.find({});
        console.log(tags);
        if (tags) {
            res.status(200).json({ tags });
        } else {
            res.status(404).json({ msg: "No tags found" });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
        console.log(error);
    }
};

const getAllLinks = async (req, res) => {
    try {
        const sets = await Link.find({});
        res.status(200).json({ sets });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};
const updateLink = async (req, res) => {
    const { id: linkId } = req.params;
    const { name, url, tags } = req.body;
    let link;
    let newTags = [];
    for (let tagName of tags) {
        let oldTagId;
        //see if the tag exists, and add it to the newTags array
        try {
            let oldTag = await Tag.findOne({ name: tagName });
            if (oldTag) {
                oldTagId = oldTag._id;
            }
            // oldTagId = await Tag.findOne({ name: tagName }).select("_id").lean();
        } catch (error) {
            console.log(error);
        }
        //add it to new tags array
        if (oldTagId) {
            newTags.push(oldTagId);
        }
        //if it doesn't exist, create a new one
        else {
            try {
                await Tag.create({ name: tagName }).then((response) => {
                    newTags.push(response._id);
                });
            } catch (error) {
                if (error.name === "MongoServerError" && error.code === 11000) {
                    console.log("Tag already exists");
                }
            }
        }
    }
    console.log("Our tags are", newTags);

    try {
        let linkTags = await Link.findOne({ _id: linkId }).select("tags").lean();
        console.log("Before", linkTags.tags);
        let mergedTags = [...linkTags.tags, ...newTags];
        //unique
        mergedTags = mergedTags.reduce((unique, object) => {
            if (!unique.some((obj) => obj._id.equals(object._id))) {
                unique.push(object);
            }
            return unique;
        }, []);
        console.log("After", mergedTags);
        try {
            link = await Link.findByIdAndUpdate(
                { _id: linkId },
                { name: name, url: url, tags: [...mergedTags] },
                { new: true }
            )
                .populate("tags")
                .exec((error, obj) => console.log(error, obj));
            return res.status(200).json({ link });
        } catch (error) {
            console.log("Error is", error);
            return res.status(500).json({ msg: error });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const createTag = async (req, res) => {
    try {
        const link = await Tag.create(req.body);
        res.status(201).send({ link });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};
const getLink = async (req, res) => {
    try {
        const { id: linkId } = req.params;
        //use static function "findOne"
        const link = await Link.findOne({ _id: linkId }).populate("tags"); //get me the timer whose id is equal to request.params.id
        console.log("Link is", link);
        if (!link) {
            return res.status(404).json({ msg: `No timer with id : ${linkId}` }); //make sure that you ALWAYS have a return here so it exits  so you're not sending response after response
        }
        res.status(200).json({ link: link });
    } catch (error) {
        //! 2.this generic is just in case the syntax for the id is totally off
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getLink,
    getAllTags,
    getAllLinks,
    createNewLink,
    updateLink,
    createTag,
};
