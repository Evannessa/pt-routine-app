import React from 'react';
import TimeValue from './TimeValue';
import styled from 'styled-components';

export const StyledValueGroup = styled.div`
        /* width: 100vw; */
        width: 100%;
        .timer__separator,
        h3 {
            font-size: clamp(3rem, 3rem + 2vh, 3.5rem);
            color: white;
        }
`;

const TimeValueGroup = ({time, updateTimerData, theme, isRep}) => {
 /**
     *
     * @param {value} value - the value by which we're increasing or decreasing
     * @param {boolean} isIncrease - is it an increase or a decrease
     * @param {unit} unit - which unit (seconds, minutes, hours) are we increasing
     */
    function updateValue(value, isIncrease, unit) {
        console.log("Are values updating?", {value, isIncrease, unit})
        //if it's a decrease, make the value negative
        //so we don't have to duplicate the code
        if (!isIncrease) {
            value *= -1;
        }
        let updatedTime = {
            ...time,
            [unit]: changeValueAndReturn(time[unit], value, unit)
        }
        updateTimerData("time", updatedTime)
    }

    function changeValueAndReturn(previousValue, value, unit, isIncrease) {
        let returnValue = previousValue + value;
        if (returnValue < 0) {
            returnValue = 0;
        }
        //want to overroll
        if (unit === "minutes" || unit === "seconds") {
            if (returnValue > 59) {
                returnValue = 0;
            }
        }
        return returnValue;
    }

    const timeValues = Object.keys(time).map((key, index)=> <TimeValue value={time[key]} unit={key} updateValue={updateValue} theme={theme} isRep={isRep}/>)

    return (
        <StyledValueGroup className="value-wrapper">
                {timeValues[0]}
                {/* <TimeValue value={time.hours} unit={"hours"} updateValue={updateValue} theme={theme}></TimeValue> */}
                <span className="timer__separator">:</span>
                {timeValues[1]}
                {/* <TimeValue value={time.minutes} unit={"minutes"} updateValue={updateValue} theme={theme}></TimeValue> */}
                <span className="timer__separator">:</span>
                {timeValues[2]}
                {/* <TimeValue value={time.seconds} unit={"seconds"} updateValue={updateValue} theme={theme}></TimeValue> */}
        </StyledValueGroup>

    );
}

export default TimeValueGroup;
