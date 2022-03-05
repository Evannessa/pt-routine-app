import styled from "styled-components";

const color =
    (variant, type = "main") =>
    (props) =>
        props.theme?.palette[variant][type];
const backgroundColor = (variant) => (props) => props.bgColor[variant];

const primaryColor = (type) => color("primary", type);
const secondaryColor = (type) => color("secondary", type);
const contrastTextColor = (variant) => color(variant, "contrastText");

export const ChipButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const StyledChipSpan = styled.span`
    background-color: ${backgroundColor("primary")};
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

//radio buttons with the "chip" class
export const chipGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem 0;
    input[type="radio"],
    input[type="checkbox"] {
        display: none;
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        border: 0;

        & + label {
            background-color: transparent;
            border: 1px solid cornflowerblue;
            color: cornflowerblue;
            padding: 0.5em 1em;
            text-align: center;
            border-radius: 9999px;
            z-index: 10;
            display: inline-block;
            vertical-align: middle;
            display: flex;
            align-items: center;
            gap: 0.45rem;

            &:hover {
                cursor: pointer;
            }
        }

        &:checked {
            & + label {
                background-color: cornflowerblue;
                color: white;
                font-weight: bold;
                // color: var(--clr-primary-pink)
            }
        }
    }

    .chip.chip-radio {
        position: relative;
    }
`;
