import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    display: grid;
    grid-template-rows: 1rem 2rem;
    grid-template-columns: 1fr;
    label {
        grid-row: 1/2;
        grid-column: 1/2;
        /* transform: translateY(25%); */
        background-color: white;
        text-transform: capitalize;
    }
    input {
        grid-row: 2/3;
        grid-column: 1/2;
        border: unset;
        border-bottom: 1px solid gray;
        transition: border-color 100ms ease-in-out, border-width 100ms ease-in-out;
        background: none;
        /* padding: clamp(0.5rem, 0.5vw + 0.5rem, 0.75rem); */
        &:hover {
            border-color: ${(props) => props.theme.color1};
        }
        &:focus {
            border-width: 2px;
            border-color: ${(props) => props.theme.color1};
            outline: unset;
        }
    }
`;

const FormRow = ({ type, name, value, handleChange, theme }) => {
    return (
        <StyledDiv className="form-row" theme={theme}>
            <label htmlFor={name} className="form-label">
                {name}
            </label>
            <input type={type} value={value} name={name} onChange={handleChange} className="form-input" />
        </StyledDiv>
    );
};

export default FormRow;
