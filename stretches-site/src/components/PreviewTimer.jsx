import React from "react";
import InputNumber from "./InputNumber";
import TimeValue from "./TimeValue";
import DropArea, { StyledDropArea } from "./DropArea";
import { useParams } from "react-router-dom";
import { BackgroundWrapper } from "./styled-components/BackgroundWrapper.styled";
import styled from "styled-components";
import { Container } from "./styled-components/layout.styled";
import { IconButton, CircleIconButton, ButtonWithIcon } from "./styled-components/Buttons.Styled";
import Input, {StyledInputWrapper} from "./input/Input";
import { device } from "./styled-components/devices";
import UploadModal from "./UploadModal";

/* ---------------------------- Styled Components --------------------------- */
// #region Styled Components
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
const ExtraButtons = styled(Container)`
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    background-color: transparent;
    width: 60%;
    padding: 0;
`;

ExtraButtons.displayName = "ExtraButtons";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
const StyledWrapper = styled(Container)`
    --padding-top: clamp(1rem, 1vw + 1rem, 2rem);


    display: ${(props) => (props.showModal ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    padding: clamp(1rem, 1vw + 1rem, 2rem);
    border-radius: 15px;
    background-color: #ffffff92;
    backdrop-filter: blur(5px);
    height: 80%;
    width: 90%;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    /* box-shadow: rgba(5, 5, 7, 0.15) 0px 48px 100px 0px; */
    top: 50%;
    left: 50%;
    z-index: 200;
    transform: translate(-50%, -50%);
    text-align: center;
    gap: 0.5rem;
    label {
        color: currentColor;
    }
    h3 {
        color: cornflowerblue;
        font-size: clamp(0.75rem, 1vw + 0.75rem, 1.25rem);
        margin-top: auto;
        margin-bottom: auto;
        + div {
            margin-bottom: auto;
        }
    }
    @media ${device.tablet} {
        background-color: transparent;
        position: relative;
        /* display: flex; */
        height: 100%;
        width: auto;
        box-shadow: unset;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 1fr 60%;
        align-items: center;
        justify-items: center;
        h3 {
            grid-row: 1/2;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.25rem;
            color: white;
            align-self:end;
            margin-bottom: 1rem;
            
            ${IconButton} {
                vertical-align: middle;
                max-width: 2rem;
            }
        }

        
        .task-description, ${StyledDropArea}{
            height: 80%;
            width: 80%;
            align-items: center;
	        /* box-shadow: rgba(33, 33, 33, 0.314) 0px 2px 0px 2px inset, rgba(255, 255, 255, 0.342) 0 -2px 0 -2px inset; */
            /* border-bottom: 3px solid rgba(255, 255, 255, 0.342);  */
            input[type="text"],textarea{
                border-radius: 20px;
                border-width: 1px;
                width: 100%;
            }
            textarea{
                background-color: transparent;
                color: white;
                /* border-style: dashed; */
            }
        }

        .task-description{
            color: white;
            border-radius: 20px;
            border-width: 1px;
        }
    }
`;
StyledWrapper.displayName = "StyledWrapper";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
const BottomDrawer = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    width: 100%;
    z-index: -4;
    height: 30%;
    fieldset.chip-group{
        justify-content: center;
        ${StyledInputWrapper} label{
            border-color: white;
            color: white;
        }
    }
    ${ExtraButtons} {
        display: flex;
    }
    @media ${device.tablet} {
        ${ExtraButtons} {
            display: none;
        }
    }
`;
BottomDrawer.displayName = "BottomDrawer";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
const FlexContainer = styled(Container)`
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: center;
    h1,
    h2 {
        font-size: clamp(1rem, 1rem + 2vw, 2rem);
        display: flex;
    }
    p,
    input, textarea {
        font-size: clamp(0.75rem, 0.75rem + 1vw, 1rem);
    }

    .value-wrapper {
        width: 100vw;
        .timer__separator,
        h3 {
            font-size: clamp(3rem, 3rem + 2vh, 3.5rem);
        }
    }

    @media ${device.tablet} {
        ${BottomDrawer} {
            display: none;
        }
        .value-wrapper {
            width: unset;
        }
    }
    /* .dropArea,
    .input-label-overlay {
        display: none;
    } */
`;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const BottomForm = styled.form`
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: white; */
    position: relative;
    fieldset {
        margin-inline: auto !important;
	    display: flex;
 	    flex-wrap: wrap;
 	    gap: 1rem;
 	    margin: 1rem 0;
    }
    > span {
        display: inline-flex;
        justify-content: space-evenly;
        align-items: center;
        label {
            color: cornflowerblue;
            margin-right: 2%;
        }
        margin-inline: auto;
    }
`;
BottomForm.displayName = "BottomForm";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// #endregion
// @blocksort desc
export default function PreviewTimer(props) {
    // @blocksort desc
    /* ----------------------------- State and Hooks ---------------------------- */
    // #region State and Hooks
    const params = useParams();
    const [time, setTime] = React.useState(props.time);
    const [showDropModal, setShowDropModal] = React.useState(false);
    const [showGalleryModal, setShowGalleryModal] = React.useState(false);
    const [showTextModal, setShowTextModal] = React.useState(false);
    const [formData, setFormData] = React.useState({
        isBreak: props.isBreak,
        description: props.description,
        autostart: props.autostart,
        repeatNumber: props.repeatNumber,
    });

    //update time
    React.useEffect(() => {
        let updateObject = { time: { ...time } };
        props.updateTimerData(updateObject, props.id);
    }, [time]);
    // #endregion

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
        setTime((prevTime) => {
            return {
                ...prevTime,
                // [unit]: prevTime[unit] + value,
                [unit]: changeValueAndReturn(prevTime[unit], value, unit),
            };
        });
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
                // if(unit === "seconds"){
                // updateValue()
                // }
            }
        }
        return returnValue;
    }

    /**
     * Updating timer data in TimerGallery parent
     */
    function updateTimerData(property, value) {
        console.log("Updating this timer: ", props.id, property, value);
        if (property === "repeatNumber") {
            value = parseInt(value);
        }
        let updateObject = { [property]: value };
        props.updateTimerData(updateObject, props.id);
    }

    return (
        <BackgroundWrapper
            className={`preview-timer-wrapper ${formData.isBreak ? "break" : ""}`}
            break={formData.isBreak}
            data-key={props.id}
        >
            {/* #region timer values */}
            <div className="preview-timer" data-testid={"preview-timer"}>
                <FlexContainer full={true} fullVertical={true}>
                    <h2 className="preview-timer__number">Timer {props.number}</h2>
                    {/* <SpeedDialMenu actions={actions} /> */}
                    {showGalleryModal && (
                        <UploadModal
                            parentId={props.id}
                            slideImagePath={props.slideImagePath}
                            updateTimerData={updateTimerData}
                            closeCallback={()=>
                                setShowGalleryModal(false)
                            }
                        ></UploadModal>
                    )}
                    <StyledWrapper showModal={showDropModal}>
                        {showDropModal && (
                            <ButtonWithIcon
                                color="slategray"
                                onClick={() => {
                                    setShowDropModal(false);
                                }}
                                icon="close"
                            >
                            </ButtonWithIcon>
                        )}
                        <h3>
                            Drop an Image{" "}
                            <ButtonWithIcon
                                icon="gallery_thumbnail"
                                onClick={() => {
                                    setShowGalleryModal(!showGalleryModal);
                                }}
                                title="Choose from previously uploaded images"
                            ></ButtonWithIcon>
                        </h3>
                        {params.setId && (
                            <DropArea
                                parentId={props.id}
                                slideImagePath={props.slideImagePath}
                                updateTimerData={updateTimerData}
                            />
                        )}
                    </StyledWrapper>
                    <div className="value-wrapper">
                        <TimeValue value={time.hours} unit={"hours"} updateValue={updateValue}></TimeValue>
                        <span className="timer__separator">:</span>
                        <TimeValue value={time.minutes} unit={"minutes"} updateValue={updateValue}></TimeValue>
                        <span className="timer__separator">:</span>
                        <TimeValue value={time.seconds} unit={"seconds"} updateValue={updateValue}></TimeValue>
                    </div>

                    {/* only show drop area if we've saved the timer */}
                    <StyledWrapper showModal={showTextModal}>
                        {showTextModal && (
                            <ButtonWithIcon
                                color="slategray"
                                style={{ alignSelf: "flex-end" }}
                                onClick={() => {
                                    setShowTextModal(false);
                                }}
                                icon="close"
                            >
                            </ButtonWithIcon>
                        )}
                        <h3>Enter a Description</h3>
                        <Input
                            className="task-description"
                            type="textarea"
                            name="description"
                            id={`${props.id}task`}
                            value={props.description || ""}
                            setStateFunction={updateTimerData}
                            hasLabel={false}
                            style={{ color: "white" }}
                        ></Input>
                    </StyledWrapper>
                </FlexContainer>
                {/* #endregion */}
                <BottomDrawer full={true}>
                    <ExtraButtons full={true} justifyCenter={true} alignCenter={true}>
                        <ButtonWithIcon
                            color="white"
                            type="circle"
                            bgColor="transparent"
                            icon="image"
                            onClick={() => {
                                setShowDropModal((prevState) => !prevState);
                            }}
                            title="Show drop image modal"
                        ></ButtonWithIcon>

                        <ButtonWithIcon
                            color="white"
                            type="circle"
                            bgColor="transparent"
                            icon="edit_note"
                            onClick={() => {
                                setShowTextModal((prevState) => !prevState);
                            }}
                            title="Show description modal"
                        ></ButtonWithIcon>
                    </ExtraButtons>
                    <BottomForm action="">
                        <fieldset className="chip-group">
                            <Input
                                type="checkbox"
                                name="autostart"
                                id={`${props.id}autostart`}
                                value="autostart"
                                checked={props.autostart}
                                setStateFunction={updateTimerData}
                                icon="play_arrow"
                                hasLabel={true}
                                inputStyle="chip"
                                style={{
                                    color: "white",
                                    borderColor: "white"
                                }}
                                tooltip="should this timer start automatically"
                            ></Input>
                            <Input
                                type="number"
                                name="repeatNumber"
                                id={`${props.id}repeatNumber`}
                                value={parseInt(props.repeatNumber) || 0}
                                setStateFunction={updateTimerData}
                                hasLabel={true}
                                label="No. of Sets"
                                tooltip="How many times will this stretch or exercise repeat?"
                                inputStyle="numberSpinner"
                                style={{
                                    color: "white",
                                }}
                            ></Input>
                            <Input
                                type="checkbox"
                                name="isBreak"
                                id={`${props.id}isBreak`}
                                value="isBreak"
                                checked={props.isBreak}
                                setStateFunction={updateTimerData}
                                icon="schedule"
                                hasLabel={true}
                                inputStyle="chip"
                                tooltip="Is this timer a break timer, meant for resting in between exercises?"
                                style={{
                                    color: "white",
                                    borderColor: "white"
                                }}
                            ></Input>
                            {/* <Input
                                disabled={!props.isBreak}
                                type="checkbox"
                                name="isAutoBreak"
                                id={`${props.id}isAutoBreak`}
                                value="isAutoBreak"
                                checked={props.isAutoBreak}
                                setStateFunction={updateTimerData}
                                icon="schedule"
                                hasLabel={true}
                                inputStyle="chip"
                                tooltip="Is this timer an automatic break timer"
                                style={{
                                    color: "white",
                                    borderColor: "white"
                                }}
                            ></Input> */}
                        
                        </fieldset>
                    </BottomForm>
                </BottomDrawer>
            </div>
        </BackgroundWrapper>
    );
}
