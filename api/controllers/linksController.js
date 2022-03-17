const mongoose = require("mongoose");
const { createCustomError, CustomAPIError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const { Link, Tag, TagGroup, FilterGroup, Filter } = require("../models/linkModels");

async function create(type, req, res) {
    const document = await type.create({ ...req.body });
    return res.status(201).json({ document });
}
async function findOrCreate(type, req, res) {
    let document = await type.findOne({ ...req.body });
    //if it doesn't exist, create it, else, return it
    if (!document) {
        document = await type.create({ ...req.body });
        return res.status(201).json({ document });
    }
    return res.status(201).json({ document });
}
async function createMultiple(type, req, res) {
    const document = await type
        .insertMany(req.body)
        .then((document) => res.status(201).json(document))
        .catch((error) => res.status(500).json({ msg: error }));
}
async function getSingle(type, req, res, next, name, populateWith) {
    const { id } = req.params;
    const document = await type.findOne({ _id: id }).populate(populateWith);
    if (!document) {
        return next(createCustomError(`No ${name} found with id ${id}`, 404));
    }
    return res.status(200).json({ document });
}
async function getAll(type, req, res, next, name, populateWith = "") {
    const document = await type.find({});
    if (!document) {
        return next(createCustomError(`No ${name}s found`, 404));
    }
    if (populateWith) {
        return populate(document, populateWith, name);
    } else {
        return res.status(200).json({ document });
    }
}
async function populate(document, populateWith, name) {
    document.populate(populateWith).exec((error, document) => {
        if (error) {
            return next(createCustomError(`No ${name} found`, 404));
        }
        return res.status(200).json({ document });
    });
}
async function deleteSingle(type, req, res, next, name) {
    const { id } = req.params;
    const document = await type.findOneAndDelete({ _id: id });
    if (!document) {
        return next(createCustomError(`No ${name} found`), 404);
    }
    return res.status(200).json({ document });
}
async function updateSingle(type, req, res, next, name, populateWith = "") {
    const { id } = req.params;
    const document = await type
        .findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
        .populate(populateWith);
    if (!document) {
        return next(createCustomError(`No ${name} found with id ${id}`, 404));
    }
    return res.status(200).json({ document });
    if (populateWith) {
        return populate(document, populateWith, name);
    } else {
        return res.status(200).json({ document });
    }
}
async function updateSubDocument(type, req, res, next, name) {}

async function deleteMultiple(type, req, res, next, name) {
    const document = await type.deleteMany(req.body);
    if (document.deleteCount === 0) {
        return next(createCustomError(`No documents deleted`), 404);
    }
    return res.status(200).json({ document });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
const createNewLink = asyncWrapper(async (req, res) => {
    //pass the body  into the response
    return create(Link, req, res);
    // let name = req.body.name;
    // let url = req.body.url;
    // const obj = { name: name, url: url };
    // const link = await Link.create(obj);
    // res.status(201).send({ link });
});

const createMultipleNewLinks = asyncWrapper(async (req, res) => {
    return createMultiple(Link, req, res);
    // async (req, res) => {
    //     let linkData = req.body;
    //     const newLinks = await Link.insertMany(linkData)
    //         .then((links) => res.json(links))
    //         .catch((error) => res.status(500).json({ msg: error }));
    // };
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
        .exec((error, document) => {
            if (error) {
                return next(createCustomError(`No links found`, 404));
            }
            return res.status(200).json({ document });
            // return res.status(200).json({ links, nbHits: links.length });
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

const deleteLink = asyncWrapper(async (req, res, next) => {
    return deleteSingle(Link, req, res, next, "Link");
    // const { id: linkId } = req.params;
    // const link = await Link.findOneAndDelete({ _id: linkId });
    // if (!link) {
    //     return res.status(404).json({ msg: `No set found with ${linkId}` });
    // }
    // res.status(200).json({ link: link });
});

//TODO: Update this to be cleaner, oof
const updateLink = asyncWrapper(async (req, res, next) => {
    return updateSingle(Link, req, res, next, "Link", "tags");
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

const getLink = asyncWrapper(async (req, res, next) => {
    return getSingle(Link, req, res, next, "Link", "tags");
    // const { id: linkId } = req.params;
    // const link = await Link.findOne({ _id: linkId }).populate("tags"); //get me the timer whose id is equal to request.params.id
    // if (!link) {
    //     return next(createCustomError(`No link found with id ${linkId}`, 404));
    // }
    // return res.status(200).json({ link: link });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const createTag = asyncWrapper(async (req, res) => {
    return findOrCreate(Tag, req, res);
    // const document = await Tag.create(req.body);
    // res.status(201).send({ document });
});

const getAllTags = asyncWrapper(async (req, res, next) => {
    return getAll(Tag, req, res, next, "tag");
    // const tags = await Tag.find({});
    // if (!tags) {
    //     return next(createCustomError(`No tags found`, 404));
    // }
    // res.status(200).json({ tags });
});

const deleteTag = asyncWrapper(async (req, res, next) => {
    return deleteSingle(Tag, req, res, next, "tag");
});

function removeTag(linkId, tagId) {}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

/**
 *
 */
const createFilter = asyncWrapper(async (req, res) => {
    return create(Filter, req, res);
});

const getAllFilters = asyncWrapper(async (req, res, next) => {
    return getAll(Filter, req, res, next, "Filter Group", "");
});

const deleteFilter = asyncWrapper(async (req, res, next) => {
    return deleteSingle(Filter, req, res, next, "Filter Group");
});
/**
 *
 */
const getFilter = asyncWrapper(async (req, res, next) => {
    return getSingle(Filter, req, res, next, "Filter Group");
});

const updateFilter = asyncWrapper(async (req, res, next) => {
    return updateSingle(Filter, req, res, next, "Filter Group");
});
/**
 *
 */
const createFilterGroup = asyncWrapper(async (req, res, next) => {
    return create(FilterGroup, req, res);
});
const getAllFilterGroups = asyncWrapper(async (req, res, next) => {
    return getAll(FilterGroup, req, res, next, "Filter Collection", "");
});

const deleteFilterGroup = asyncWrapper(async (req, res, next) => {
    return deleteSingle(FilterGroup, req, res, next, "Filter Group");
});
const deleteMultipleFilterGroups = asyncWrapper(async (req, res, next) => {
    return deleteMultiple(FilterGroup, req, res, next, "Filter Group");
});
/**
 *
 */
const getFilterGroup = asyncWrapper(async (req, res, next) => {
    return getSingle(FilterGroup, req, res, next, "Filter Group");
});

const updateFilterGroup = asyncWrapper(async (req, res, next) => {
    return updateSingle(FilterGroup, req, res, next, "Filter Group");
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
    deleteTag,
    createFilterGroup,
    getFilterGroup,
    updateFilterGroup,
    getAllFilterGroups,
    deleteFilterGroup,
    deleteMultipleFilterGroups,
};
