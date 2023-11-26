import styled, { css } from "styled-components";
import Form from "../input/Form";
import Input from "../input/Input";

export const StyledCheckbox = styled.div`


`


export const StyledTextboxSpan = styled.div`
    background-color: var(--clr-primary-deep-dark);
    min-width: 8rem;
    min-height: 2rem;
    border-radius: 4px;
    border: none;
    border-bottom: 2px solid var(--clr-primary-accent);

    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    color: var(--clr-primary-accent);
    padding: 0.25rem 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    align-items: center;
    height: fit-content;
    /* justify-content: center; */
    > span {
        background-color: var(--clr-primary-deep-dark);
        color: white;
    }
    input {
        border: 0px;
        height: 100%;
        background-color: var(--clr-primary-deep-dark);
        color: var(--clr-primary-accent);
    }
`;
StyledTextboxSpan.displayName = StyledTextboxSpan;

export const StyledSelect = styled.select`
    background-color: var(--clr-primary-dark);
    color: var(--clr-accent-lighter) !important;
    border: none;
    border-bottom: 2px solid var(--clr-accent);
    border-radius: 5px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    padding: 0.25em 0.5em;
`;
StyledSelect.displayName = "StyledSelect";

export const StyledDatalist = styled.datalist`
    background-color: var(--clr-primary-dark);
    color: white;
`;
StyledSelect.displayName = "StyledDatalist";
// const StyledInputComponent = styled(Input)``;
// export const StyledInputReverse = styled.div`
//     ${StyledInputComponent} {
//         flex-direction: row-reverse;
//     }
// `;
// export const StyledInput = styled.div`
//     ${StyledInputComponent} {
//         flex-direction: row;
//     }
// `;
// #region StyledComponents

export const StyledContainer = styled.div`
    /* position: absolute; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5rem 2rem;
    gap: 1rem;
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-style: preserve-3d; */
    width: fit-content;
    background: #342e57;
    border-radius: 15px;
    z-index: 1;
    > button {
        align-self: flex-end;
    }
`;
StyledContainer.displayName = StyledContainer;
export const StyledChipBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem 0;
    input[type="radio"],
    input[type="checkbox"] {
        /* display: none;
            position: absolute;
            overflow: hidden;
            clip: rect(0 0 0 0);
            height: 1px;
            width: 1px;
            margin: -1px;
            padding: 0;
            border: 0; */
        label {
            background-color: ${(props) =>
                props.checked ? "cornflowerblue" : "transparent"};
            color: ${(props) => (props.checked ? "white" : "cornflowerblue")};
            ${(props) =>
                props.checked &&
                css`
                    font-weight: bold;
                `};
        }
    }
`;
StyledChipBox.displayName = "StyledChipBox";

const returnDirection = function (props) {
    return props.direction || "column";
};
const returnJustify = function (props) {
    return props.justify || "stretch";
};
const returnAlign = function (props) {
    return props.align || "stretch";
};
const returnChildDirection = function (props) {
    return props.childDirection || "row-reverse";
};
export const StyledForm = styled.form`
    display: flex;
    flex-direction: ${returnDirection};
    justify-content: ${returnJustify};
    align-items: ${returnAlign};
    fieldset {
        border: none;
    }
    label {
        color: cornflowerblue;
    }
    gap: 1rem;
    z-index: 1;

    *:not(input):not(button):not(.material-icons) {
        color: white;
    }
    fieldset {
        background-color: var(--clr-primary-base);
        border-radius: 15px;
        padding: 0.75rem 1.4rem;
        legend {
            color: cornflowerblue;
            font-weight: bold;
        }
    }
    div,
    > span {
        display: flex;
        justify-content: stretch;
        align-items: stretch;
        gap: 1.5rem;
        label,
        legend {
            flex: 1;
            color: cornflowerblue;
            font-weight: bold;
            text-align: right;
        }
        input,
        textarea,
        div {
            flex: 3;
        }
    }
    div {
        justify-content: stretch;
        flex-direction: ${returnChildDirection};
    }
    ${StyledTextboxSpan} {
        flex-direction: row;
        gap: 0.25rem;
    }

    /* label:not(.chip) {
        grid-column: 1/2;
        text-align: right;
    } 
    input[type="text"],
    textarea,
    ${StyledTextboxSpan} {
        grid-column: 2/3;
    }
    > button[type="submit"] {
        grid-column: 1/3;
        grid-row: 4/5;
    } */

    > button[type="submit"] {
        background-color: var(--clr-primary-accent);
        border: none;
        color: white;
        padding: 0.5em 1em;
        border-radius: 5px;
    }
    input[type="text"],
    textarea {
        background-color: var(--clr-primary-deep-dark);
        min-width: 8rem;
        min-height: 2rem;
        border-radius: 4px;
        border: none;
        border-bottom: 2px solid var(--clr-accent);
        color: var(--clr-accent);
        padding: 0.25rem 0.5rem;
        display: flex;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    ${StyledTextboxSpan} {
        display: flex;
        &&& {
            input[type="text"] {
                border-bottom: 0px !important;
            }
        }
    }
`;
StyledForm.displayName = "StyledForm";
