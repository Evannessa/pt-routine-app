import React from "react";
import ReactDOM, { render } from "react-dom";
import CategoryView from "../CategoryView";
import { act } from "react-dom/test-utils";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
});
it("renders filters", async () => {
    const fakeFilterGroup = {
        categoryName: "YouTube",
        groupSelector: "and",
        _id: "62322c67b39f5c6fe33cbd5f",
        subGroups: [
            {
                categoryName: "New Category",
                propertyChoice: "name",
                relation: "equals",
                precision: "any",
                match: [],
                _id: "62322c67b39f5c6fe33cbd60",
            },
        ],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeFilterGroup),
        })
    );
    await render(<CategoryView defaultValues={fakeFilterGroup} />, container);

    expect(container.querySelector("summary").textContent).toBe(
        fakeFilterGroup.categoryName
    );

    global.fetch.mockRestore();
});
