import React from "react";
import styled from "styled-components";
import textFormatter from "../helpers/formatText";
import * as Buttons from "./styled-components/Buttons.Styled";

import guitarPhoto from "../images/GuitarPhoto.jpg"
import popcornPhoth from "../images/popcornPhoto.jpg"
import Input from "./input/Input";
import ActionFactory from "../classes/ActionFactory";

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
        background-image: linear-gradient(45deg, #ff000085, #ffc0cb7d) 
        ${(props) =>
            props.img === "spotifyLink"
                ? `, url(
                      "${guitarPhoto}"
                  )`
                : `, url(
                      "${popcornPhoth}"
                  )`};
        background-size: cover;
        background-position: center;
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
    .modal__btn{
        font-size: medium;
        font-weight: 500;
        &.primary{
            font-weight: bold;
        }
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

    function pasteIntoInput(){

    }

    function submitAndClose(data) {
        props.primaryAction(data);
        props.cancelAction();
    }

    return (
        <Modal open={props.open} img={props.title}>
            <div className="modal__header">
                <h1 className="modal__title>">
                    Paste {textFormatter.capitalizeFirstLetter(
                        textFormatter.camelCaseToWords(props.title)
                    )}
                </h1>

                <Buttons.ButtonWithIcon onClick={() => props.cancelAction()} icon="close">
                </Buttons.ButtonWithIcon>
            </div>

            <div className="modal__body">
                <p className="modal__description" style={{ color: "black" }}>
                    {props.description}
                </p>
                {props.type === "embed" && (
                    <>
                    <input
                        type="text"
                        name="embedArea"
                        placeholder="Paste Url"
                        onChange={handleChange}
                        value={formData.embedArea}
                    />
                    {/* TODO: A paste functionality to be added later */}
                    {/* <Buttons.IconButton icon="content_paste" onClick={()}/> */}
                </>
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
