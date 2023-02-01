import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Container } from "./styled-components/layout.styled";
import Flex from "./styled-components/flex.styled";
import * as Buttons from "./styled-components/Buttons.Styled";
import { requests } from "../helpers/requests";
// import * as Layout from "./styled-components/layout.styled";
import CategoryView from "./CategoryView";
import { device } from "./styled-components/devices";

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const StyledCategoryGrid = styled.section`
    /* columns: 3 3rem; */
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    /* grid-template-rows: repeat(3, minmax(0, 1fr)); */
    @media ${device.tablet} {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: unset;
    }
    gap: 1rem;
    overflow: hidden;
    padding: 1rem;
    /* row-gap: 0.45rem; */
    /* display: flex; */
    flex-wrap: wrap;
`;
StyledCategoryGrid.displayName = "StyledCategoryGrid";

const StyledHeading = styled.h1`
    position: relative;
    font-size: 3rem;
    width: fit-content;
    margin: 0;
    background: linear-gradient(
        to right,
        var(--clr-accent),
        var(--clr-accent-indigo),
        var(--clr-accent-violet),
        var(--clr-accent-pink),
        var(--clr-accent-red),
        var(--clr-accent-orange)
    );
    font-family: "Titan One", cursive;
    text-transform: uppercase;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    /* color: var(--clr-accent-pink); */
    /* letter-spacing: 0.15ch; */
    &:after {
        content: "DASHBOARD";
        position: absolute;
        background: inherit;
        background-size: inherit;
        background-position: inherit;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        -webkit-background-clip: text;
        background-clip: text;
        transform: translate(-50%, -50%);
        filter: blur(8px);
        z-index: 0;
    }
    &:before {
        content: "DASHBOARD";
        position: absolute;
        background: linear-gradient(
                to top,
                transparent 40%,
                var(--clr-primary-dark-translucent) 45%,
                var(--clr-primary-dark) 100%
            ),
            linear-gradient(
                to right,
                var(--clr-accent),
                var(--clr-accent-indigo),
                var(--clr-accent-violet),
                var(--clr-accent-pink),
                var(--clr-accent-red),
                var(--clr-accent-orange)
            );
        background-size: 100% 200%;
        perspective-origin: center;
        /* perspective: 500px; */
        -webkit-background-clip: text;
        background-clip: text;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        perspective-origin: center;
        transform: perspective(3500px) translate(-50%, 25%) rotateZ(180deg)
            rotateY(180deg) rotateX(55deg);
        filter: blur(5px);
        z-index: 0;
    }
`;
const MaskedImage = styled.img`
    mask-image: url("./mask.png");
    object-fit: contain;
    object-position: center;
    mask-repeat: no-repeat;
    mask-origin: border-box;
    mask-position: center;
`;

function Dashboard() {
    const [filteredViews, setFilteredViews] = useState();
    const [links, setLinks] = useState();
    const [tags, setAllTags] = useState();

    useEffect(() => {
        let options = {
            method: "GET",
            pathsArray: ["display", "groups"],
            setStateCallback: setFilteredViews,
        };
        requests.axiosRequest(options);
        let linkOptions = {
            method: "GET",
            pathsArray: ["display"],
            setStateCallback: setLinks,
        };
        requests.axiosRequest(linkOptions);
        let tagOptions = {
            method: "GET",
            pathsArray: ["display", "tags"],
            setStateCallback: setAllTags,
        };
        requests.axiosRequest(tagOptions);
    }, []);

    let categoryComponents = filteredViews
        ? filteredViews.map((filterGroup) => (
              <CategoryView
                  key={filterGroup._id}
                  defaultValues={filterGroup}
                  links={links}
                  tags={tags}
                  displayMode={false}
              ></CategoryView>
          ))
        : [];

    /**
     *
     * @param {*} numberOfColumns - the number of columns
     * @param {Array} elements - the array of elements
     */
    function generateColumns(_elements, numberOfColumns = 3, maxPerColumn = 1) {
        let columnArray = [];
        let elements = [..._elements]; //copy array
        for (let n = numberOfColumns; n > 0; n--) {
            //splice modifies and returns original array
            //Math.ceil rounds up
            //cut the array from 0 to tne length of the array divided by number of columns, return the original array
            let chunk = elements.splice(0, Math.ceil(elements.length / n));
            //push that chunk into this
            columnArray.push(<StyledColumn key={n}>{chunk}</StyledColumn>);
        }
        return columnArray;
    }

    if (categoryComponents.length > 0) {
        console.log(generateColumns(categoryComponents));
    }

    return (
        <Container full={true} fullVertical={true}>
            <header
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "2rem 2rem",
                    backgroundColor: "var(--clr-primary-dark)",
                    marginLeft: "-8rem",
                    marginRight: "-8rem",
                    marginBottom: "3rem",
                }}
            >
                <StyledHeading>Dashboard</StyledHeading>
                {/* <Buttons.ButtonGroup style={{ justifyContent: "flex-end" }}>
                    <Buttons.ContainedButton bgColor="var(--clr-accent-pink)">
                        <Buttons.StyledButtonIconSpan>
                            add
                        </Buttons.StyledButtonIconSpan>
                        Add New Category
                    </Buttons.ContainedButton>
                </Buttons.ButtonGroup> */}
            </header>

            {links ? (
                <StyledCategoryGrid>
                    {generateColumns(categoryComponents)}
                </StyledCategoryGrid>
            ) : (
                <p style={{ color: "var(--clr-accent)" }}>Loading...</p>
            )}
        </Container>
    );
}

export default Dashboard;
