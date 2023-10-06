import React from "react";
import InputLabelOverlay from "./InputLabelOverlay";
import TimerGallery from "./TimerGallery";
import axios from "axios";
import { Routes, Route, Outlet, useOutletContext } from "react-router-dom";

export default function TimerFactory(props) {
    const [timerSets, getTimerSets, embedUrls, user] = useOutletContext();
    const [formData, setFormData] = React.useState({
        setLabel: "",
        type: "alternating",
        intervalNumber: 3,
    });
    const [saved, setSaved] = React.useState(false);

    //for when something in the form changes
    function handleChange(event) {
        let { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    //convert to object for post and to send to database
    function convertDataToObject(data) {
        let timerSet = {
            setLabel: formData.setLabel,
            timers: {},
            youtubeLink: data.youtubeLink,
            playlistLink: data.playlistLink,
        };
        return timerSet;
    }
    /**
     * Creates a new timer object
     * @returns a new timer object
     */
    function createTimerObject() {
        let timer = {
            time: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            slideImagePaths: [], //urls of slide images
        };
        return timer;
    }
    function updateTimerObject(index, updateData) {}

    async function handleClick(event) {
        event.preventDefault();
        console.log("Clicked");
        if (event.dataset.action === "save") {
            //here we will post the new timer SET with the form data
            if (formData.setLabel) {
                await axios.post("/");
                setSaved(true);
            } else {
                console.log("WARNING: NAME IS REQUIRED");
            }
        } else if (event.dataset.action === "cancel") {
            //TODO: Go back to "main page"
        }
    }

    return (
        <div className="timer-factory ">
            <Outlet context={[timerSets, getTimerSets, saved, embedUrls, user]}/>
        </div>
    );
}
