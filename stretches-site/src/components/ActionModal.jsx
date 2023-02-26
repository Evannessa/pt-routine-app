import React from "react";
import styled from "styled-components";
import textFormatter from "../helpers/formatText";
import * as Buttons from "./styled-components/Buttons.Styled";

const Modal = styled.dialog`
    padding: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    border: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 50vw;
    max-height: 50vh;
    border-radius: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
        rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    &::backdrop {
        background-color: rgba(0, 0, 0, 0.3);
    }
    overflow: hidden;
    .modal__header,
    .modal__body {
        padding: 0 clamp(2rem, 2rem + 1vw, 3rem);
    }
    .modal__header {
        display: flex;
        justify-content: center;
        width: auto;
        padding-block: clamp(0.75rem, 0.75rem + 1vh, 1rem);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background-image: ${(props) =>
            props.img === "spotifyLink"
                ? `url(
                      "/Free Blue, Purple and Green Acoustic Guitars Stock Photo.jpg"
                  )`
                : `url(
                      "/Free Selective Focus Photography of Popcorns Stock Photo.jpg"
                  )`};
        background-size: cover;
        ${Buttons.IconButton} {
            margin-left: auto;
            color: white;
        }
        margin-bottom: 1.25rem;
    }
    .modal__body {
        border-top-right-radius: 15px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.25rem;
        .modal__description {
            line-height: 1.5;
        }
    }
    h1 {
        font-size: clamp(1.5rem, 1.5rem + 1vh, 2rem);
        color: white;
    }

    .button-wrapper {
        margin-top: auto;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }
`;
export default function ActionModal(props) {
    const [formData, setFormData] = React.useState({
        embedArea: props.currentValue,
    });
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
        <Modal open={props.open} img={props.title}>
            <div className="modal__header">
                <h1 className="modal__title>">
                    {textFormatter.capitalizeFirstLetter(
                        textFormatter.camelCaseToWords(props.title)
                    )}
                </h1>

                <Buttons.IconButton onClick={() => props.cancelAction()}>
                    close
                </Buttons.IconButton>
            </div>

            <div className="modal__body">
                <p className="modal__description" style={{ color: "black" }}>
                    {props.description}
                </p>
                {props.type === "embed" && (
                    <textarea
                        name="embedArea"
                        placeholder="paste the embed code here"
                        onChange={handleChange}
                        value={formData.embedArea}
                    ></textarea>
                )}
            </div>
            <div className="modal__button-wrapper button-wrapper">
                <button
                    className="modal__btn primary"
                    onClick={() => {
                        submitAndClose(formData.embedArea);
                    }}
                >
                    Add {props.title === "spotifyLink" ? "Playlist" : "Video"}
                </button>
                <button
                    className="modal__btn"
                    onClick={() => props.cancelAction()}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
