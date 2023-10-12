import React from "react";
import styled from "styled-components";
const StyledSlide = styled.div`
    margin: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    overflow: hidden;
    z-index: 10;
    max-height: 100%;
    background-color: hsla(323, 72.3%, 12.7%, 1);

    img {
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
        height: 100%;
        background-color: hsla(323, 72.3%, 12.7%, 0.9);
        /* border-radius: 15px; */
    }
`;

export default function Slide(props) {
    return (
        <StyledSlide className="slide">
            <img className="slide__img" src={props.image} alt="exercise slide" />
        </StyledSlide>
    );
}
