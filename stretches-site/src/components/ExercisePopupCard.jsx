import React from 'react';
import FloatingToolbar from './FloatingToolbar';
import styled from 'styled-components';


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
    return (
        <StyledPopupCard>
            <p className="tooltip-card-title">{timer.label}</p>
            <FloatingToolbar actions={actions} timerId={dataKey} coords={coords}></FloatingToolbar>
            <img src={src} alt="Exercise Slide" crossOrigin="true" onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = cannotLoad;
            }} />
            {/* <p>{description}</p> */}
        </StyledPopupCard>
    );
}

export default ExercisePopupCard;
