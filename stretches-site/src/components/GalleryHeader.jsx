import React from "react";
import { themes } from '../App';
import styled, { css } from "styled-components";
import { device } from "./styled-components/devices";
import { Container } from "./styled-components/layout.styled";
import Input, { StyledInputWrapper } from "./input/Input";
import * as Buttons from "./styled-components/Buttons.Styled";
import { ButtonWithIcon } from "./styled-components/Buttons.Styled";
import Select from "./input/Select";
import AutoBreakConfig from "./AutoBreakConfig";
// import { StyledInputWrapper } from "./input/Input";
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
    .inner-wrapper{
        display:flex;
        justify-content: center;
    }
    > * {
        flex: 0 1;
    }
    /* width: 25%; */
    /* margin-left: auto; */
`;
ButtonWrapper.displayName = "ButtonWrapper";
/* ---------------------------- Styled Components --------------------------- */
// #region Styled Components
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
const StyledGalleryHeader = styled.div`
    background-color: white;
    /* height: fit-content; */
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1 0 1;
    //the outer container that will expand and contract when button is clicked
    .header-bottom{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 10px calc(-480px + 50vw);
            max-height: 100%;
            input[type="checkbox"] + label{
                background-color: ${({ theme }) => theme.color2};;
                color: white;
            }
        .inner-wrapper{
            display: flex;
            justify-content: space-evenly;
        }
    }
    /* //if our height is over 600 px, show full */
    @media (min-height: 600px) and  (min-width: 600px) {
        /* .expand {
            display: none;
        } */
    
        
    }
`;
StyledGalleryHeader.displayName = "GalleryHeader";
// #endregion
export default function GalleryHeader(props) {
    const { formData, updateFormData, handleClick, expanded, setExpanded, actions, uiToggles, setUiToggles } = props;


    const buttonData = {
        startTimer: {
            icon: "play_circle",
            action: "start-timer",
            tooltip: "Start the Routine"
        },
        addBreaks: {
            icon: "more_time",
            action: "auto-breaks",
            tooltip: "Automatically insert a break between each Timer in this Routine"
        },
        addSpotifyLink: {
            icon: "music_note",
            action: "add-spotify-link",
            tooltip: "Add a link to a Spotify playlist"
        },
        addYoutubeLink: {
            icon: "youtube_activity",
            action: "add-youtube-link",
            tooltip: "Add a link to a YouTube video or playlist"
        },
    };

    const buttonElements = actions.map((action) => <ButtonWithIcon
        type="circle"
        key={action.name}
        onClick={action.functionRef}
        // data-action={data.action}
        icon={action.icon}
        title={action.description ? action.description : action.name}
        toggle={action.toggle}

    ></ButtonWithIcon>)

    /* for (let key in buttonData) {
        const data = buttonData[key];
        buttonElements[key] = (
            <ButtonWithIcon
                type="circle"
                onClick={handleClick}
                data-action={data.action}
                icon={data.icon}
                title={data.tooltip}
            ></ButtonWithIcon>
        );
    } */

  

    const expandButton = (<Buttons.IconButton
                    className="expand"
                    onClick={() => {
                        setExpanded();
                    }}
                >
                    <span className="material-symbols-outlined">{expanded ? "expand_less" : "expand_more"} </span>
                </Buttons.IconButton>


    )

    return (
        <StyledGalleryHeader expanded={expanded} theme={themes.primary}>
            <Container className="header-bottom">
                <Input
                    className="quarter-width"
                    type="text"
                    name="label"
                    id="label"
                    label="Routine Name"
                    value={formData && formData.label ? formData.label : "New Timer Set"}
                    setStateFunction={updateFormData}
                    hasLabel={true}
                    inputStyle="floatingLabel"
                    style={{
                        borderColor: themes.primary.color1
                    }}
                />

                <div class="inner-wrapper">{buttonElements}</div>
                <div className="inner-wrapper">
                    <Input
                    type="checkbox"
                    name="showAutoBreak"
                    id="showAutoBreak"
                    label="Show Auto Break"
                    icon="more_time"
                    value={uiToggles.showAutoBreak}
                    setStateFunction={setUiToggles}
                    hasLabel={true}
                    inputStyle="chip"
                    style={{
                        borderColor: "black"
                    }}
                />
                <Input
                    type="checkbox"
                    name="sortMode"
                    id="sortMode"
                    label="Sort Mode"
                    icon={"reorder"}
                    value={uiToggles.sortMode}
                    setStateFunction={setUiToggles}
                    hasLabel={true}
                    inputStyle="chip"
                    style={{
                        borderColor: "black"
                    }}
                />

                </div>
                {/* <div class="inner-wrapper">{expandButton}</div> */}
            </Container>
        </StyledGalleryHeader>
    );
}
