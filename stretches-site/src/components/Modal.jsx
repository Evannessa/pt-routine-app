import React from 'react';
import ActionFactory from '../classes/ActionFactory';
import textFormatter from '../helpers/formatText';
import styled from "styled-components";
import * as Buttons from "./styled-components/Buttons.Styled";
import { nanoid } from 'nanoid';

const StyledModal = styled.dialog`
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
        justify-content: space-evenly;
        align-items: center;
        width: auto;
        padding-block: clamp(0.75rem, 0.75rem + 1vh, 1rem);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background-image: ${props => props.img ? `url(${props.img})` : 'none'};
        background-color: var(--clr-primary-pink);
        background-size: cover;
        ${Buttons.IconButton} {
            margin-left: auto;
            color: white;
        }
        margin-bottom: 1.25rem;
        .modal__title-wrapper{
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            gap: 0.5rem;
            align-items: center;
            color: white;
        }
    }
    .modal__body {
        border-top-right-radius: 15px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.25rem;
        padding-block: 1.5rem;
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
const Modal = (props) => {
    function submitAndClose(data) {
        props.primaryAction(data);
        props.cancelAction();
    }

    const actionButtons = props.actions.map((action) =>
        <button className={`modal__btn ${action.options.classList ? action.options.classList : ""}`}

            key={nanoid()}
            onClick={(e) => {
                e.stopPropagation();
                action.functionRef(props.setId);
            }}
            title={action.description ? action.description : action.name}
        >
            <span className="material-icons">{action.icon}</span>
            <span>{action.name}</span>
        </button>)

    return (
        <StyledModal open={props.open} img={props.title}>
            <div className="modal__header">
                <div class="modal__title-wrapper">
                    {props.icon && <Buttons.Icon icon={props.icon}/>}
                    <h1 className="modal__title>">
                        {textFormatter.capitalizeFirstLetter(
                            textFormatter.camelCaseToWords(props.title ? props.title : "")
                        )}
                    </h1>
                </div>

                <Buttons.ButtonWithIcon onClick={() => props.cancelAction()} icon="close"/>
            </div>
            <div className="modal__body">
                <p className="modal__description" style={{ color: "black" }}>
                    {props.description}
                </p>
                {props.children}
            </div>
            <div className="modal__button-wrapper button-wrapper">
                {actionButtons}
                <button
                    className="modal__btn"
                    onClick={() => props.cancelAction()}
                >
                    Cancel
                </button>
            </div>
        </StyledModal>
    );
}

export default Modal;
