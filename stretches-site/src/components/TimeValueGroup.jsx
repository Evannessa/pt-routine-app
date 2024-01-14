import React from 'react';
import TimeValue from './TimeValue';
import styled from 'styled-components';
import Input, { StyledInputWrapper } from "./input/Input";
import repeatIcon from "../images/refresh-symbol.png"
import { Icon } from './styled-components/Buttons.Styled';

export const StyledValueGroup = styled.div`
        /* width: 100vw; */
        /* width: 100%; */
        width: fit-content;
        .timer__separator,
        h3 {
            font-size: clamp(3rem, 3rem + 2vh, 3.5rem);
            color: white;
        }
        position: relative;
        .repeat__wrapper{
            position: absolute;
            right: 0;
            transform: translate(100%, 100%) scale(0.75);
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: 100%;
            align-items: center;
            justify-items: center;
            place-items: center;
            width: 2.5rem;
            height: 2.5rem;
            /* background-color: hsla(0, 0%, 100%, 0.431); */
            /* width: 2rem;
            height: 2rem; */
            .repeat-icon, ${StyledInputWrapper}{
                grid-row: 1/2;
                grid-column: 1/2;
                align-content: center;
            }
            .repeat-icon{
                object-fit:contain;
                width: 100%;
                height: 100%;
                opacity: 25%;
                pointer-events: none;
            }
            span{
                /* color:darkred; */
                color: white;
                transform: translateY(0.1rem);
                font-weight: normal;
            }
            cursor: pointer;

            ${StyledInputWrapper}{
                padding: unset;
                width: 100%;
                height: 100%;
                place-content: center;
                .number-box{
                    ${props => props.isRep && `font-size: xxx-large`};
                    font-weight: 100;
                    span{
                        display: block;
                        height: 1.25rem;
                        width: 1.25rem;
                        font-size: 1.25rem;
                        text-align: center;
                    }
                }
                .number__down, .number__up{
                    opacity: 0%;
                    pointer-events: none;
                    position: absolute;
                    transform: translateX(-50%);
                } 
                .number{
                    &__up{
                        bottom: 100%;
                        left: 50%;
                    }
                    &__down{
                        top: 100%;
                        left: 50%;
                    }

                }
            }
            &:hover{
                
                .number__down, .number__up{
                    opacity: 100%;
                    pointer-events: auto;
                } 

            }
    }
`;

const TimeValueGroup = ({time, updateTimerData, theme, isRep, repeatNumber, id}) => {
 /**
     *
     * @param {value} value - the value by which we're increasing or decreasing
     * @param {boolean} isIncrease - is it an increase or a decrease
     * @param {unit} unit - which unit (seconds, minutes, hours) are we increasing
     */
    function updateValue(value, isIncrease, unit) {
   
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

    const timeValues = Object.keys(time).map((key, index)=> { return {
        key: key,
        component: <TimeValue 
        value={time[key]} 
        unit={key} 
        updateValue={updateValue} 
        theme={theme} 
        isRep={isRep}/>}}
    )

    function getComponentByKey(array, key){
        return array.find(val => val.key == key).component
    }
 

    return (
        <StyledValueGroup className="value-wrapper" repeatIcon={repeatIcon} isRep={isRep}>
                {!isRep && 
                <>
                    {getComponentByKey(timeValues, "hours")}
                    {/* <TimeValue value={time.hours} unit={"hours"} updateValue={updateValue} theme={theme}></TimeValue> */}
                    <span className="timer__separator">:</span>
                </>
                }
                    {getComponentByKey(timeValues, "minutes")}
                {/* <TimeValue value={time.minutes} unit={"minutes"} updateValue={updateValue} theme={theme}></TimeValue> */}
                <span className="timer__separator">:</span>
                    {getComponentByKey(timeValues, "seconds")}

                {/* <TimeValue value={time.seconds} unit={"seconds"} updateValue={updateValue} theme={theme}></TimeValue> */}
                    <div className="repeat__wrapper">
                        <Input
                            type="number"
                            name="repeatNumber"
                            id={`${id}repeatNumber`}
                            value={parseInt(repeatNumber) || 0}
                            setStateFunction={updateTimerData}
                            hasLabel={true}
                            label="No. of Reps"
                            tooltip="How many times will this stretch or exercise repeat?"
                            inputStyle="numberSpinner"
                            style={{
                                color: "white",
                            }}
                        ></Input>
                        {/* <div className="repeat-icon"> */}
                            {/* <Icon icon="replay"></Icon> */}
                        {/* </div> */}
                        <img className="repeat-icon" src={repeatIcon} alt="repeat icon"/>
                     </div>
                {/* <p className='timer__repeat'>{parseInt(repeatNumber)}</p> */}
        </StyledValueGroup>

    );
}

export default TimeValueGroup;
