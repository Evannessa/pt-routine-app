import React from "react";
import styled from "styled-components";

const ChipButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const StyledChipSpan = styled.span`
    display: inline-flex;
    align-items: center;
    border-radius: 3px;
    color: white;
    min-height: 1rem;
    max-width: fit-content;
    min-width: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.15rem 0.25rem;
    > span {
        display: inline-flex;
        text-transform: capitalize;
    }

    > button {
        max-height: 1rem;
        display: inline-flex;
        align-items: center;
        font-size: 1rem;
        transition: color 0.1s linear;
        &:hover {
            color: red;
        }
    }
`;

function TagChips(props) {
    console.log(props.tagName);
    function changeColor() {}
    return (
        <StyledChipSpan>
            <ChipButton
                className="material-icons"
                onClick={(e) => {
                    e.preventDefault();
                    return props.removeTag(props.id);
                }}>
                clear
            </ChipButton>
            {/* {props.tagName} */}
            <span>{props.tagName}</span>
        </StyledChipSpan>
    );
}

export default TagChips;
