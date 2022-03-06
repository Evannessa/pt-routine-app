import styled, { css } from "styled-components";

/** for generic wrappers to go around components */
export const CardComponent = styled.div`
    display: flex;
    flex-direction: ${(props) => props.direction || "row"};
    justify-content: ${(props) => props.justifyContent || "space-evenly"};
    flex-wrap: ${(props) => props.wrap || "wrap"};
`;

export const StyledCardHeader = styled.div`
    display: flex;
`;

export const StyledCardBody = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
`;
export const StyledCardFooter = styled.div`
    display: flex;
`;
export const StyledCardSidebar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0rem 1rem;
    background-color: #bf2063;
    margin-right: -3rem;
    margin-top: -1rem;
    margin-bottom: -1rem;
    margin-left: 2rem;
`;
export const StyledCard = styled.div`
    --highlighted: ${(props) => props.highlighted};
    --child-direction: ${(props) => (props.direction ? props.direction : "column")};
    --has-sidebar: ${(props) => (props.hasSidebar ? true : false)};
    display: flex;
    border-left: ${(props) => (props.highlighted ? `3px solid white` : `none`)};
    flex-direction: row;
    /* padding: 1rem 2rem; */
    color: white;
    background: #25203f;
    /* justify-content: space-between; */
    border-radius: 5px;
    overflow: hidden;
    width: calc(25% - 1rem);
    /* min-width: 25%; */
    /* max-width: ${(props) => props.maxWidth || "45%"}; */

    ${StyledCardHeader}, ${StyledCardFooter},${StyledCardSidebar} {
        --highlighted: ${(props) => props.highlighted};
        flex-direction: var(--child-direction);
    }
    ${StyledCardSidebar} {
        pointer-events: none;
        transform: scaleX(0);
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
