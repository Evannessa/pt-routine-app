import React from "react";
import Timer from "./Timer";
import CountTimer from "./CountTimer";
import ProgressCircle from "./ProgressCircle";
import { nanoid } from "nanoid";
import Slide from "./Slide";
import { CSSTransitionGroup } from "react-transition-group";

export default function ActiveTimerDisplay() {
    function createTimer(key, id, hours, minutes, seconds, autostart, type) {
        return {
            key: key,
            id: id,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            autostart: autostart,
            type: type,
        };
    }
    const [currentClock, setCurrentClock] = React.useState(0);
    // const [timers, setTimers] = React.useState([
    //     createTimer(nanoid(), nanoid(), 0, 0, 15, false, "main"),
    //     createTimer(nanoid(), nanoid(), 0, 0, 10, true, "break"),
    //     createTimer(nanoid(), nanoid(), 0, 0, 12, true, "main"),
    //     createTimer(nanoid(), nanoid(), 0, 0, 10, true, "break"),
    // ]);

    //!TODO: add way to choose from sets of timers like Timer List component
    //for stored/saved timers
    const [timers, setTimers] = React.useState(
        JSON.parse(localStorage.getItem("previewTimers")) || ""
    );
    //for an running timers to store its time
    const [activeTimerData, setActiveTimerData] = React.useState(
        JSON.parse(localStorage.getItem("activeTimers")) || ""
    );
    const [completed, setCompleted] = React.useState(false);
    const [slides, setSlides] = React.useState([
        "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2106037/pexels-photo-2106037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/567540/pexels-photo-567540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1368521/pexels-photo-1368521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ]);

    function updateTime(time) {
        setActiveTimerData(time);
    }

    React.useEffect(() => {
        localStorage.setItem("previewTimers", JSON.stringify(activeTimerData));
    }, [activeTimerData]);

    let timerComponents = timers.map((timer) => {
        return (
            <CountTimer
                key={timer.key}
                id={timer.id}
                hours={timer.time.hours}
                minutes={timer.time.minutes}
                seconds={timer.time.seconds}
                description={timer.description}
                setClockAtZero={setClockAtZero}
                clockAtZero={timer.clockAtZero}
                autostart={timer.autostart}
            ></CountTimer>
        );
    });
    let slideComponents = slides.map((slide) => {
        return <Slide image={slide} />;
    });
    React.useEffect(() => {
        let clockAtZero = timers[currentClock].clockAtZero;
        if (clockAtZero) {
            if (currentClock + 1 < timers.length) {
                setCurrentClock((oldClock) => (oldClock += 1));
                console.log("Move to next clock", currentClock);
            } else {
                console.log("Have run all clocks");
                setCompleted(true);
            }
        }
    }, [timers]);

    function setClockAtZero(id) {
        setTimers((oldTimers) =>
            oldTimers.map((timer) => {
                return timer.id === id ? { ...timer, clockAtZero: true } : timer;
            })
        );
    }
    return (
        <div
            className={`active-timer-display ${
                timers[currentClock].type === "break" ? "break" : ""
            }`}
        >
            {timers ? (
                <div>
                    {slideComponents[currentClock]}
                    <p className="preview-timer__number">Clock Number {currentClock}</p>
                    {timerComponents[currentClock]}
                </div>
            ) : (
                <p>No timers</p>
            )}
        </div>
    );
}
