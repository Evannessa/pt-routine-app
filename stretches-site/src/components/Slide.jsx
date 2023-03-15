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

    img {
        object-fit: contain;
        max-width: 100%;
        border-radius: 15px;
    }
`;

export default function Slide(props) {
    return (
        <StyledSlide className="slide">
            <img className="slide__img" src={props.image} alt="exercise slide" />
        </StyledSlide>
    );
}
