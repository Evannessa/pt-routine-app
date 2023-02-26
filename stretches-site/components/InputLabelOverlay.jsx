import React from "react";

export default function InputLabelOverlay(props) {
    return (
        <div className="input-label-overlay">
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={props.handleChange}
            />

            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}
