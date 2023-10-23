import React, { useRef } from "react";
import styled from "styled-components";
import repeatIcon from "../images/refresh-symbol.png"
import { useAudio } from "./AudioPlayer";
import useSound from "use-sound"
import { urls } from "../helpers/requests";
import bellSound from "../images/240934__the_very_real_horst__neptun-solo-07-tibetan-singing-bowl.wav"

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    background-color: transparent;
    justify-content: center;
    gap: 1rem;
    button {
        span.material-icons {
            margin: unset;
        }
    }
`;
const StyledTimer = styled.div`
    display: flex;
    justify-content: space-around;
    height: 100%;
    padding: 1rem;
    .timer__values{
        position: relative;
        /* display: ${props => props.isRep && 'none'}; */
    }
    .repeat-wrapper{
        font-size: small;
        position: absolute;
        top: 100%;
        left: 100%;
        /* transform: translateY(-100%); */
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
        align-items: center;
        justify-items: center;
        width: 2rem;
        height: 2rem;
        img, span{
            grid-row: 1/2;
            grid-column: 1/2;
        }
        img{
            object-fit:contain;
            width: 100%;
            height: 100%;
        }
        span{
            color:white;
	        transform: translateY(0.1rem);
        }
    }
`;

export default function ActiveClock(props) {
    const { id } = props;
    const [muted, setMuted] = React.useState(false);
    // const bellSound = useAudio("")
    const [playing, toggle] = useAudio(bellSound);
    const tickSound = useRef();
    const [time, setTime] = React.useState({
        hours: props.hours,
        minutes: props.minutes,
        seconds: props.seconds,
    });

    const [loopsRemaining, setLoopsRemaining] = React.useState(props.repeatNumber - 1);
    const [started, setStarted] = React.useState(false);
    const [paused, setPaused] = React.useState(false);
    // const [atZero, setAtZero] = React.useState(false);
    const token = React.useRef();

    const [playActive] = useSound(bellSound, {volume: 0.25})

    function runTime() {
        if (time.seconds === 0) {
            updateTime("minutes", time.minutes - 1);
            updateTime("seconds", 59);
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
            // setAtZero(true);
            if (loopsRemaining > 0) {
                setLoopsRemaining((prevValue) => prevValue - 1);
                resetLoop();
                startTimer();
            } else {
                props.setClockAtZero(props.id);
            }
        }
    }
    //single time initialization
    React.useEffect(() => {
        if ((props.autostart || loopsRemaining < props.repeatNumber) && !props.clockAtZero) {
            setStarted(true);
        }
    }, [paused, started, loopsRemaining, props.repeatNumber, props.autostart, props.clockAtZero]);

    React.useEffect(() => {
        if (paused) {
            clearTimeout(token.current);
        }
    }, [paused]);

    React.useEffect(() => {
        if (started && !paused) {
            token.current = setTimeout(runTime, 1000);
        }

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
        if(propName == "seconds" && newValue <= 3){
            console
            playActive()
        }
        setTime((prevTime) => {
            return {
                ...prevTime,
                [propName]: newValue,
            };
        });
    }

    /**
     * Reset the individual loop, but not the clock in its entirety
     */
    function resetLoop() {
        setTime({
            hours: props.hours,
            minutes: props.minutes,
            seconds: props.seconds,
        });
    }

    /**
     * Restart the WHOLE clock, including resetting the loops
     */
    function restartClock() {
        setTime({
            hours: props.hours,
            minutes: props.minutes,
            seconds: props.seconds,
        });
        setLoopsRemaining(props.repeatNumber);
    }

    /**
     * Skip this clock to go to the next clock
     */
    function skipTimer() {
        props.setClockAtZero(id);
    }

    /**
     * Pause this clock
     */
    function pauseTimer() {
        setPaused(true);
    }
    /**
     * Resume this clock if it is paused
     */
    function resumeTimer() {
        setPaused(false);
        setStarted(true);
    }
    function playAudio() {
        if (!muted) {
            tickSound.current = new Audio("./assets/ticking-clock_1-d7477.mp3");
            tickSound.current.play();
            console.log(tickSound.current);
            // tickSound.current.currentTime = 0;
        }
    }

    const buttonData = {
        stop: {
            icon: "stop",
            title: "Stop Timer",
            onClick: resetLoop,
        },
        skip: {
            icon: "skip_next",
            title: "Skip to next clock",
            onClick: skipTimer,
        },
        reset: {
            icon: "restart_alt",
            title: "Restart clock",
            onClick: restartClock,
        },
    };

    const buttonElements = {};
    for (let key in buttonData) {
        const data = buttonData[key];
        buttonElements[key] = (
            <button className="timer__btn ghost" key={data.icon} onClick={data.onClick}>
                <span className="material-icons" title={data.title}>
                    {data.icon}
                </span>
            </button>
        );
    }

    return (
        <StyledTimer className="timer" isRep={props.isRep}>
            <div className="timer__values">
                {/* {(time.hours + time.seconds + time.minutes) < 3 && playActive()} */}
                {loopsRemaining > 0 && 
                    <div className="repeat-wrapper">
                        {!props.isRep ? 
                        <><span>{loopsRemaining}</span>
                        <img src={repeatIcon}></img>
                        </> : <span>{String(parseInt(time.seconds))}s</span>
                        }
                    </div>
                }
                {!props.isRep ? 
                <>{props.hours > 0 && 
                    <div className="time-value">
                        <h3 className="value">{String(parseInt(time.hours)).padStart(2, 0)}</h3>
                    </div>
                }
                <div className="time-value">
                    <h3 className="value">{String(parseInt(time.minutes)).padStart(2, 0)}:</h3>
                </div>

                <div className="time-value">
                    <h3 className="value">{String(parseInt(time.seconds)).padStart(2, 0)}</h3>
                </div></> : (<div>
                    <div className="time-value">
                        <h3 className="value">{String(parseInt(loopsRemaining)).padStart(2, 0)}</h3>
                    </div>
                </div>)
            }
            </div>
            <ButtonWrapper className="btn__wrapper">
                {!started && !paused && (
                    <button className="timer__btn" onClick={startTimer}>
                        Start Timer
                    </button>
                )}
                {started && (
                    <button
                        className={`timer__btn ${paused ? "" : "ghost"}`}
                        onClick={paused ? resumeTimer : pauseTimer}
                        title={paused ? "Continue Timer" : "Pause Timer"}
                    >
                        {paused ? "Continue" : "Pause"}
                    </button>
                )}
                {started && buttonElements.reset}
                {paused && buttonElements.stop}
                {buttonElements.skip}
            </ButtonWrapper>
        </StyledTimer>
    );
}
