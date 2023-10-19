import React from 'react';
import TimeValueGroup from "./TimeValueGroup";
import styled from 'styled-components';
import { themes } from '../App';

const StyledBreakConfig = styled.div`
    position: absolute;
    top: 20%;
    left: 20%;
    transform: translate(-50%, -50%);
    height: 200px;
    width: 300px;
    z-index: 900;
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
    return (
        <StyledBreakConfig theme={themes.secondary}>
            <TimeValueGroup time={mockTime} updateTimerData={()=> console.log("updating auto break")}>
                
            </TimeValueGroup>

            
        </StyledBreakConfig>
    );
}

export default AutoBreakConfig;
