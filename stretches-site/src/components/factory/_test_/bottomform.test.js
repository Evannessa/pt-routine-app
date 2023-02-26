import React from "react";
import { screen, render, within, fireEvent } from "@testing-library/react";
import TimerGallery from "../../TimerGallery";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

//mock intersection observer
beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return {
        user: userEvent.setup(),
        ...render(ui, { wrapper: BrowserRouter }),
    };
};

let testSet = {
    _id: "12345",
    setLabel: "Test Set",
    timers: [
        {
            _id: "abcde",
            label: "Timer 0",
            slideImagePath: "",
            description: "",
            autostart: false,
            isBreak: false,
            time: {
                hours: 0,
                minutes: 30,
                seconds: 0,
            },
        },
        {
            _id: "efghi",
            label: "Timer 1",
            slideImagePath: "",
            description: "",
            autostart: false,
            isBreak: false,
            time: {
                hours: 0,
                minutes: 5,
                seconds: 0,
            },
        },
        {
            _id: "hijkl",
            label: "Timer 2",
            slideImagePath: "",
            description: "",
            autostart: false,
            isBreak: false,
            time: {
                hours: 0,
                minutes: 0,
                seconds: 15,
            },
        },
    ],
    youtubeLink: "",
    spotifyLink: "",
    repeatNumber: 0,
};

describe("bottom form changes individual timer", () => {
    test("Clicking autostart sets autostart", () => {
        const route = "/factory/12345";
        renderWithRouter(<TimerGallery formData={testSet} />, { route });
        const checkbox = screen.getAllByLabelText(/Autostart/i)[0];
        expect(checkbox.checked).toBe(false);
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
    });
    test("Clicking isBreak sets isBreak", () => {
        const route = "/factory/12345";
        renderWithRouter(<TimerGallery formData={testSet} />, { route });
        const checkbox = screen.getAllByLabelText(/Is Break/i)[0];
        expect(checkbox.checked).toBe(false);
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
    });
    // test("Clicking isBreak changes theme", () => {
    //     render(<TimerGallery formData={testSet}/>);
    //     const checkbox = screen.getByLabelText(/Autostart/i);
    //     expect(checkbox.checked).toBe(false);
    //     fireEvent.click(checkbox);
    //     expect(checkbox.checked).toBe(true);
    // });
});
function setup(jsx) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    };
}
describe("Timer Set Inputs update values", () => {
    test("Changing set label value updates value", async () => {
        const user = userEvent.setup();
        const route = "/factory/12345";
        renderWithRouter(<TimerGallery formData={testSet} />, { route });

        const textbox = screen.getByLabelText(/Set Label/i);
        expect(textbox).toHaveValue("Test Set");

        await user.clear(textbox);
        expect(textbox).toHaveValue("");

        await user.type(textbox, "Changing new title");
        expect(textbox).toHaveValue("Changing new title");
    });
    test("Changing repeat number value updates value", async () => {
        const user = userEvent.setup();
        const route = "/factory/12345";
        renderWithRouter(<TimerGallery formData={testSet} />, { route });
        const textbox = screen.getByLabelText(/Repeat Number/i);
        expect(textbox).toHaveValue(0);
        await user.type(textbox, "4");
        expect(textbox).toHaveValue(4);
    });
});

describe("Form modal buttons work", () => {
    test("Clicking spotify label shows spotify modal", async () => {
        const user = userEvent.setup();
        const route = "/factory/12345";
        renderWithRouter(<TimerGallery formData={testSet} />, { route });
        const button = screen.getByRole("button", {
            name: /music_note/i,
        });
        await user.click(button);

        const dialog = await screen.findByRole("dialog");
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveTextContent("Spotify");
    });
    test("Clicking youtube modal shows youtube modal", async () => {
        const user = userEvent.setup();
        const route = "/factory/12345";
        renderWithRouter(<TimerGallery formData={testSet} />, { route });
        const button = screen.getByRole("button", {
            name: /play_circle_outline/i,
        });
        await user.click(button);
        const dialog = await screen.findByRole("dialog");
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveTextContent("YouTube");
    });
});

describe("Time change buttons work", () => {});
describe("Set timeline timer thumbnails work properly", () => {
    // test("Clicking Navigate to timer scrolls proper timer into view", ()=> {

    // });
    test("First thumbnail and first timer share same time", () => {
        const user = userEvent.setup();
        const route = "/factory/12345";
        renderWithRouter(<TimerGallery formData={testSet} />, { route });
        const firstThumbnail = screen.getAllByTestId("timeline-thumbnail")[0];
        const firstTimer = screen.getAllByTestId("preview-timer")[0];

        const hourValue = within(firstTimer).getByTestId("hours");
        const minuteValue = within(firstTimer).getByTestId("minutes");
        const secondValue = within(firstTimer).getByTestId("seconds");

        expect(within(hourValue).getByRole("heading")).toHaveTextContent(
            testSet.timers[0].time.hours
        );
        expect(within(minuteValue).getByRole("heading")).toHaveTextContent(
            testSet.timers[0].time.minutes
        );
        expect(within(secondValue).getByRole("heading")).toHaveTextContent(
            testSet.timers[0].time.seconds
        );

        // const thumbnailMinutes = within(firstThumbnail).getByTestId("minutes");
        // const thumbnailSeconds = within(firstThumbnail).getByTestId("seconds");
        // expect(thumbnailMinutes).toHaveTextContent(
        //     testSet.timers[0].time.minutes
        // );
        // expect(thumbnailSeconds).toHaveTextContent(
        //     testSet.timers[0].time.seconds
        // );
    });
    test("Clicking 'Add Button Before' adds a timer before the current timer", async () => {
        const user = userEvent.setup();
        const route = "/factory/12345";
        renderWithRouter(<TimerGallery formData={testSet} />, { route });
        const firstThumbnail = screen.getAllByTestId("timeline-thumbnail")[0];
        expect(firstThumbnail).toBeInTheDocument();
        const addBeforeButton = within(firstThumbnail).getAllByRole("button", {
            name: /add/i,
        })[0];
        expect(addBeforeButton).toBeInTheDocument();

        await user.hover(firstThumbnail); //hover the thumbnail
        await user.click(addBeforeButton);
        expect(screen.getAllByTestId("timeline-thumbnail")[0]).not.toBe(
            firstThumbnail
        );
    });

    test("Clicking 'Add Timer After' adds a timer after the current timer", async () => {
        const user = userEvent.setup();
        const route = "/factory/12345";
        renderWithRouter(<TimerGallery formData={testSet} />, { route });
        const firstThumbnail = screen.getAllByTestId("timeline-thumbnail")[0];
        expect(firstThumbnail).toBeInTheDocument();
        const addAfterButton = within(firstThumbnail).getAllByRole("button", {
            name: /add/i,
        })[1];
        expect(addAfterButton).toBeInTheDocument();
        // await user.click(addAfterButton);
    });
    test("Clicking 'delete' deletes the current timer", () => {});
});
