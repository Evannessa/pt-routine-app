import React from "react";
import ReactDOM from "react-dom";
import Input from "../Input";
import Form from "../Form";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);

describe("Properly renders the type", () => {
    let types = [
        ["text", "text"],
        ["text", "textarea"],
        ["checkbox", "checkbox"],
        ["radio", "radio"],
    ];
    test.each(types)("given %p as argument, returns %p", (type) => {
        let inputProps = {
            name: "Textbox",
            value: "fake value",
            hasLabel: true,
            type: type,
        };
        render(<Input {...inputProps} />);
        expect(screen.getByTestId("input-component").type).toBe(type);
    });
});

it("Is passed components correctly", () => {
    render(<Form />);
});
it("Updates state on change", () => {
    let inputProps = {
        name: "Textbox",
        value: "fake value",
        type: "text",
        hasLabel: true,
        setStateFunction: jest.fn(() => {}),
    };
    render(<Input {...inputProps} />);
    // let inputElement = screen.getByTestId("input-component");
    let inputElement = screen.getByDisplayValue("fake value");
    expect(inputElement.value).toBe("fake value");
    fireEvent.change(inputElement, {
        target: { value: "new text" },
    });
    expect(inputElement.value).toBe("new text");
});
