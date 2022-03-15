import styled, { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";
/** for generic wrappers to go around components */
export const CardComponent = styled.div`
    display: flex;
    flex-direction: ${(props) => props.direction || "row"};
    justify-content: ${(props) => props.justifyContent || "flex-start"};
    gap: 0.25rem;
    flex-wrap: ${(props) => props.wrap || "wrap"};
    width: 100%;
    row-gap: 0.45rem;
`;
CardComponent.displayName = "CardComponent";
export const StyledCardHeader = styled.div`
    /* grid-area: hd; */
    grid-column: 2/5;
    grid-row: 1/2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1.5rem;
    h2 {
        display: inline-flex;
        gap: 0.5rem;
    }
`;

StyledCardHeader.displayName = "StyledCardHeader";

export const StyledCardBody = styled.div`
    grid-column: 2/5;
    grid-row: 2/3;
    /* grid-area: main; */
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-evenly;
`;

StyledCardBody.displayName = "StyledCardBody";
export const StyledCardWrapper = styled.div`
    grid-area: main;
    display: flex;
    flex-direction: column;
    flex: 2;
    align-items: center;
    justify-content: center;
`;
StyledCardWrapper.displayName = "StyledCardWrapper";
export const StyledCardFooter = styled.div`
    /* grid-area: ft; */
    grid-column: 2/5;
    display: flex;
    flex-direction: row;
    padding-bottom: 1rem;
`;
StyledCardFooter.displayName = "StyledCardFooter";
export const StyledCardSidebar = styled.div`
    /* grid-area: rt; */
    grid-row: 1/4;
    grid-column: 5/6;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* padding: 0rem 1rem; */
    /* background-color: #bf2063; */
    /* margin-right: -3rem; */
    margin-top: -2rem;
    margin-bottom: -2rem;
    /* margin-left: 2rem; */
    a,
    NavLink {
        transform-origin: right center;
        transform: scaleX(0);
        display: inline-flex;
        background-color: #bf2063;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: white;
        text-decoration: none;
        transition: transform 100ms ease-in;
        /* &:visited, */
        &:hover {
            background-color: blue;
            /* color: var(--clr-accent); */
            background-color: var(--clr-accent);
        }
    }
    &:hover {
        a,
        NavLink {
            background-color: var(--clr-accent);
        }
    }
`;

StyledCardSidebar.displayName = "StyledCardSidebar";
export const StyledCardSidebarLeft = styled.div`
    grid-column: 1/2;
    grid-row: 1/4;
`;
StyledCardSidebarLeft.displayName = "StyledCardSidebarLeft";

export const StyledCardHorizontal = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-auto-rows: repeat(minmax(3, 1fr));
    overflow: visible;
    cursor: pointer;
    /* grid-template-areas:
        "hd hd hd hd"
        "lft main main rt"
        "ft ft ft ft"; */
    border-left: ${(props) =>
        props.highlighted ? `5px solid var(--clr-accent)` : `none`};
    flex-direction: row;
    /* padding: 1rem 0rem 1rem 2rem; */
    color: white;
    background: ${(props) =>
        props.highlighted ? `var(--clr-primary-base)` : `var(--clr-primary-dark)`};
    /* justify-content: space-between; */
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    /* overflow: hidden; */
    width: 100%;
    min-width: 15%;
    /* max-width: 50%; */
    &:hover {
        a,
        NavLink {
            transform: scaleX(1);
        }
    }
    ${StyledCardSidebar} {
        a,
        Link {
            background-color: ${(props) =>
                props.highlighted ? `var(--clr-accent)` : `var(--clr-accent-pink)`};

            transition: background-color 100ms ease-in, transform 100ms ease-in;
            &:hover {
                background-color: var(--clr-accent);
            }
        }
    }
`;
StyledCardHorizontal.displayName = "StyledCardHorizontal";

export const StyledCard = styled.div`
    --highlighted: ${(props) => props.highlighted};
    --child-direction: ${(props) => (props.direction ? props.direction : "column")};
    --has-sidebar: ${(props) => (props.hasSidebar ? true : false)};
    display: flex;
    border-left: ${(props) => (props.highlighted ? `3px solid white` : `none`)};
    flex-direction: row;
    padding: 1rem 2rem;
    color: white;
    background: #25203f;
    /* justify-content: space-between; */
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
    width: fit-content;
    min-width: 15%;
    max-width: 50%;
    /* max-width: ${(props) => props.maxWidth || "45%"}; */
    * {
        justify-content: center;
    }

    ${StyledCardHeader}, ${StyledCardFooter},${StyledCardSidebar} {
        --highlighted: ${(props) => props.highlighted};
        flex-direction: var(--child-direction);
        align-items: center;
        justify-content: center;
    }
    ${StyledCardSidebar} {
        pointer-events: none;
        transform: scaleX(0);
        position: absolute;
        clip-path: 0;
        /* width: 0; */
        /* padding: 0; */
        /* opacity: 0; */
        transform-origin: center right;

        transition: transform 0.15s ease-in, opacity 0.15s ease-in;
        * {
        }
    }
    &:hover {
        ${StyledCardSidebar} {
            width: fit-content;
            display: flex;
            pointer-events: auto;
            padding: 0rem 1rem;
            transform: scaleX(1);
            /* opacity: 100%; */
        }
    }
    ${(props) =>
        props.highlighted &&
        css`
            ${StyledCardHeader} {
                align-items: center;
            }
        `}
`;
StyledCard.displayName = `StyledCard`;
