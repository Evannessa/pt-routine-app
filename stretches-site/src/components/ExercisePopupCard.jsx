import React from 'react';
import FloatingToolbar from './FloatingToolbar';
import styled from 'styled-components';
import hourglassPrimary from "../images/hourglass_1_full.png"
import hourglassSecondary from "../images/hourglass_4.png"

const StyledPopupCard = styled.section`
    p{
        padding: 0.5em;

    }
  
`;

/**
 * An popup card that displays details about the exercise when a thumbnail/card is hovered
 * @param {Object} props 
 * @returns 
 */
const ExercisePopupCard = (props) => {
    const { src, cannotLoad, actions, dataKey, coords, timer } = props.data
    const placeholder = timer.isBreak ? hourglassSecondary : hourglassPrimary
    console.log(" Source is ", src)
    return (
        <StyledPopupCard>
            <p className="tooltip-card-title">{timer.label}</p>
            <FloatingToolbar actions={actions} timerId={dataKey} coords={coords}></FloatingToolbar>
            <img src={src.length > 0 ? src : placeholder} alt="Exercise Slide" crossOrigin="true" onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = cannotLoad;
            }} />
            {/* <p>{description}</p> */}
        </StyledPopupCard>
    );
}

export default ExercisePopupCard;
