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
        link = await Link.findById({ _id: linkId })
            .then((doc) => {
                // console.log(doc);
                newTags = newTags.filter((value) => !doc.tags.includes(value));
                return doc;
            })
            .then(async (doc) => {
                let link = await Link.updateOne(
                    { _id: doc._id },
                    { name: name, url: url, tags: [...doc.tags, ...newTags] },
                    { new: true }
                ).then((error, newDoc) => console.log("New doc?", error, newDoc));
            })
            .populate("tags");
        // .exec((error, tag) => {
        //     if (error) {
        //         console.log(error);
        //         return error;
        //     }
        //     res.status(200).json({ tag });
        //     console.log("The tag is %s", tag);
        //     return;
        // });
        // link = await Link.findByIdAndUpdate(
        //     { _id: linkId },
        //     {
        //         name: name,
        //         url: url,
        //         tags: { $addToSet: { $each: newTags.map((tag) => tag._id) } },
        //     },
        //     { new: true }
        //     // ).then((response) => console.log(response));
        // ).populate("tags");

        console.log("ink is", link);

        console.log(link.populated("tags")); // this returns array of ObjectIds
        console.log(link.tags[0].name); //this returns actual tag

        // res.status(200).json({ link });
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
        const link = await Link.findOne({ _id: linkId }); //get me the timer whose id is equal to request.params.id
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
