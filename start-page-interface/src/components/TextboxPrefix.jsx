import React from "react";
import styled from "styled-components";

const StyledTextboxSpan = styled.span`
    background-color: #373737;
    input {
        min-width: 8rem;
        height: 2rem;
        border-radius: 4px;
        border: none;
        background-color: #373737;
        border-bottom: 2px solid #6495ed;
        color: #6495ed;
        padding: 0.25rem 0.5rem;
    }
`;

function TextboxPrefix(props) {
    return (
        <StyledTextboxSpan>
            <input type="text" name="" id="" />
        </StyledTextboxSpan>
    );
}

export default TextboxPrefix;
