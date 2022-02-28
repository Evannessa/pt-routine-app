import React from "react";
import styled from "styled-components";

const StyledChipSpan = styled.span`
    border-radius: 3px;
    background-color: "cyan";
    color: white;
`;

function TagChips(props) {
    return <StyledChipSpan>{props.tagName}</StyledChipSpan>;
}

export default TagChips;
