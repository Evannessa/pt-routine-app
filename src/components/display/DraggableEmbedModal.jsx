import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";

const StyledDraggable = styled.div`
    position: fixed;
    z-index: 900;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 1rem 1fr;
    width: 417px;
    height: 281px;

    aspect-ratio: 16/9;
    resize: both;
    /* padding-top: unset; */
    border-radius: 12px;
    border: 2px solid white;
    overflow: hidden;

    background-color: #f5f5f5;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, -3px -5px, 10px,
        rgba(0, 0, 0, 0.3);
    .anchor {
        grid-row: 1/2;
        grid-column: 1/2;
        border-top-right-radius: 8px;
        border-top-right-radius: 8px;
        background-color: #f5f5f5;
        color: currentColor;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

function DraggableEmbedModal(props) {
    return (
        <Draggable handle=".anchor">
            <StyledDraggable className="draggable-modal">
                <div className="anchor">
                    <span class="material-symbols-outlined">drag_handle</span>
                </div>
                {props.children}
            </StyledDraggable>
        </Draggable>
    );
}

export default DraggableEmbedModal;
