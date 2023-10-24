import React from 'react';
import TimeValueGroup from "./TimeValueGroup";
import styled from 'styled-components';
import { themes } from '../App';

const StyledBreakConfig = styled.div`
    position: absolute;
    top: 20%;
    right: 20%;
    /* transform: translate(-50%, -50%); */
    max-height: 200px;
    max-width: 700px;
    width: 500px;
    z-index: 900;
    display: grid;
    place-content: center;
    .value-wrapper{
        display: flex;
        max-height: 100%;
    }
    --clr-clr1: ${(props) => props.theme.color1};
    --clr-clr2: ${(props) => props.theme.color2};
    --clr-gradient: linear-gradient(45deg, var(--clr-clr1), var(--clr-clr2));
    /* background: var(--clr-gradient); */
    background: ${props => props.theme.gradient};
    border-radius: 8px;
    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.gradient};
    }
`

const AutoBreakConfig = (props) => {
    const mockTime = {
        hours: 0,
        minutes: 0,
        seconds: 5,
    }

   function updateAutoBreak(property, value) {
        console.log("Updating auto break: ", props.id, property, value);
        let updateObject = { [property]: value };
        // props.updateFormData(updateObject, "autoBreakTime");
        props.updateFormData("autoBreakTime", value)
    }
    return (
        <StyledBreakConfig theme={themes.secondary}>
            <TimeValueGroup 
                theme={themes.secondary} 
                time={props.time ? props.time : mockTime} 
                updateTimerData={updateAutoBreak}
            />
        </StyledBreakConfig>
    );
}

export default AutoBreakConfig;
