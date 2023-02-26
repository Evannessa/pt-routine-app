import React from "react";

export default function ChangeTimeButton(props) {
    return (
        <button
            className={`changeTime btn flat-box ghost colorful-ghost ${
                props.isIncrease ? "" : "secondary-color"
            }`}
            onClick={props.updateValue}
        >
            {props.isIncrease ? "+" : "-"}
            {props.value}
        </button>
    );
}
