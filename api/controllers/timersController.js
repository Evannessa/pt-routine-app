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
// ====================================================== //
// ====================================================== //
// ====================================================== //

const updateMultipleSets = asyncWrapper(async (req, res) => {});

const getAllSets = async (req, res) => {
    try {
        const sets = await TimerSet.find({});
        res.status(200).json({ sets });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};
const getBlankSet = async (req, res) => {
    res.status(202).json({
        set: {
            label: "New Timer Set",
            timers: createDefaultTimers(3),
        },
    });
};
//create timer subdocument
function createNewTimer() {
    var id = new mongoose.Types.ObjectId();
    return {
        _id: id,
        label: "New Timer",
        time: {
            seconds: 0,
            minutes: 0,
            hours: 0,
        },
        slideImagePath: "",
    };
}
function createDefaultTimers(number) {
    let timers = [];
    for (let i = 0; i < number; i++) {
        var id = new mongoose.Types.ObjectId();
        timers.push({
            _id: id,
            label: "New Timer",
            time: {
                seconds: 0,
                minutes: 0,
                hours: 0,
            },
            slideImagePath: "",
        });
    }
    return timers;
}

const createNewSet = async (req, res) => {
    //pass the body  into the response
    try {
        const set = await TimerSet.create(req.body);
        res.status(201).send({ set });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

const getSingleSet = async (req, res) => {
    try {
        const { id: setId } = req.params;
        //use static function "findOne"
        const set = await TimerSet.findOne({ _id: setId }); //get me the timer whose id is equal to request.params.id
        if (!set) {
            return res.status(404).json({ msg: `No timer with id : ${setId}` }); //make sure that you ALWAYS have a return here so it exits  so you're not sending response after response
        }
        res.status(200).json({ set });
    } catch (error) {
        //! 2.this generic is just in case the syntax for the id is totally off
        res.status(500).json({ msg: error });
    }
};

const updateSet = async (req, res) => {
    const { id: setId } = req.params;
    try {
        const { parentProperty, childProperty, timerId, src } = req.body;
        let set;
        if (parentProperty && parentProperty === "timers" && timerId != "new") {
            //have to include the options object with new "true" to return the updated object
            //if we're updating one of the timers
            set = await TimerSet.findOneAndUpdate(
                { _id: setId }, //get parent TimerSet with this id
                { $set: { ["timers.$[el]." + `${childProperty}`]: src } }, //point to the specific element we want to update
                {
                    //options
                    new: true,
                    upsert: true,
                    runValidators: true,
                    arrayFilters: [{ "el._id": timerId }], //filtering the child array by the id
                }
            );
        } else if (timerId && timerId === "new") {
            let newTimer = createNewTimer();
            set = await TimerSet.findByIdAndUpdate(
                {
                    _id: setId,
                },
                { $push: { timers: { newTimer } } }
            );
        } else {
            set = await TimerSet.findOneAndUpdate(
                { _id: setId },
                { ...req.body },
                {
                    new: true,
                    upsert: true,
                    runValidators: true,
                    overwrite: true,
                }
            );
        }
        if (!set) {
            res.status(404).json({ msg: `No timer found with id ${setId}` });
        }
        res.status(200).json({ set });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};
const deleteSet = async (req, res) => {
    try {
        const { id: setId } = req.params;
        const set = await TimerSet.findOneAndDelete({ _id: setId });
        if (!set) {
            return res.status(404).json({ msg: `No set found with ${setId}` });
        }
        res.status(200).json({ set });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllSets,
    createNewSet,
    getBlankSet,
    getSingleSet,
    updateSet,
    deleteSet,
};
