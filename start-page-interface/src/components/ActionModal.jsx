import React from "react";

export default function ActionModal(props) {
    const [formData, setFormData] = React.useState({ embedArea: props.currentValue });
    function handleChange(event) {
        let { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    function submitAndClose(data) {
        props.primaryAction(data);
        props.cancelAction();
    }

    return (
        <div className="modal action-modal">
            <div className="action-modal__header"></div>
            <h1 className="modal__title>">{props.title}</h1>
            <p className="modal__description" style={{ color: "black" }}>
                {props.description}
            </p>

            {props.type === "embed" && (
                <textarea
                    name="embedArea"
                    placeholder="paste the embed code here"
                    onChange={handleChange}
                    value={formData.embedArea}></textarea>
            )}
            <div className="modal__button-wrapper button-wrapper">
                <button
                    className="modal__btn primary"
                    onClick={() => {
                        submitAndClose(formData.embedArea);
                    }}>
                    Add Playlist
                </button>
                <button className="modal__btn" onClick={() => props.cancelAction()}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
