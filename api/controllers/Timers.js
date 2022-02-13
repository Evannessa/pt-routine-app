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
const getBlankSet = async (req, res) => {
    res.status(202).json({
        set: {
            label: "New Timer Set",
            timers: createDefaultTimers(3),
        },
    });
};
function createDefaultTimers(number) {
    let timers = [];
    for (let i = 0; i < number; i++) {
        timers.push({
            label: "New Timer",
            time: {
                seconds: 0,
                minutes: 0,
                hours: 0,
            },
        });
    }
    return timers;
}
// const getAllTimers = async (req, res) => {
//     try {
//         const timers = await Timer.find({}); //with nothing in the object, it'll get all the functions
//         res.status(200).json({ timers }); //es6 shorthand: same as {timers: timers}
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// };
// const createTimer = async (req, res) => {
//     //pass the body  into the response
//     try {
//         const timer = await Timer.create(req.body);
//         res.status(201).send({ timer });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// };
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
// const getSingleTimer = async (req, res) => {
//     try {
//         //! V alias timerId for the id
//         const { id: timerId } = req.params;
//         //use static function "findOne"
//         const timer = await Timer.findOne({ _id: timerId }); //get me the timer whose id is equal to request.params.id
//         if (!timer) {
//             //if the timer is null
//             //! 1.this id is if nothing in our collection matches
//             return res.status(404).json({ msg: `No timer with id : ${timerId}` }); //make sure that you ALWAYS have a return here so it exits  so you're not sending response after response
//         }

//         res.status(200).json({ timer });
//     } catch (error) {
//         //! 2.this generic is just in case the syntax for the id is totally off
//         res.status(500).json({ msg: error });
//     }
// };
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
    try {
        const { id: setId } = req.params;
        //have to include the options object
        const set = await TimerSet.findOneAndUpdate({ _id: setId }, req.body, {
            new: true,
            runValidators: true,
        });
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
