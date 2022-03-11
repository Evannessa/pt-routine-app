const mongoose = require("mongoose");
const { createCustomError, CustomAPIError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const { Link, Tag, TagGroup } = require("../models/linkModels");

const createNewLink = asyncWrapper(async (req, res) => {
    //pass the body  into the response
    let name = req.body.name;
    let url = req.body.url;
    const obj = { name: name, url: url };
    const link = await Link.create(obj);
    res.status(201).send({ link });
});

const createMultipleNewLinks = asyncWrapper(async (req, res) => {
    async (req, res) => {
        let linkData = req.body;
        const newLinks = await Link.insertMany(linkData)
            .then((links) => res.json(links))
            .catch((error) => res.status(500).json({ msg: error }));
    };
});
const getAllTags = asyncWrapper(async (req, res, next) => {
    const tags = await Tag.find({});
    if (!tags) {
        return next(createCustomError(`No tags found`, 404));
    }
    res.status(200).json({ tags });
});

const getAllLinks = asyncWrapper(async (req, res, next) => {
    //name, url, type, tags, imagePath, text
    const { name, type, tags } = req.query;
    console.log("Query is", req.query);
    const queryObject = {};
    //if featured doesn't exist, it's not passed into the query, we don't put it in the object
    //we get all the products back if you pass something invalid
    if (type) {
        queryObject.type = type.toString();
    }
    if (name) {
        //mongo query data
        queryObject.name = { $regex: name.toString(), $options: "i" };
    }
    console.log(queryObject);
    const sets = await Link.find(queryObject)
        .populate("tags")
        .exec((error, links) => {
            if (error) {
                return next(createCustomError(`No links found`, 404));
            }
            return res.status(200).json({ links, nbHits: links.length });
        });
});
const getAllLinksStatic = asyncWrapper(async (req, res, next) => {
    const sets = await Link.find({})
        .populate("tags")
        .exec((error, links) => {
            if (error) {
                return next(createCustomError(`No links found`, 404));
            }
            return res.status(200).json({ links });
        });
});

const deleteLink = asyncWrapper(async (req, res) => {
    const { id: linkId } = req.params;
    const link = await Link.findOneAndDelete({ _id: linkId });
    if (!link) {
        return res.status(404).json({ msg: `No set found with ${linkId}` });
    }
    res.status(200).json({ link: link });
});

function removeTag(linkId, tagId) {}

const updateLink = asyncWrapper(async (req, res) => {
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
});

const createTag = asyncWrapper(async (req, res) => {
    const link = await Tag.create(req.body);
    res.status(201).send({ link });
});
const getLink = asyncWrapper(async (req, res, next) => {
    const { id: linkId } = req.params;
    const link = await Link.findOne({ _id: linkId }).populate("tags"); //get me the timer whose id is equal to request.params.id
    if (!link) {
        return next(createCustomError(`No link found with id ${linkId}`, 404));
    }
    return res.status(200).json({ link: link });
});

const createTagGroup = asyncWrapper(async (req, res) => {
    await TagGroup.create(req.body)
        .populate("Tags")
        .exec((error, group) => {
            if (error) {
                return res.status(500).json({ msg: error });
            }
            res.status(201).json({ group });
        });
});

const updateTagGroup = asyncWrapper(async (req, res) => {
    await TagGroup.findOneAndUpdate()
        .populate("Tags")
        .exec((error, group) => {
            if (error) {
                return res.status(500).json({ msg: error });
            }
            return res.status(201).json({ group });
        });
});

module.exports = {
    getLink,
    getAllTags,
    getAllLinks,
    createNewLink,
    createMultipleNewLinks,
    updateLink,
    deleteLink,
    createTag,
    createTagGroup,
    updateTagGroup,
};
