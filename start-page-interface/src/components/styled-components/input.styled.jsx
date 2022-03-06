import styled from "styled-components";
import Form from "../input/Form";
export const StyledTextboxSpan = styled.div`
    background-color: #171529;
    min-width: 8rem;
    min-height: 2rem;
    border-radius: 4px;
    border: none;
    border-bottom: 2px solid #6495ed;

    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    color: #6495ed;
    padding: 0.25rem 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    align-items: center;
    height: fit-content;
    /* justify-content: center; */
    > span {
        background-color: #6495ed;
        color: white;
    }
    input {
        border: 0px;
        height: 100%;
        background-color: #171529;
        color: #6495ed;
    }
`;

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

export const StyledForm = styled.form`
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: repeat(3, 1fr), 1fr;
    gap: 1rem;
    z-index: 1;
    *:not(input) {
        color: white;
    }
    label {
        grid-column: 1/2;
        text-align: right;
    }
    input,
    textarea,
    ${StyledTextboxSpan} {
        grid-column: 2/3;
    }
    > button[type="submit"] {
        grid-column: 1/3;
        grid-row: 4/5;
    }

    > button[type="submit"] {
        background-color: #6495ed;
        border: none;
        color: white;
        padding: 0.5em 1em;
        border-radius: 5px;
    }
    > input,
    > textarea {
        background-color: #171529;
        min-width: 8rem;
        min-height: 2rem;
        border-radius: 4px;
        border: none;
        border-bottom: 2px solid #6495ed;
        color: #6495ed;
        padding: 0.25rem 0.5rem;
        display: flex;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    textarea {
        color: black;
    }
`;
