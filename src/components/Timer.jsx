import React, { useEffect } from "react";
import IntervalTimer from "../classes/IntervalTimer";

export default function Timer(props) {
    // const endTime = Date.now() + 30 * 60 * 1000;

    const storedEndTime = React.useRef();
    const pauseTimestamp = React.useRef();
    const storedTime = React.useRef();
    const endTime = React.useRef(
        Date.now() +
            (props.hours > 0 ? props.hours : 1) *
                (props.minutes > 0 ? props.minutes : 1) *
                (props.seconds > 0 ? props.seconds : 1) *
                1000
    );
    // if (pauseTimestamp && pauseTimestamp.current && storedTime && storedTime.current) {
    //     endTime.current =
    //         storedEndTime.current +
    //         storedTime.current.hours *
    //             storedTime.current.minutes *
    //             storedTime.current.seconds *
    //             1000;
    //     // Date.now() +
    //     // (pauseTimestamp.current - Date.now()) +
    //     // storedTime.current.hours *
    //     //     storedTime.current.minutes *
    //     //     storedTime.current.seconds *
    //     //     1000;
    // }
    const [time, setTime] = React.useState({ hours: 0, minutes: 0, seconds: 0 });
    const [timer, setTimer] = React.useState(null);
    const [paused, setPaused] = React.useState(false);
    const [started, setStarted] = React.useState(false);

    function convertToMinutes(value) {
        return (value / 60000) % 60;
    }
    function convertToSeconds(value) {
        return (value / 1000) % 60;
    }
    function startTimer() {
        if (!storedTime.current) {
            console.log("Start time is", new Date(Date.now()).toString());
        }
        var d = new Date(endTime.current);
        console.log("End time is", d.toString());
        if (storedTime.current) {
            console.log(
                "starting again: ",
                storedTime.current.hours +
                    " : " +
                    storedTime.current.minutes +
                    " : " +
                    storedTime.current.seconds
            );
            // console.log(
            //     "Difference is",
            //     convertToSeconds(pauseTimestamp.current - Date.now()),
            //     "Pause timestamp: " + convertToSeconds(pauseTimestamp.current),
            //     "Current date.now(): " + convertToSeconds(Date.now())
            // );
        }
        // let myInterval = setInterval(() => {
        //     console.log("Remaining time is ", getRemainingTime(endTime));
        //     if (getRemainingTime(endTime) <= 0) {
        //         clearInterval(myInterval);
        //         // props.stopTimer();
        //         return;
        //     }
        //     animateTime();
        // }, 1000);
        if (paused) {
            setPaused(false);
        }
        let anim = requestAnimationFrame(animateTime);
        setTimer(anim);
        setStarted(true);
        // unpause timer
    }

    function storePauseTime() {
        storedTime.current = {
            hours: parseInt(time.hours),
            minutes: parseInt(time.minutes),
            seconds: parseInt(time.seconds),
        };
        pauseTimestamp.current = Date.now();
        storedEndTime.current = endTime.current;
    }

    function pauseTimer() {
        storePauseTime();

        cancelAnimationFrame(timer);
        console.log("Canceled timer", timer);
        setPaused(true);
    }

    function cancelTimer() {
        cancelAnimationFrame(timer);
        setTime({ hours: 0, minutes: 0, seconds: 0 });
    }

    function updateTime(propName, newValue) {
        setTime((prevTime) => {
            return {
                ...prevTime,
                [propName]: newValue,
            };
        });
    }

    function getRemainingTime(deadline) {
        // let currentTime = props.pauseTimestamp ? props.pauseTimestamp : Date.now();
        let currentTime = Date.now();
        // (pauseTimestamp.current ? Math.abs(Date.now() - pauseTimestamp.current) : 0);
        return deadline - currentTime;
    }

    const animateTime = (thisTime) => {
        console.log(
            getRemainingTime(endTime.current) / 1000 <= 1,
            getRemainingTime(endTime.current) / 1000
        );
        if (getRemainingTime(endTime.current) / 1000 <= 1) {
            props.setClockAtZero(props.id);
            console.log(props.setClockAtZero);
            console.log("IS ZERO");
            cancelAnimationFrame(timer);
            // props.stopTimer();
            return;
        }
        let remainingTime = getRemainingTime(endTime.current);
        updateTime("seconds", (remainingTime / 1000) % 60);
        updateTime("minutes", (remainingTime / (60 * 1000)) % 60);
        updateTime("hours", (remainingTime / (60 * 60 * 1000)) % 60);
        if (thisTime >= 1000) {
            let anim = requestAnimationFrame(animateTime);
            setTimer(anim);
        }
    };

    return (
        <div className="timer">
            <h1 className="timer__values">
                {props.hours > 0 && String(parseInt(time.hours)).padStart(2, 0)}
                {String(parseInt(time.minutes)).padStart(2, 0)}:
                {String(parseInt(time.seconds)).padStart(2, 0)}
            </h1>
            <div className="btn__wrapper">
                {!started && (
                    <button className="timer__btn" onClick={startTimer}>
                        Start Timer
                    </button>
                )}
                {started && (
                    <button
                        className={`timer__btn ${paused ? "" : "ghost"}`}
                        onClick={paused ? startTimer : pauseTimer}
                    >
                        {paused ? "Continue" : "Pause"}
                    </button>
                )}
                {started && (
                    <button className="timer__btn ghost" onClick={cancelTimer}>
                        Reset
                    </button>
                )}
                {paused && (
                    <button className="timer__btn ghost" onClick={cancelTimer}>
                        Stop
                    </button>
                )}
            </div>
        </div>
    );
}
