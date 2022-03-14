import styled, { css } from "styled-components";

const backgroundColor = (props) => {
    return props.bgColor || "var(--clr-accent)";
};
const backgroundColorAlt = (props) => {
    return props.bgColorAlt || "var(--clr-accent-green)";
};
const color = (props) => {
    return props.color || "white";
};

const colorAlt = (props) => {
    return props.colorAlt || "var(--clr-accent-green)";
};
export const StyledButtonIconSpan = styled.span.attrs(({ className }) => ({
    className: className || "material-icons",
}))``;
export const StyledButton = styled.button`
    --clr-background-color: ${backgroundColor};
    --clr-bg-hover-color: ${backgroundColorAlt};
    --clr-text-color: ${color};
    --clr-text-hover-color: ${colorAlt};
    display: flex;
    align-items: center;
    ${(props) => {
        if (props.btnStyle === "contained") {
            return `
    			transition: background 0.15s linear, color 0.15s linear;
				&:hover{
					background: var(--clr-bg-hover-color);
					color: var(--clr-text-hover-color);
				}
			`;
        } else if (props.btnStyle === "outlined") {
            //fill with background color?
            return `
				transition: background 0.15s linear, color 0.15s linear;
				&:hover{
					background: var(--clr-bg-hover-color);
					color: var(--clr-text-hover-color);
				}
			`;
        } else {
            return `
				transition: color 0.15s linear;
				&:hover{
					color: var(--clr-text-hover-color);
					> * {
						transition: color 0.15s linear;
						color: var(--clr-text-hover-color);
					}
				}
			`;
        }
    }}
    cursor: pointer;
`;
StyledButton.displayName = "StyledButton";

/** small buttons with no background or border, like close buttons on modals or chips, etc. */
export const IconButton = styled(StyledButton).attrs(({ className }) => ({
    className: className || "material-icons",
}))`
    background: transparent;
    border: none;
    color: var(--clr-text-color);
`;
IconButton.displayName = "IconButton";
export const CircleIconButton = styled(IconButton)`
    background: var(--clr-background-color);
    border: none;
    color: var(--clr-text-color);
    border-radius: 50%;
    padding: 0.5em;
    /* width: 2rem; */
    /* height: 2rem; */
`;
CircleIconButton.displayName = "CircleIconButton";
export const ContainedButton = styled(StyledButton)`
    background: var(--clr-background-color);
    border: none;
    color: var(--clr-text-color);
    padding: 0.25em 1em;
    border-radius: 5px;
`;
ContainedButton.displayName = "ContainedButton";
export const OutlinedButton = styled(ContainedButton)`
    background: transparent;
    border: 1px solid var(--clr-text-color);
`;

OutlinedButton.displayName = "OutlinedButton";

export const TextButton = styled(OutlinedButton)`
    border: none;
`;

TextButton.displayName = "TextButton";
export const FloatingActionButton = styled(StyledButton)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;
FloatingActionButton.displayName = "FloatingActionButton";
export const ToggleButton = styled(StyledButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    --clr-text-color: ${(props) => props.color};
`;

ToggleButton.displayName = "ToggleButton";
export const ButtonGroup = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;
ButtonGroup.displayName = "ButtonGroup";

export const ToggleButtonGroup = styled(ButtonGroup)`
    gap: 0;
    button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
ToggleButtonGroup.displayName = "ToggleButtonGroup";
export const StyledSplitButtonWrapper = styled.span`
    border-radius: 10px;
    display: inline-flex;
    gap: 0.1rem;
`;
StyledSplitButtonWrapper.displayName = "StyledSplitButtonWrapper";
export const StyledSplitButtonPrimary = styled(ContainedButton).attrs((props) => ({
    className: props.className || "material-icons",
}))`
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    flex: 2;
    padding: 0.35rem 0.65rem;
`;
StyledSplitButtonPrimary.displayName = "StyledSplitButtonPrimary";
export const StyledSplitButtonOverflow = styled(ContainedButton).attrs((props) => ({
    className: props.className || "material-icons",
}))`
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    flex: 1;
    padding: 0;
    /* font-size: 1rem; */
`;
StyledSplitButtonOverflow.displayName = "StyledSplitButtonOverflow";
export const TabButton = styled(OutlinedButton)`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-color: var(--clr-primary-base);
    border-bottom-color: transparent;
    ${({ active }) =>
        active
            ? css`
                  background-color: var(--clr-primary-base);
              `
            : css`
                  background-color: transparent;
              `};
`;
TabButton.displayName = "TabButton";
export const StyledSplitButtonDropdown = styled.div``;

StyledSplitButtonDropdown.displayName = "ButtonDropdown";
