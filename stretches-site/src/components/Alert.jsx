import React from "react";
import styled, { css } from "styled-components";

const StyledAlert = styled.div`
    position: absolute;
    z-index: 100;
    left: 50%;
    top: 5rem;
    transform: translateX(-50%);
    background-color: ${({ alertType }) =>
        (alertType === "danger" && "red") || (alertType === "warning" && "orange") || "white"};
`;
function Alert(props, { type }) {
    return <StyledAlert alertType={type}>{props.children}</StyledAlert>;
}

export default Alert;
