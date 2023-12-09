import React from 'react';
import sunsetLandscape from "../images/sunset_landscape.jpg"
import styled from 'styled-components';

const StyledImg = styled.img`
    object-fit: contain;
    /* max-width: 100vw; */
    width: 100%;
    object-position: top;
    /* max-height: 50vh; */
`;
const StyledDiv = styled.div`
    background-image: ${`url(${sunsetLandscape})`};
    background-size: contain;
    background-repeat: no-repeat;
    height: 100%;

`

const RoutinePreview = (routine) => {
    return (
        <StyledDiv>
            <p>{routine ? routine.name : ""}</p>
            
            
            {/* <StyledImg src={sunsetLandscape} alt="A vector illustration of a landscape at sunset in pink, red, and orange" /> */}

            
        </StyledDiv>
    );
}

export default RoutinePreview;
