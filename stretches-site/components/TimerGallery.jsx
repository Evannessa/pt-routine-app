import React from "react";
import PreviewTimer from "./PreviewTimer";
import { nanoid } from "nanoid";

/**
 *
 * @param {*} props
 * @returns a component that allows you to swipe or click through timers to edit them individually if needed
 */
export default function TimerGallery(props) {
    const [index, setIndex] = React.useState(0);
    const breakTimerRef = React.useRef(null);

    // const [isBreakVisible, setIsBreakVisible] = React.useState(false)
    // const callBackFunction = (entries) => {
    // 	const [entry] = entries
    // 	setIsBreakVisible(entry.isIntersecting)

    // }
    // const options = {
    // 	root: null,
    // 	rootMargin: "0px",
    // 	threshold: 1.0
    // }
    const [timerData, setTimerData] = React.useState(
        JSON.parse(localStorage.getItem("previewTimers")) || populateTimers()
    ); //for storing timers in local state
    const [currentTimerId, setCurrentTimerId] = React.useState(
        (timerData[0] && timerData[0].id) || ""
    ); //get id of current timer

    React.useEffect(() => {
        localStorage.setItem("previewTimers", JSON.stringify(timerData));
    }, [timerData]);

    // React.useEffect(() => {
    //     //if it's empty, populate it, else get the default data
    //     console.log("Timer data after refresh is", timerData);
    //     if (timerData.length === 0) {
    //         console.log("This should be ignored");
    //         setTimerData(populateTimers());
    //     }
    // }, []);

    function populateTimers() {
        let timerObjects = [];
        for (let i = 0; i < props.number; i++) {
            let isBreak = false;
            if (props.alternating) {
                //every other one
                if (i % 2 !== 0) {
                    //odd number
                    isBreak = true;
                }
            }
            let id = nanoid();

            timerObjects.push({
                key: i,
                number: i + 1,
                id,
                isBreak: isBreak,
                time: { hours: 0, minutes: 0, seconds: 0 },
                description: "",
                autostart: false,
            });
        }
        return timerObjects;
    }

    function changeIndex(event) {
        let value = parseInt(event.target.dataset.direction);
        let result = index + value;
        if (result < 0) {
            setIndex(previewTimers.length - 1);
        } else if (result >= previewTimers.length) {
            setIndex(0);
        } else {
            setIndex(result);
        }
    }

    function updateTimer(data, id) {
        console.log("updating timer with", data);
        setTimerData((prevData) =>
            prevData.map((oldTimer) => {
                return oldTimer.id === id ? { ...oldTimer, time: { ...data } } : oldTimer;
            })
        );
    }
    function updateTimerData(data, propertyName, id) {
        setTimerData((prevData) =>
            prevData.map((oldTimer) => {
                return oldTimer.id === id
                    ? { ...oldTimer, [propertyName]: data }
                    : oldTimer;
            })
        );
        console.log(
            "Updated data is",
            timerData.find((timer) => timer.id === id)
        );
    }

    let previewTimers = timerData.map((timer) => (
        <PreviewTimer
            key={timer.key}
            number={timer.number}
            id={timer.id}
            updateTimer={updateTimer}
            isBreak={timer.isBreak}
            time={timer.time}
            autostart={timer.autostart}
            description={timer.description}
            updateTimerData={updateTimerData}
        />
    ));
    return (
        <div className="timer-gallery">
            <button
                className="prev btn gallery__btn"
                data-direction={-1}
                onClick={changeIndex}
            >
                <span className="material-icons">arrow_back_ios</span>
            </button>
            {previewTimers}
            <button
                className="next btn gallery__btn"
                data-direction={+1}
                onClick={changeIndex}
            >
                <span className="material-icons">arrow_forward_ios</span>
            </button>
        </div>
    );
}
