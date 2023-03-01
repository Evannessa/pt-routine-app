import React from "react";

export default function CountTimer(props) {
    const [time, setTime] = React.useState({
        hours: props.hours,
        minutes: props.minutes,
        seconds: props.seconds,
    });
    const [started, setStarted] = React.useState(false);
    const [paused, setPaused] = React.useState(false);
    const [atZero, setAtZero] = React.useState(false);
    const token = React.useRef();

    function runTime() {
        console.log(time.seconds);
        if (time.seconds === 0) {
            updateTime("minutes", time.minutes - 1);
            updateTime("seconds", 59);
            console.log("Seconds at zero!");
        } else {
            updateTime("seconds", time.seconds - 1);
        }
        // if (time.minutes === 0) {
        //     updateTime("hours", time.hours - 1);
        //     updateTime("minutes", 59);
        // }
        if (time.hours <= 0 && time.seconds <= 0 && time.minutes <= 0) {
            clearTimeout(token.current);
            updateTime("hours", 0);
            updateTime("minutes", 0);
            updateTime("seconds", 0);
            setStarted(false);
            setAtZero(true);
            props.setClockAtZero(props.id);
        }
    }
    //single time initialization
    React.useEffect(() => {
        if (props.autostart && !props.clockAtZero) {
            setStarted(true);
        }
    }, [paused, started, props.autostart]);

    React.useEffect(() => {
        if (paused) {
            clearTimeout(token.current);
            // setStarted(false);
        }
    }, [paused]);

    React.useEffect(() => {
        if (started && !paused) {
            console.log("This is running");
            token.current = setTimeout(runTime, 1000);
        }
        console.log("Time out set");
        console.log(time.seconds);

        return function cleanUp() {
            clearTimeout(token.current);
        };
    });

    function startTimer() {
        if (!started) {
            setStarted(true);
        }
    }
    function updateTime(propName, newValue) {
        setTime((prevTime) => {
            return {
                ...prevTime,
                [propName]: newValue,
            };
        });
    }

    function resetTimer() {}

    function cancelTimer() {}

    function stopTimer() {}

    function pauseTimer() {
        setPaused(true);
    }
    function resumeTimer() {
        setPaused(false);
        setStarted(true);
    }

    return (
        <div>
            <div className="timer">
                <div className="timer__values">
                    {props.hours > 0 && (
                        <div className="time-value">
                            <h3 className="value">
                                {String(parseInt(time.hours)).padStart(2, 0)}
                            </h3>
                        </div>
                    )}
                    <div className="time-value">
                        <h3 className="value">
                            {String(parseInt(time.minutes)).padStart(2, 0)}:
                        </h3>
                    </div>
                    <div className="time-value">
                        <h3 className="value">
                            {String(parseInt(time.seconds)).padStart(2, 0)}
                        </h3>
                    </div>
                </div>
                <div className="btn__wrapper">
                    {!started && !paused && (
                        <button className="timer__btn" onClick={startTimer}>
                            Start Timer
                        </button>
                    )}
                    {started && (
                        <button
                            className={`timer__btn ${paused ? "" : "ghost"}`}
                            onClick={paused ? resumeTimer : pauseTimer}>
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
        </div>
    );
}
