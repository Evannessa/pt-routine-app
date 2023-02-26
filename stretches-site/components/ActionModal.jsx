import React from "react";
import DropArea from "./DropArea";

export default function ActionModal(props) {
    return (
        <div className="modal action-modal">
            <div className="action-modal__header"></div>
            <h1 className="modal__title>">{props.title}</h1>
            <p className="modal__description">{props.description}</p>

            {props.type === "embed" && (
                <textarea placeholder="paste the embed code here"></textarea>
            )}
            {props.type === "upload" && <DropArea />}
            <div className="modal__button-wrapper button-wrapper">
                <button className="modal__btn primary">Add Playlist</button>
                <button className="modal__btn">Cancel</button>
            </div>
        </div>
    );
}
