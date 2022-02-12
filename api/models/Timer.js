const mongoose = require("mongoose");

//this Mongoose schema  sets up the structure for all the documents in our collection
const TimerSchema = new mongoose.Schema({
    time: {
        type: Map,
        of: Number,
        default: {
            hours: 0,
            minutes: 0,
            seconds: 0,
        },
    },
    label: {
        type: String,
        trim: true,
    },
    slideImagePath: {
        type: String,
    },
});
const TimerSetSchema = new mongoose.Schema({
    label: {
        type: String,
        trim: true,
        required: true,
    },
    timers: [TimerSchema],
    youtubeLink: {
        type: String,
    },
    spotifyLink: {
        type: String,
    },
});

//? model is wrapper around schema
module.exports = {
    Timer: mongoose.model("Timer", TimerSchema),
    TimerSet: mongoose.model("TimerSet", TimerSetSchema),
};
