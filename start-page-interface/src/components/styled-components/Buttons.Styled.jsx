import styled from "styled-components";

export const StyledButton = styled.button`
    --clr-background-color: ${(props) => props.bgColor};
    --clr-bg-hover-color: ${(props) => props.bgColorAlt};
    --clr-text-color: ${(props) => props.color};
    --clr-text-hover-color: ${(props) => props.colorAlt};
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
				}
			`;
        }
    }}
    cursor: pointer;
`;

export const StyledSplitButtonWrapper = styled.span`
    border-radius: 10px;
    display: inline-flex;
`;
export const StyledSplitButtonPrimary = styled.button`
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;
export const StyledSplitButtonOverflow = styled.button`
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`;
export const StyledSplitButtonDropdown = styled.div``;

/** small buttons with no background or border, like close buttons on modals or chips, etc. */
export const IconButton = styled(StyledButton)`
    background: transparent;
    border: none;
    color: var(--clr-text-color);
`;
export const CircleIconButton = styled(IconButton)`
    background: var(--clr-background-color);
    border: none;
    color: var(--clr-text-color);
    border-radius: 50%;
    padding: 0.5em;
    /* width: 2rem; */
    /* height: 2rem; */
`;
export const ContainedButton = styled(StyledButton)`
    background: var(--clr-background-color);
    border: none;
    color: var(--clr-text-color);
    padding: 0.25em 1em;
`;
export const OutlinedButton = styled(ContainedButton)`
    background: transparent;
    border: 1px solid var(--clr-text-color);
`;

export const TextButton = styled(OutlinedButton)`
    border: none;
`;

export const FloatingActionButton = styled(StyledButton)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const ToggleButton = styled(StyledButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    --clr-text-color: ${(props) => props.color};
`;

export const ButtonGroup = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

export const ToggleButtonGroup = styled(ButtonGroup)`
    gap: 0;
    button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
