const mongoose = require("mongoose");
const asyncWrapper = require("../middleware/async");
const { Link, Tag, TagGroup } = require("../models/linkModels");

const createNewLink = asyncWrapper(async (req, res) => {
    //pass the body  into the response
    let name = req.body.name;
    let url = req.body.url;
    const obj = { name: name, url: url };
    const link = await Link.create(obj);
    res.status(201).send({ link });
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
});

const createMultipleNewLinks = async (req, res) => {
    let linkData = req.body;
    const newLinks = await Link.insertMany(linkData)
        .then((links) => res.json(links))
        .catch((error) => res.status(500).json({ msg: error }));
};

const getAllTags = async (req, res) => {
    console.log("Request is", req);
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
        const sets = await Link.find({})
            .populate("tags")
            .exec((error, links) => {
                if (error) {
                    return;
                }
                return res.status(200).json({ links });
            });
        // res.status(200).json({ sets });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const deleteLink = async (req, res) => {
    try {
        const { id: linkId } = req.params;
        const link = await Link.findOneAndDelete({ _id: linkId });
        if (!link) {
            return res.status(404).json({ msg: `No set found with ${linkId}` });
        }
        res.status(200).json({ link: link });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

function removeTag(linkId, tagId) {}

const updateLink = async (req, res) => {
    const { id: linkId } = req.params;
    //if we're not removing a tag
    console.log(req.body);
    let { propertyPath, update, action, filter } = req.body;
    let value = update;
    // let pathElements = req.body.propertyPath.split(".");

    if (propertyPath === "tags") {
        if (action === "insert") {
            //first, make sure the tag doesn't already exist
            const tagName = value;
            let tagId;
            try {
                tagId = await Tag.findOne({ name: tagName }).select("_id").lean();
                if (!tagId) {
                    await Tag.create({ name: tagName }).then((response) => {
                        tagId = response._id;
                    });
                }
            } catch (error) {
                console.log(error);
            }

            console.log("Our new tag id is", tagId);

            try {
                let linkTags = await Link.findOne({ _id: linkId }).select("tags").lean();
                console.log("Before", linkTags.tags);
                let mergedTags = [...linkTags.tags, tagId];
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
                        { tags: [...mergedTags] },
                        { new: true }
                    )
                        .populate("tags")
                        .exec((error, link) => {
                            return res.status(200).json({ link });
                        });
                    // return res.status(200).json({ link });
                } catch (error) {
                    console.log("Error is", error);
                    return res.status(500).json({ msg: error });
                }
            } catch (error) {
                res.status(500).json({ msg: error });
            }
        } else if (action === "remove") {
            //if we are removing
            const tagId = filter.id;
            try {
                let linkTags = await Link.findOne({ _id: linkId }).select("tags").lean();
                console.log("Tags already on this link are", linkTags);
                //filter out the removal
                linkTags = linkTags.tags.filter((tag) => !tag._id.equals(tagId));
                console.log("AFTeR Filtering link tags", linkTags);
                await Link.findOneAndUpdate(
                    { _id: linkId },
                    { tags: [...linkTags] },
                    { new: true }
                )
                    .populate("tags")
                    .exec((error, link) => {
                        if (error) {
                            return error;
                        }
                        return res.status(200).json({ link });
                    });
            } catch (error) {}
        }
    } else {
        try {
            const link = await Link.findByIdAndUpdate(
                linkId,
                { [propertyPath]: value },
                { new: true }
            )
                .populate("tags")
                .exec((error, link) => {
                    if (error) {
                        console.log(error);
                        return res.status(505).json({ msg: error });
                    }
                    return res.status(202).json({ link });
                });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error });
        }
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

const createTagGroup = async (req, res) => {
    try {
        await TagGroup.create(req.body)
            .populate("Tags")
            .exec((error, group) => {
                if (error) {
                    return res.status(500).json({ msg: error });
                }
                res.status(201).json({ group });
            });
    } catch (error) {}
};

const updateTagGroup = async (req, res) => {
    try {
        await TagGroup.findOneAndUpdate()
            .populate("Tags")
            .exec((error, group) => {
                if (error) {
                    return res.status(500).json({ msg: error });
                }
                return res.status(201).json({ group });
            });
    } catch (error) {}
};

module.exports = {
    getLink,
    getAllTags,
    getAllLinks,
    createNewLink,
    createMultipleNewLinks,
    updateLink,
    deleteLink,
    createTag,
};
