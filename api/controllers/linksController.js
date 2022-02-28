const mongoose = require("mongoose");
const { Link, Tag } = require("../models/linkModels");

const createNewLink = async (req, res) => {
    //pass the body  into the response

    try {
        console.log(req.body);
        // const link = await Link.create(req.body);
        // res.status(201).send({ link });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};
const getAllTags = async (req, res) => {
    console.log(req);
    try {
        const tags = await Tag.find({});
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
const createTag = async (req, res) => {
    try {
        const link = await Tag.create(req.body);
        res.status(201).send({ link });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllTags,
    getAllLinks,
    createNewLink,
    createTag,
};
