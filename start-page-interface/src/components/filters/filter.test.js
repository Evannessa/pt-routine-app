import React from "react";
import ReactDOM from "react-dom";
import CategoryView from "../CategoryView";
import Dashboard from "../Dashboard";
import FilterGroup, { testMatches } from "../FilterGroup";
import { filterOperations } from "../Filter";
import {
    screen,
    render,
    fireEvent,
    cleanup,
    getByText,
    waitFor,
    waitForElementToBeRemoved,
    queryByText,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { requests } from "../../helpers/requests";

let container = null;
const fakeLinks = [
    {
        type: "External",
        _id: "6222783d935245b11787b9be",
        name: "SymbaLily",
        url: "https://www.youtube.com/c/SymbaLily",
        tags: mockTag(["gaming", "bed", "sleep", "let's play"]),
    },
    {
        type: "External",
        _id: "6222783d935245b11787b9bf",
        name: "BedtimePlaylist",
        url: "https://www.youtube.com/playlist?list=PL6gFRhlwsm9z_EQ9HSffDKUNwOuU_gaF2",
        tags: mockTag(["sleep", "bed"]),
    },
    {
        type: "External",
        _id: "6222783d935245b11787b9c0",
        name: "Eurogamer",
        url: "https://www.youtube.com/c/eurogamer",
        tags: mockTag(["gaming", "stream"]),
    },
    {
        type: "External",
        _id: "6222783d935245b11787b9c1",
        name: "KiraTV",
        url: "https://www.youtube.com/c/KiraTV1",
        tags: mockTag(["talk", "scams"]),
    },
    {
        type: "External",
        _id: "6222783d935245b11787b9c2",
        name: "SecretSleepoverSociety",
        url: "https://www.youtube.com/c/UnofficialSecretSleepoverSociety",
        tags: mockTag(["gaming", "art", "stream"]),
    },
    {
        type: "Modal",
        _id: "12345",
        name: "Internal Link Test",
        url: "https://www.fakelink.com",
        tags: mockTag(["cheat sheet", "art"]),
    },
];

function mockTag(array) {
    return array.map((tagName) => {
        return {
            name: tagName,
            color: "#212121",
        };
    });
}
afterEach(cleanup);

function mockMatch() {}

function mockFilter(options) {
    let filter = {
        categoryName: "Test",
        propertyChoice: "name",
        relation: "equal",
        stringMatch: "",
        arrayMatch: [],
        match: [],
        ...options,
    };
    return filter;
}

function findLinkByName(name) {
    return fakeLinks.find((link) => link.name === name);
}
function findLinkByProperty(property, value) {
    return fakeLinks.find((link) => link[property] === value);
}

// describe("It filters links", () => {
//     function mockTag(array) {
//         return array.map((tagName) => {
//             return {
//                 name: tagName,
//                 color: "#212121",
//             };
//         });
//     }
//     const fakeLinks = [
//         {
//             type: "External",
//             _id: "6222783d935245b11787b9be",
//             name: "SymbaLily",
//             url: "https://www.youtube.com/c/SymbaLily",
//             tags: mockTag(["gaming", "bed", "sleep", "let's play"]),
//         },
//         {
//             type: "External",
//             _id: "6222783d935245b11787b9bf",
//             name: "BedtimePlaylist",
//             url: "https://www.youtube.com/playlist?list=PL6gFRhlwsm9z_EQ9HSffDKUNwOuU_gaF2",
//             tags: mockTag(["sleep", "bed"]),
//         },
//         {
//             type: "External",
//             _id: "6222783d935245b11787b9c0",
//             name: "Eurogamer",
//             url: "https://www.youtube.com/c/eurogamer",
//             tags: mockTag(["gaming", "stream"]),
//         },
//         {
//             type: "External",
//             _id: "6222783d935245b11787b9c1",
//             name: "KiraTV",
//             url: "https://www.youtube.com/c/KiraTV1",
//             tags: mockTag(["talk", "scams"]),
//         },
//         {
//             type: "External",
//             _id: "6222783d935245b11787b9c2",
//             name: "SecretSleepoverSociety",
//             url: "https://www.youtube.com/c/UnofficialSecretSleepoverSociety",
//             tags: mockTag(["gaming", "art", "stream"]),
//         },
//     ];
//     let nameFilteredLinks;
//     let tagFilteredLinks;
//     let urlFilteredLinks;
//     test("by name", () => {
//         nameFilteredLinks = filterOperations.getMatches(fakeLinks, "name", "euro");
//         expect(nameFilteredLinks).toEqual(
//             expect.arrayContaining([expect.objectContaining({ name: "Eurogamer" })])
//         );
//     });
//     test("by url", () => {
//         urlFilteredLinks = filterOperations.getMatches(fakeLinks, "url", "youtube");
//         expect(urlFilteredLinks).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({
//                     url: "https://www.youtube.com/c/UnofficialSecretSleepoverSociety",
//                 }),
//             ])
//         );
//     });
//     test("by tags", () => {
//         tagFilteredLinks = filterOperations.getMatches(
//             fakeLinks,
//             "tags",
//             ["gaming"],
//             false,
//             "name"
//         );
//         expect(tagFilteredLinks).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({ name: "SecretSleepoverSociety" }),
//             ])
//         );
//     });
//     let allLinks;
//     test("by name, tags, and url together", () => {
//         allLinks = [...tagFilteredLinks, ...urlFilteredLinks, ...nameFilteredLinks];
//         let _2DArray = [tagFilteredLinks, urlFilteredLinks, nameFilteredLinks];
//         // console.log(
//         //     "All links is",
//         //     allLinks.map((link) => link.name)
//         // );
//         // console.log(
//         //     "Intersection is",
//         //     filterOperations
//         //         .testIntersection(tagFilteredLinks, urlFilteredLinks)
//         //         .map((link) => link.name)
//         // );
//         // console.log(allLinks);
//         // expect
//         console.log("Testing matches is", testMatches(_2DArray));
//     });
//     //test all of these filters together
// });

describe("Category view properly filters links", () => {
    let mockFilterGroup = {
        categoryName: "YouTube",
        groupSelector: "and",
        _id: "62322c67b39f5c6fe33cbd5f",
        filters: [],
    };
    test("by name", async () => {
        const fakeFilterGroup = {
            categoryName: "YouTube",
            groupSelector: "and",
            _id: "62322c67b39f5c6fe33cbd5f",
            filters: [
                {
                    categoryName: "New Category",
                    propertyChoice: "name",
                    relation: "equals",
                    precision: "any",
                    match: ["game"],
                    _id: "62322c67b39f5c6fe33cbd60",
                },
                {
                    categoryName: "New Category",
                    propertyChoice: "name",
                    relation: "equals",
                    precision: "any",
                    match: ["euro"],
                    _id: "62322c67b39f5c6fe33cbd60",
                },
            ],
        };
        render(<CategoryView defaultValues={fakeFilterGroup} links={fakeLinks} />);

        expect(
            await screen.findByText(
                fakeLinks.find((link) => link.name === "Eurogamer").name
            )
        ).toBeInTheDocument();

        //use query by to avoid throwing error with 'getBy
        expect(
            screen.queryByText(fakeLinks.find((link) => link.name === "SymbaLily").name)
        ).not.toBeInTheDocument();

        expect(screen.queryByRole("list").childNodes.length).toEqual(1);
    });

    test("by having ANY of these tags", async () => {
        const fakeFilterGroup = {
            categoryName: "YouTube",
            groupSelector: "and",
            _id: "62322c67b39f5c6fe33cbd5f",
            filters: [
                {
                    categoryName: "New Category",
                    propertyChoice: "tags",
                    relation: "equals",
                    precision: "any",
                    match: ["gaming", "stream"],
                    _id: "62322c67b39f5c6fe33cbd60",
                },
            ],
        };
        render(<CategoryView defaultValues={fakeFilterGroup} links={fakeLinks} />);

        //"SSS has some of the above tags"
        expect(
            await screen.findByText(
                fakeLinks.find((link) => link.name === "SecretSleepoverSociety").name
            )
        ).toBeInTheDocument();

        //"Eurogamer has all of the above tags"
        expect(
            await screen.findByText(
                fakeLinks.find((link) => link.name === "Eurogamer").name
            )
        ).toBeInTheDocument();

        //"Kira TV shouldn't have any of the above tags, so shouldn't be present"
        expect(
            screen.queryByText(fakeLinks.find((link) => link.name === "KiraTV").name)
        ).not.toBeInTheDocument();
    });

    test("by URL", async () => {
        const fakeFilterGroup = {
            categoryName: "YouTube",
            groupSelector: "and",
            _id: "62322c67b39f5c6fe33cbd5f",
            filters: [
                {
                    categoryName: "New Category",
                    propertyChoice: "url",
                    relation: "equals",
                    precision: "any",
                    match: ["youtube"],
                    _id: "62322c67b39f5c6fe33cbd60",
                },
            ],
        };
        render(<CategoryView defaultValues={fakeFilterGroup} links={fakeLinks} />);
    });
    test("by having ALL of these tags", async () => {
        const fakeFilterGroup = {
            categoryName: "YouTube",
            groupSelector: "and",
            _id: "62322c67b39f5c6fe33cbd5f",
            filters: [
                {
                    categoryName: "New Category",
                    propertyChoice: "tags",
                    relation: "equals",
                    precision: "all",
                    match: ["gaming", "stream"],
                    _id: "62322c67b39f5c6fe33cbd60",
                },
            ],
        };
        render(<CategoryView defaultValues={fakeFilterGroup} links={fakeLinks} />);

        //has some but not all of the tags, so SHOULDN'T be in the document
        expect(
            await screen.findByText(
                fakeLinks.find((link) => link.name === "SecretSleepoverSociety").name
            )
        ).toBeInTheDocument();

        //has some but not all of the tags, so SHOULDN'T be in the document
        expect(
            await screen.findByText(
                fakeLinks.find((link) => link.name === "Eurogamer").name
            )
        ).toBeInTheDocument();

        //has some but not all of the tags, so SHOULDN'T be in the document

        expect(
            screen.queryByText(fakeLinks.find((link) => link.name === "SymbaLily").name)
        ).not.toBeInTheDocument();

        //has none of the tags, so SHOULDN'T be in the document
        expect(
            screen.queryByText(fakeLinks.find((link) => link.name === "KiraTV").name)
        ).not.toBeInTheDocument();
    });

    // Testing TYPES
    test("which have this specific type", async () => {
        let fakeFilterGroup = { ...mockFilterGroup };
        fakeFilterGroup.filters = [
            mockFilter({ propertyChoice: "type", match: ["External"] }),
        ];

        render(<CategoryView links={fakeLinks || []} defaultValues={fakeFilterGroup} />);

        expect(
            await screen.findByText(findLinkByProperty("type", "External").name)
        ).toBeInTheDocument();

        expect(
            screen.queryByText(findLinkByProperty("type", "Modal").name)
        ).not.toBeInTheDocument();
    });

    test("that match one name OR the other", async () => {
        const fakeFilterGroup = {
            categoryName: "YouTube",
            groupSelector: "or",
            _id: "62322c67b39f5c6fe33cbd5f",
            filters: [
                {
                    categoryName: "New Category",
                    propertyChoice: "name",
                    relation: "equals",
                    precision: "any",
                    match: ["secret"],
                    _id: "62322c67b39f5c6fe33cbd60",
                },
                {
                    categoryName: "New Category",
                    propertyChoice: "name",
                    relation: "equals",
                    precision: "any",
                    match: ["euro"],
                    _id: "12345",
                },
            ],
        };

        render(
            <CategoryView
                links={fakeLinks || []}
                defaultValues={fakeFilterGroup}
                displayMode={true}
            />
        );
        expect(
            await screen.findByText(findLinkByName("Eurogamer").name)
        ).toBeInTheDocument();
        expect(
            await screen.findByText(findLinkByName("SecretSleepoverSociety").name)
        ).toBeInTheDocument();
    });
});

describe("testing filtering of links that do NOT equal", () => {
    test("tags", async () => {});

    test("name", async () => {});
    test("url", async () => {});
    test("type", async () => {});
});

//use fake axiox mock here
// it("gets links", async () => {
//     // const links = requests.axiosRequest(get)
// });
// it("renders filters", async () => {
//     const fakeFilterGroup = {
//         categoryName: "YouTube",
//         groupSelector: "and",
//         _id: "62322c67b39f5c6fe33cbd5f",
//         filters: [
//             {
//                 categoryName: "New Category",
//                 propertyChoice: "name",
//                 relation: "equals",
//                 precision: "any",
//                 match: [],
//                 _id: "62322c67b39f5c6fe33cbd60",
//             },
//         ],
//     };

//     render(<CategoryView defaultValues={fakeFilterGroup} />);
//     jest.spyOn(global, "fetch").mockImplementation(() =>
//         Promise.resolve({
//             json: () => Promise.resolve(fakeFilterGroup),
//         })
//     );

//     expect(screen.getByRole("heading").textContent).toBe(fakeFilterGroup.categoryName);

//     global.fetch.mockRestore();
// });
