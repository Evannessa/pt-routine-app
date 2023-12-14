import React from 'react';
import FloatingToolbar from './FloatingToolbar';
import styled from 'styled-components';
import hourglassPrimary from "../images/hourglass_fill_0.png"
import hourglassSecondary from "../images/hourglass_fill_3.png"
import { themes } from '../App';

const StyledPopupCard = styled.section`
    p{
        padding: 0.5em;
        color: ${props => props.isBreak ? props.themes.secondary.color2 : props.themes.primary.color1};

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
    return (
        <StyledPopupCard isBreak={timer.isBreak} themes={themes}>
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
