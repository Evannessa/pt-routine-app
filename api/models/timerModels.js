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
    description: {
        type: String,
    },
    autostart: {
        type: Boolean,
        required: true,
        default: false,
    },
    isBreak: { type: Boolean, required: true, default: false },
    isRep: {
        type: Boolean,
        required: true,
        default: false,
    }
});
const TimerSetSchema = new mongoose.Schema({
    label: {
        type: String,
        trim: true,
        required: true,
        default: "New Timer Set",
    },
    timers: [new mongoose.Schema({
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
        description: {
            type: String,
        },
        autostart: {
            type: Boolean,
            required: true,
            default: false,
        },
        isBreak: { type: Boolean, required: true, default: false },
        isAutoBreak: { type: Boolean, required: true, default: false },
        repeatNumber: { type: Number, required: true, default: 0 },
  isRep: {

        type: Boolean,
        required: true,
        default: false,
    }
    })],
    youtubeLink: {
        type: String,
        default: "",
    },
    spotifyLink: {
        type: String,
        default: "",
    },
    repeatNumber: { type: Number, required: true, default: 0 },
    autoBreakTimer: {
        type: Map,
        required: true,
        default: {
            label: "Break",
            description: "Take a few moments to rest",
            slideImagePath: "",
            time: {
                hours: 0,
                minutes: 0,
                seconds: 5,
            }
        }
    },
    label: {
            type: String,
            trim: true,
        },
        slideImagePath: {
            type: String,
        },
        description: {
            type: String,
        },
        autostart: {
            type: Boolean,
            required: true,
            default: false,
        },
        // isBreak: { type: Boolean, required: true, default: false },
        // isAutoBreak: { type: Boolean, required: true, default: false },
        // repeatNumber: { type: Number, required: true, default: 0 },
    autoBreakTime: {type: Map, of:Number, required: true, default: {
        hours: 0,
        minutes: 0,
        seconds: 5,
    }}
});

//? model is wrapper around schema
module.exports = {
    Timer: mongoose.model("Timer", TimerSchema),
    TimerSet: mongoose.model("TimerSet", TimerSetSchema),
};
