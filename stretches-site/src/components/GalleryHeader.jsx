import React from "react";
import styled, { css } from "styled-components";
import { device } from "./styled-components/devices";
import { Container } from "./styled-components/layout.styled";
import Input from "./input/Input";
import * as Buttons from "./styled-components/Buttons.Styled";
import { ButtonWithIcon } from "./styled-components/Buttons.Styled";
import Select from "./input/Select";
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    > * {
        flex: 0 1;
    }
    width: 25%;
    margin-left: auto;
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
    > ${Container} {
        background-color: white;
        position: absolute;
        z-index: 900;
        width: 100%;
        display: flex;
        flex-direction: column;
        transition: all 200ms ease-out;
        ${(props) =>
            props.expanded &&
            css`
                top: 0%;
            `};
        ${(props) =>
            !props.expanded &&
            css`
                top: -40vh;
                /* top: -30%; */
            `}
        button {
            z-index: 1000;
        }

        padding: clamp(1rem, 1rem + 1vh, 2rem);
        /* margin-bottom: 2rem; */
        background-color: white;
        box-shadow: 0px 3px 8px 5px rgba(0, 0, 0, 0.05);

        // the inner grid container for the content
        > ${Container} {
            display: grid;
            justify-content: stretch;
            align-items: stretch;
            align-content: stretch;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;

            div:first-child {
                grid-row: 1/2;
                grid-column: 1/2;
            }
            div:nth-child(2) {
                grid-row: 2/3;
                grid-column: 1/2;
            }

            @media ${device.tablet} {
                display: flex;
                justify-content: space-between;
            }

            > ${ButtonWrapper} {
                grid-column: 2/3;
                grid-row: 1/3;
                gap: 1rem;
                width: fit-content;
                display: flex;
                flex-direction: column;
                @media ${device.tablet} {
                    flex-direction: row;
                }
                * {
                    background-color: ${(props) => props.theme.color2};
                    color: white;
                    border: none;
                    font-weight: bold !important;
                    /* border-color: ${(props) => props.theme.color2}; */
                    transition: background-color 0.25s linear;
                }
            }
            > .input-label-overlay {
                margin-left: 4rem;
            }
            input[type="text"],
            input[type="number"] {
                min-width: fit-content;
                border-color: ${(props) => props.theme.color2} !important;

                transition: background-color 0.25s linear;
            }
            label {
                color: ${(props) => props.theme.color2};

                transition: color 0.25s linear;
            }
            gap: clamp(0.25rem, 0.25rem + 1vh, 0.5rem);
        }
    }

    //if our height is over 600 px, show full
    @media (min-height: 600px) {
        .expand {
            display: none;
        }
        > ${Container} {
            position: relative;
            top: unset;
        }
    }
`;
StyledGalleryHeader.displayName = "GalleryHeader";
// #endregion
export default function GalleryHeader(props) {
    const { formData, updateFormData, handleClick, expanded, setExpanded } = props;

    const buttonData = {
        startTimer: {
            icon: "play_circle",
            action: "start-timer",
        },
        addSpotifyLink: {
            icon: "music_note",
            action: "add-spotify-link",
        },
        addYoutubeLink: {
            icon: "youtube_activity",
            action: "add-youtube-link",
        },
    };

    const buttonElements = {};

    for (let key in buttonData) {
        const data = buttonData[key];
        buttonElements[key] = (
            <ButtonWithIcon
                type="circle"
                onClick={handleClick}
                data-action={data.action}
                icon={data.icon}
            ></ButtonWithIcon>
        );
    }

    /**
     * Add automatic breaks
     */
    function autoAddBreaks() {
        //add automatic breaks
    }

    return (
        <StyledGalleryHeader expanded={expanded}>
            <Container full={true} fullVertical={true}>
                <Container>
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
                    />
                    <Input
                        type="number"
                        name="repeatNumber"
                        id="repeatNumber"
                        label="Repeat Number"
                        setStateFunction={updateFormData}
                        value={formData ? formData.repeatNumber : 0}
                        hasLabel={true}
                        inputStyle="floatingLabel"
                    ></Input>

                    <ButtonWrapper className="button-wrapper">
                        {buttonElements.startTimer}
                        {buttonElements.addSpotifyLink}
                        {buttonElements.addYoutubeLink}
                    </ButtonWrapper>
                </Container>
                <Buttons.IconButton
                    className="expand"
                    onClick={() => {
                        setExpanded((prevState) => !prevState);
                    }}
                >
                    <span className="material-symbols-outlined">{expanded ? "expand_less" : "expand_more"}</span>
                </Buttons.IconButton>
            </Container>
            <Buttons.IconButton
                className="expand"
                onClick={() => {
                    setExpanded();
                }}
            >
                <span className="material-symbols-outlined">{expanded ? "expand_less" : "expand_more"} </span>
            </Buttons.IconButton>
        </StyledGalleryHeader>
    );
}
