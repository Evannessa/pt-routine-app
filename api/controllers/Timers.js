const { Timer, TimerSet } = require("../models/Timer");
console.log(Timer, TimerSet);

const getAllSets = async (req, res) => {
    try {
        const sets = await TimerSet.find({});
        res.status(200).json({ sets });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};
const getAllTimers = async (req, res) => {
    try {
        const timers = await Timer.find({}); //with nothing in the object, it'll get all the functions
        res.status(200).json({ timers }); //es6 shorthand: same as {timers: timers}
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};
const createTimer = async (req, res) => {
    //pass the body  into the response
    try {
        const timer = await Timer.create(req.body);
        res.status(201).send({ timer });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};
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
const getSingleTimer = async (req, res) => {
    try {
        //! V alias timerId for the id
        const { id: timerId } = req.params;
        //use static function "findOne"
        const timer = await Timer.findOne({ _id: timerId }); //get me the timer whose id is equal to request.params.id
        if (!timer) {
            //if the timer is null
            //! 1.this id is if nothing in our collection matches
            return res.status(404).json({ msg: `No timer with id : ${timerId}` }); //make sure that you ALWAYS have a return here so it exits  so you're not sending response after response
        }

        res.status(200).json({ timer });
    } catch (error) {
        //! 2.this generic is just in case the syntax for the id is totally off
        res.status(500).json({ msg: error });
    }
};
const updateTimer = async (req, res) => {
    try {
        const { id: timerId } = req.params;
        //have to include the options object
        const timer = await Timer.findOneAndUpdate({ _id: timerId }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!timer) {
            res.status(404).json({ msg: `No timer found with id ${timerId}` });
        }
        res.status(200).json({ timer });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};
const deleteTimer = async (req, res) => {
    try {
        const { id: timerId } = req.params;
        const timer = await Timer.findOneAndDelete({ _id: timerId });
        if (!timer) {
            return res.status(404).json({ msg: `No timer found with ${timerId}` });
        }
        res.status(200).json({ timer });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllTimers,
    getAllSets,
    createNewSet,
    createTimer,
    getSingleTimer,
    updateTimer,
    deleteTimer,
};
