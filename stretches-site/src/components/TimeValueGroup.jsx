import React from 'react';
import TimeValue from './TimeValue';

const TimeValueGroup = ({time, updateTimerData}) => {
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
        // return updatedTime
        // setTime((prevTime) => {
        //     return {
        //         ...prevTime,
        //         // [unit]: prevTime[unit] + value,
        //         [unit]: changeValueAndReturn(prevTime[unit], value, unit),
        //     };
        // });
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

    return (
        <div className="value-wrapper">
                <TimeValue value={time.hours} unit={"hours"} updateValue={updateValue}></TimeValue>
                <span className="timer__separator">:</span>
                <TimeValue value={time.minutes} unit={"minutes"} updateValue={updateValue}></TimeValue>
                <span className="timer__separator">:</span>
                <TimeValue value={time.seconds} unit={"seconds"} updateValue={updateValue}></TimeValue>
        </div>
    );
}

export default TimeValueGroup;
