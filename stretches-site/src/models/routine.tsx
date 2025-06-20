import { nanoid } from "nanoid"
export interface Time {
    hours: number,
    minutes: number,
    seconds: number
}

export interface TimeElementOptions {
    _id: string
    label: string,
    slideImagePath: string,
    description: string,
    autostart?: boolean,
    repeatNumber?: number

}

export class TimeElement {

    _id: string
    label: string // the label of the routine or exercise
    slideImagePath: string  // path of the image that will appear/represent this routine or exercise 
    description: string
    autostart: boolean // does the routine/exercise start on its own   
    repeatNumber: number // how many times does this repeat 

    constructor(options: TimeElementOptions) {
        this._id = options._id || nanoid() 
        this.label = options.label || ""
        this.description = options.description || ""
        this.slideImagePath = options.slideImagePath || ""
        this.autostart = options.autostart || false
        this.repeatNumber = options.repeatNumber || 0
    }
}

export interface TimerOptions extends TimeElementOptions {
    time: Time;
    isBreak: boolean;
    isAutoBreak: boolean;
}
export class Timer extends TimeElement {
    //the time of this exercise in hours, minutes, and seconds
    time: Time
    isBreak: boolean // is this a break
    isAutoBreak: boolean  // is this a break that starts on its own

    constructor(options: TimerOptions) {
        super(options)
        this.time = options.time || {
            hours: 0,
            minutes: 0,
            seconds: 5
        }
        this.isBreak = options.isBreak || false
        this.isAutoBreak = options.isAutoBreak || false
    }
}
export class Routine extends TimeElement {

    timers: Timer[];

    youtubeLink: string;

    spotifyLink: string;
    autoBreakTimer: Timer = new Timer({
        _id: nanoid(),
        label: "Break",
        description: "Take a few moments to rest",
        slideImagePath: "",
        time: {
            hours: 0,
            minutes: 0,
            seconds: 5,
        },
        isBreak: true,
        isAutoBreak: true,
    });
    autoBreakTime: Time = {
        hours: 0,
        minutes: 0,
        seconds: 5,
    };

};