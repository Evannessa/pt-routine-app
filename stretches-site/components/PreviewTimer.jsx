import React from "react";
import TimeValue from "./TimeValue";
import SpeedDialMenu from "./SpeedDialMenu";
import ActionModal from "./ActionModal";
import DropArea from "./DropArea";
import Task from "./Task";

export default function PreviewTimer(props) {
    const [time, setTime] = React.useState(props.time);
    const [showModal, setShowModal] = React.useState(false);
    const [formData, setFormData] = React.useState({ description: "" });
    const modalInfo = [
        {
            name: "spotify",
            description: (
                <span>
                    Follow the{" "}
                    <a href="https://developer.spotify.com/documentation/widgets/generate/embed/">
                        instructions linked here
                    </a>{" "}
                    to embed a Youtube video or playlist.
                </span>
            ),
            type: "embed",
        },
        {
            name: "youtube",
            title: "Embed Youtube Video or Playlist",
            description: (
                <span>
                    Follow the{" "}
                    <a href="https://support.google.com/youtube/answer/171780?hl=en">
                        instructions linked here
                    </a>{" "}
                    to embed a Spotify playlist."
                </span>
            ),
            type: "embed",
        },
        {
            name: "slide",
            title: "Upload Image or Gif",
            description:
                "Upload an image to display while this timer interval is running",
            type: "upload",
        },
    ];
    const actions = [
        {
            name: "spotify",
            functionRef: addSpotifyPlaylist,
            icon: <span className="material-icons">music_note</span>,
        },
        {
            name: "youtube",
            functionRef: addYoutubeUrl,
            icon: <span className="material-icons">play_circle_outline</span>,
        },
        {
            name: "slide",
            functionRef: addSlideImage,
            icon: <span className="material-icons">add_photo_alternate</span>,
        },
        {
            name: "setAutostart",
            functionRef: setAutoStart,
            icon: <span className="material-icons">play_arrow</span>,
        },
    ];
    function updateValue(value, isIncrease, unit) {
        //if it's a decrease, make the value negative
        //so we don't have to duplicate the code
        if (!isIncrease) {
            value *= -1;
        }
        setTime((prevTime) => {
            return {
                ...prevTime,
                [unit]: prevTime[unit] + value,
            };
        });
        // props.updateTimer(time);
    }

    //update time
    React.useEffect(() => {
        console.log("Preview Timer time also  being updated");
        //whenver time changes, we want to update it in the parent too
        // props.updateTimer(time, props.id);
        props.updateTimerData(time, "time", props.id);
    }, [time]);
    //update description
    React.useEffect(() => {
        props.updateTimerData(formData.description, "description", props.id);
    }, [formData.description]);

    // //update files
    // React.useEffect(()=> {
    // 	props.updateTimerData()
    // }, [formData.files])

    function displayModal() {
        setShowModal(true);
    }
    function hideModal() {
        setShowModal(false);
    }
    function addSpotifyPlaylist() {
        displayModal();
        console.log("Adding playlist");
    }
    function setAutoStart() {
        props.updateTimerData(!props.autostart, "autostart", props.id);
    }
    function addSlideImage() {}
    function addYoutubeUrl() {}

    function handleChange(event) {
        let { name, value, type, checked } = event.target;
        console.log("Handling change", event.target.name);
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    return (
        <div className={`preview-timer ${props.isBreak ? "break" : ""}`}>
            <h2 className="preview-timer__number">Timer {props.number}</h2>
            {showModal && (
                <ActionModal
                    title={modalInfo[0].name}
                    description={modalInfo[0].description}
                    type={modalInfo[0].type}
                ></ActionModal>
            )}
            <SpeedDialMenu actions={actions} />

            <div className="value-wrapper">
                <TimeValue
                    value={time.hours}
                    unit={"hours"}
                    updateValue={updateValue}
                ></TimeValue>
                <span className="timer__separator">:</span>
                <TimeValue
                    value={time.minutes}
                    unit={"minutes"}
                    updateValue={updateValue}
                ></TimeValue>
                <span className="timer__separator">:</span>
                <TimeValue
                    value={time.seconds}
                    unit={"seconds"}
                    updateValue={updateValue}
                ></TimeValue>
            </div>

            {/* <DropArea /> */}
            <Task description={formData.description} handleChange={handleChange}></Task>
            {/* <h1>
                <span>{String(time.hours).padStart(2, "0")}</span>:
                {String(time.minutes).padStart(2, "0")}:
                <span>{String(time.seconds).padStart(2, "0")}</span>
            </h1> */}
        </div>
    );
}
