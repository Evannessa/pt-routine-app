import React from "react";
import ReactDOM from "react-dom";
import Input from "../Input";
import Form from "../Form";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import TimerGallery from "../../TimerGallery";

afterEach(cleanup);

let testSet = {
    label: "Test Set",
    timers: [
        {
            label: "Timer 0",
            slideImagePath: "",
            description: "",
            autostart: false,
            isBreak: false,
            time: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
        },
        {
            label: "Timer 1",
            slideImagePath: "",
            description: "",
            autostart: false,
            isBreak: false,
            time: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
        },
        {
            label: "Timer 2",
            slideImagePath: "",
            description: "",
            autostart: false,
            isBreak: false,
            time: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
        },
    ],
    youtubeLink: "",
    spotifyLink: "",
    repeatNumber: 0,
};

describe("Dropping image changes preview image", () => {
    test("Image source is preview Image", () => {
        //gets data from
        render(<TimerGallery timerG />);
        fireEvent.drop(screen.getByAltText(/preview/i), {
            dataTransfer: {
                files: [
                    new File(["(⌐□_□)"], "chucknorris.png", {
                        type: "image/png",
                    }),
                ],
            },
        });
    });
});
