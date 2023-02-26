import React from "react";
import ChangeTimeButton from "./ChangeTimeButton";
import styled from "styled-components";

const StyledChangeButtonWrapper = styled.div`
    opacity: 0;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 5px;
`;
StyledChangeButtonWrapper.displayName = "StyledChangeButtonWrapper";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
const StyledTimeValue = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
        font-weight: 200;
    }
    /* ${StyledChangeButtonWrapper} {
        display: ${(props) => (props.showChangeButtons ? "block" : "none")};
    } */
    &:hover,
    &:focus {
        ${StyledChangeButtonWrapper} {
            display: flex;
            opacity: 100%;
            pointer-events: auto;
        }
    }
`;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
export default function TimeValue(props) {
    /* ----------------------------- state and hooks ---------------------------- */

    const [showChangeButtons, setShowChangeButtons] = React.useState(false);
    /* -------------------------------- functions ------------------------------- */

    /**
     * creates buttons that'll increase or decrease time by specific values when clicked
     * @param {*} isIncrease - bool to determine if it's an "increase" or a "decrease" of time
     * @returns the created buttons
     */
    function createChangeTimeButtons(isIncrease) {
        let changeBtns = [];
        let values = [1, 5, 10, 30];
        for (let i = 0; i <= 3; i++) {
            changeBtns.push(
                <ChangeTimeButton
                    key={i}
                    value={values[i]}
                    isIncrease={isIncrease}
                    updateValue={() =>
                        props.updateValue(values[i], isIncrease, props.unit)
                    }
                />
            );
        }
        return changeBtns;
    }
    let increaseButtons = createChangeTimeButtons(true).reverse();
    let decreaseButtons = createChangeTimeButtons(false);

    /* ----------------------------- event handlers ----------------------------- */

    function handleMouseEnter(event) {
        setShowChangeButtons(true);
    }
    function handleMouseLeave(event) {
        setShowChangeButtons(false);
    }
    /* --------------------------------- return --------------------------------- */
    return (
        <StyledTimeValue
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-testid={props.unit}
        >
            {/* <Portal className="portal" props={{ className: "portal" }}> */}
            <StyledChangeButtonWrapper showChangeButtons={showChangeButtons}>
                {increaseButtons}
            </StyledChangeButtonWrapper>
            <h3
                className="value"
                contentEditable={true}
                suppressContentEditableWarning={true}
            >
                {String(props.value).padStart(2, "0")}
            </h3>
            <StyledChangeButtonWrapper showChangeButtons={showChangeButtons}>
                {decreaseButtons}
            </StyledChangeButtonWrapper>
        </StyledTimeValue>
    );
}
