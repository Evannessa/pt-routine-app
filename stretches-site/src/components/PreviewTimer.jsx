import React from "react";
import TimeValue from "./TimeValue";
import DropArea from "./DropArea";
import { useParams } from "react-router-dom";
import { BackgroundWrapper } from "./styled-components/BackgroundWrapper.styled";
import styled from "styled-components";
import { Container } from "./styled-components/layout.styled";
import { IconButton, CircleIconButton, ButtonWithIcon } from "./styled-components/Buttons.Styled";
import Input from "./input/Input";
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
    background-color: white;
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
    background-color: white;
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
        display: flex;
        height: 100%;

        h3 {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.25rem;
            color: white;
            ${IconButton} {
                vertical-align: middle;
                max-width: 2rem;
            }
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
    background-color: white;
    width: 100%;
    z-index: -4;
    height: 30%;
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
    input {
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
                        ></UploadModal>
                    )}
                    <StyledWrapper showModal={showDropModal}>
                        {showDropModal && (
                            <IconButton
                                color="slategray"
                                onClick={() => {
                                    setShowDropModal(false);
                                }}
                            >
                                close
                            </IconButton>
                        )}
                        <h3>
                            Drop an Image{" "}
                            <ButtonWithIcon
                                icon="gallery_thumbnail"
                                onClick={() => {
                                    setShowGalleryModal(!showGalleryModal);
                                }}
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
                            <IconButton
                                color="slategray"
                                style={{ alignSelf: "flex-end" }}
                                onClick={() => {
                                    setShowTextModal(false);
                                }}
                            >
                                close
                            </IconButton>
                        )}
                        <h3>Enter Description</h3>
                        <Input
                            type="text"
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
                            bgColor="cornflowerblue"
                            icon="image"
                            onClick={() => {
                                setShowDropModal((prevState) => !prevState);
                            }}
                        ></ButtonWithIcon>

                        <ButtonWithIcon
                            color="white"
                            type="circle"
                            bgColor="cornflowerblue"
                            icon="edit_note"
                            onClick={() => {
                                setShowTextModal((prevState) => !prevState);
                            }}
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
                            ></Input>
                            <Input
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
                            ></Input>
                            <Input
                                type="number"
                                name="repeatNumber"
                                id={`${props.id}repeatNumber`}
                                value={parseInt(props.repeatNumber) || 0}
                                setStateFunction={updateTimerData}
                                hasLabel={true}
                                inputStyle="floatingLabel"
                                style={{
                                    borderColor: "cornflowerblue",
                                    color: "cornflowerblue",
                                }}
                            ></Input>
                        </fieldset>
                    </BottomForm>
                </BottomDrawer>
            </div>
        </BackgroundWrapper>
    );
}
