import React from "react";
import ReactDOM from "react-dom";
import CategoryView from "../CategoryView";
import Dashboard from "../Dashboard";
import FilterGroup, { testMatches } from "../FilterGroup";
import { filterOperations } from "../Filter";
import { screen, render, fireEvent, cleanup, getByText } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { requests } from "../../helpers/requests";

let container = null;

afterEach(cleanup);

function mockMatch() {}

function mockFilter() {
    return {
        categoryName: "",
        propertyChoice: "name",
        relation: "equal",
        stringMatch: "",
        arrayMatch: [],
        match: [],
    };
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

it("Category view contains properly filtered links", async () => {
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
    ];
    function mockTag(array) {
        return array.map((tagName) => {
            return {
                name: tagName,
                color: "#212121",
            };
        });
    }

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
        await screen.findByText(fakeLinks.find((link) => link.name === "Eurogamer").name)
    ).toBeInTheDocument();
    expect(
        await screen.findByText(fakeLinks.find((link) => link.name === "SymbaLily").name)
    ).not.toBeInTheDocument();
    // const link = await screen.findByText(
    // fakeLinks.find((link) => link.name === "Eurogamer").name
    // );

    // expect(link).toBeInTheDocument();
    // await screen.waitFor(() => {
    //     expect(
    //         screen.getByText(fakeLinks.find((link) => link.name === "Eurogamer").name)
    //     ).toBeInTheDocument();
    // });

    // render(<Accordion items={[hats, footware]} />)

    //   expect(screen.getByText(hats.contents)).toBeInTheDocument()
    //   expect(screen.queryByText(footware.contents)).not.toBeInTheDocument()

    //   userEvent.click(screen.getByText(footware.title))

    //   expect(screen.getByText(footware.contents)).toBeInTheDocument()
    //   expect(screen.queryByText(hats.contents)).not.toBeInTheDocument()

    // //put all the matches in their own array
    // let matches = fakeFilterGroup.filters.map((filter) => filter.match);
    // let matchArray1 = ["game"];

    // let matchArray2 = ["euro"];
    // expect(matches).toContainEqual(matchArray1);
    // expect(matches).toContainEqual(matchArray2);

    // expect(testMatches(matches)).toBe(["game", "euro"]);
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
