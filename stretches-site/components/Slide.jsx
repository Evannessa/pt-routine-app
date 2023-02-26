import React from "react";

export default function Slide(props) {
    return (
        <div className="slide">
            <img className="slide__img" src={props.image} alt="exercise slide" />
        </div>
    );
}
