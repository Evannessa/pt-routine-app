import React from "react";
import styled from "styled-components";

const ChipButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const StyledChipSpan = styled.span`
    display: inline-box;
    border-radius: 3px;
    background-color: "cyan";
    color: white;
    min-height: 1rem;
    max-width: fit-content;
    min-width: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.15rem 0.25rem;

    /* > button {
        width: 0;
        opacity: 0%;
    }
    &:hover,
    &:focus {
        > button {
            width: fit-content;
            opacity: 100%;
        }
    } */
`;

function TagChips(props) {
    function changeColor() {}
    return (
        <StyledChipSpan>
            <ChipButton
                onClick={(e) => {
                    e.preventDefault();
                    return props.removeTag(props.id);
                }}>
                X
            </ChipButton>
            {props.tagName}
        </StyledChipSpan>
    );
}

export default TagChips;
