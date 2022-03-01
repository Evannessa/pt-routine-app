import React from "react";
import styled from "styled-components";

const StyledChipSpan = styled.span`
    display: inline-box;
    border-radius: 3px;
    background-color: "cyan";
    color: white;
    min-height: 1rem;
    max-width: 2rem;
    min-width: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.15rem 0.25rem;
`;

function TagChips(props) {
    return <StyledChipSpan>{props.tagName}</StyledChipSpan>;
}

export default TagChips;
