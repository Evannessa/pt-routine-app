const mongoose = require("mongoose");
const { Timer, TimerSet } = require("../models/timerModels");
const { createCustomError, CustomAPIError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
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
        console.log("No document found with that id")
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
    console.log(document, id);
    if (!document) {
        return next(createCustomError(`No ${name} found`), 404);
    }
    return res.status(200).json({ document });
}
async function updateSingle(type, req, res, next, name, populateWith = "") {
    const { id } = req.params;
    console.log("Updating single", id, req.params, req.body)
    const document = await type
        .findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
        .populate(populateWith);
    if (!document) {
        return next(createCustomError(`No ${name} found with id ${id}`, 404));
    }
    return res.status(200).json({ document });

}
async function updateSubDocument(type, req, res, next, name) { }

async function deleteMultiple(type, req, res, next, name) {
    const document = await type.deleteMany(req.body);
    if (document.deleteCount === 0) {
        return next(createCustomError(`No documents deleted`), 404);
    }
    return res.status(200).json({ document });
}
// ====================================================== //
// ====================================================== //
// ====================================================== //

const updateMultipleSets = asyncWrapper(async (req, res) => { });

const getAllSets = async (req, res, next) => {
    return getAll(TimerSet, req, res, next, "TimerSet");

};
const getBlankSet = async (req, res) => {

    let id = new mongoose.Types.ObjectId();
    res.status(202).json({
        document: {
            "_id": id,
            "label": "New Timer Set",
            "timers":
                createDefaultTimers(3)
            ,
            "youtubeLink": "",
            "spotifyLink": "",
            "repeatNumber": 1,
        }
    }
    );
};

async function returnBlankSet() {
    let timers = await createDefaultTimers(3)
    console.log("Our timers are", timers)
    return {
        // "_id": id,
        "label": "New Timer Set",
        "timers":
            [...timers]
        ,
        "youtubeLink": "",
        "spotifyLink": "",
        "repeatNumber": 1,
    }
}
//create timer subdocument
function createNewTimer(newId = true) {
    let id = new mongoose.Types.ObjectId();
    return {
        ...(newId && { _id: id }),
        label: "New Timer",
        time: {
            seconds: 0,
            minutes: 0,
            hours: 0,
        },
        slideImagePath: "",
        description: "",
        autostart: false,
        isBreak: false
    };
}
async function newTimer() {
    const data = {
        label: "New Timer",
        time: {
            seconds: 0,
            minutes: 0,
            hours: 0,
        },
        slideImagePath: "",
    }
    const newTimer = await Timer.create(data)
    return newTimer
}
async function createDefaultTimers(number) {
    let timers = [];
    for (let i = 0; i < number; i++) {
        const data = {
            label: "New Timer",
            time: {
                seconds: 0,
                minutes: 0,
                hours: 0,
            },
            slideImagePath: "",
        }
        const newTimer = await Timer.create(data)
        timers.push(newTimer)
        // timers.push({
        //     _id: id,
        //     label: "New Timer",
        //     time: {
        //         seconds: 0,
        //         minutes: 0,
        //         hours: 0,
        //     },
        //     slideImagePath: "",
        // });
    }
    return timers;
}

const createNewSet = async (req, res) => {
    //pass the body  into the response
    const blank = await returnBlankSet()
    console.log("Blank set is", blank)
    try {
        const set = await TimerSet.create(blank);
        // const _newTimer = createNewTimer(true)
        // console.log(_newTimer)
        // set._doc.timers.push({ ..._newTimer })
        // const set = await TimerSet.create(req.body);
        console.log("Set is", { ...set })
        res.status(201).send({ document: set });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ msg: error });
    }
};

const getSingleSet = async (req, res, next) => {
    const singleSet = await getSingle(TimerSet, req, res, next, "TimerSet")
    return singleSet
};

const updateSet = async (req, res) => {
    const singleSet = await updateSingle(TimerSet, req, res)
    return singleSet//updateSingle(TimerSet, req);
};

const deleteSet = async (req, res, next) => {
    const singleSet = await deleteSingle(TimerSet, req, res, next, "TimerSet")
    return singleSet

};

module.exports = {
    getAllSets,
    createNewSet,
    getBlankSet,
    getSingleSet,
    updateSet,
    deleteSet,
};
