import React from "react";

export default function Task(props) {
    return (
        <div className="task">
            <input
                type="text"
                className="task__description blending-text-box"
                name="description"
                value={props.description}
                onChange={props.handleChange}
            />
        </div>
    );
}
