import React from "react";
import ChangeTimeButton from "./ChangeTimeButton";

export default function TimeValue(props) {
    const [showChangeButtons, setShowChangeButtons] = React.useState(false);
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
    function handleMouseEnter(event) {
        setShowChangeButtons(true);
    }
    function handleMouseLeave(event) {
        setShowChangeButtons(false);
    }
    return (
        <div
            className="time-value"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showChangeButtons && (
                <div className="timer__increase-time">{increaseButtons}</div>
            )}
            <h1
                className="value"
                contentEditable={true}
                suppressContentEditableWarning={true}
            >
                {String(props.value).padStart(2, "0")}
            </h1>
            {showChangeButtons && (
                <div className="timer__decrease-time">{decreaseButtons}</div>
            )}
        </div>
    );
}
