import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { ThemeProvider } from "styled-components";

/* -------------------------------------------------------------------------- */
/* ---------------------------- StyledComponents ---------------------------- */

const StyledChangeButton = styled.button`
    font-size: clamp(1rem, 0.5vh + 1rem, 1.25rem);
    padding: clamp(0.65rem, 0.5vw + 0.65rem, 1rem);
    height: 2vh;
    width: 5ch;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(12px);
    color: ${(props) => props.theme.color2};
    transform: scale(1);
    transition: all 0.25s ease-out;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    &:hover {
        background-color: rgba(255, 255, 255, 0.95);
        transform: scale(1.15);
        color: ${(props) => props.theme.color1};
        border-color: ${(props) => props.theme.color1};
    }
`;
StyledChangeButton.displayName = "ChangeButton";

/* -------------------------------------------------------------------------- */
export default function ChangeTimeButton(props) {
    /* ------------------------------- React Hooks ------------------------------ */
    const theme = useContext(ThemeContext);
    const overrideTheme = props.theme

    /* ---------------------------- Return Statement ---------------------------- */
    return (
    <ThemeProvider theme={overrideTheme ? overrideTheme : theme}>
        <StyledChangeButton
            onClick={props.updateValue}
        >
                {props.isIncrease ? "+" : "-"}
                {props.value}
        </StyledChangeButton>
    </ThemeProvider>
    );
}
