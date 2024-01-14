import { nanoid } from "nanoid";

import hourglassPrimary from "../images/hourglass_fill_0.png"
import hourglassSecondary from "../images/hourglass_fill_3.png"
import React, { useRef, useState, useEffect, forwardRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { urls } from "../helpers/requests";
import { TooltipWrapper } from "../portal-components/TooltipPopover";
import FloatingToolbar from "./FloatingToolbar";
import { StyledToolbar } from "./FloatingToolbar";
import cannotLoad from "../images/cannot_load.jpg"
import Portal from "./Portal";
import textFormatter from "../helpers/formatText";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ExercisePopupCard from "./ExercisePopupCard";
const { urlBase, urlBaseNoApi } = urls;

/* #region Styled Components  */
const grow = keyframes`
	from{
		transform: scale(1,1)
	}
	to{
		transform: scale(1.15, 1.15)
	}

`;
const StyledTooltip = styled.span`
    position: absolute;
    z-index: 1000;
    bottom: 145%;
    left: 50%;
    transform: translateX(-50%);

    opacity: 0%;
    transition: opacity 100ms ease-in;
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 0.2rem 0.25rem;
    border-radius: 4px;
    width: fit-content;
    white-space: nowrap;
    pointer-events: none;
`;
export const NewTimerButton = styled.button`
    display: flex;
    transform: scale(0);
    transform: ${props => props.isLast && props.right ? `scale(1)` : `scale(0)`};
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 2px solid white;
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 5px;
    ${(props) =>
        props.left &&
        css`
            margin-right: 0.45rem;
        `}
    ${({ left }) =>
        !left &&
        css`
            margin-left: 0.45rem;
        `}

    opacity: 0%;
    transition: opacity 100ms ease-in;
    &:hover {
        border-color: var(--clr-primary-orange);
        color: var(--clr-primary-orange);
        /* border-color: pink; */
        /* color: pink; */
        & + ${StyledTooltip} {
            opacity: 100%;
        }
    }
`;
const StyledHoverable = styled.div`
    align-items: center;
    .order-number{
        position: absolute;
        bottom: 0.15rem;
        left: 0.15rem;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        text-align: center;
        /* color: white; */
        display: grid;
        place-content: center;
        font-size: small;
        vertical-align: center;
        color: ${props => props.theme.color2}; 
        font-weight: bold;
        background-color: hsla(0, 0%, 100%, 0.435);
        z-index: 999;
    }
    img.thumbnail-img{
        object-position: center;
        object-fit: cover;
        max-width: 100%;
        max-height: 100%;
        z-index: 500;
        border-radius: inherit;
    }
    .thumbnail-text, .thumbnail-img{
        grid-row: 1/2;
        grid-column: 1/2;
    }
    & + ${StyledTooltip} {
        /* opacity: 100%; */
    }
`;
const ButtonWithTooltipWrapper = styled.div`
    position: relative;
    opacity: 100%;
    /* pointer-events: ${props => props.sortMode ? "none" : "auto"};; */

    &:hover {
        ${NewTimerButton} {
            border-color: var(--clr-primary-pink);
            color: var(--clr-primary-pink);
        }
    }
`;
const ThumbnailContainer = styled.li`
    /* transform: ${props => props.isSelected ? "scale(1.15)" : "scale(1)"}; */
    outline: ${props => props.viewed ? `2px solid hsla(0, 0%, 100%, 0.853)` : "unset"};
    overflow: ${(props) => (props.hover ? "visible" : "hidden")} !important;
    position: relative;
    list-style-type: none;
    border-radius: 12px;
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
    ${props => props.viewed && css`
    &::after{
        content: "▲";
        pointer-events: none;
        /* font-size: xx-large; */
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
        display: inline-flex;
        align-items: end;
        color: white;
        filter: drop-shadow(0px 10px 2px hsla(0, 0%, 0%, 0.4));
    }`};

    .tooltip-card-title{
        font-weight: bold;
        padding: 0.5em;
    }
    .time-wrapper {
        border-radius: 12px;
        width: 4rem;
        height: 4rem;
        transform: scale(1, 1);
        background-color: ${(props) => (props.viewed ? "pink" : "rgba(255, 255, 255, 1)")};

        .thumbnail-text{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .abbreviation{
                font-weight: bold;
            }
            *:last-child{
                font-size: 0.95rem;
            }
        }
    }

    ${ButtonWithTooltipWrapper} {
        pointer-events: ${(props) => (props.hover ? "auto" : "none")};
    }
    ${(props) =>
        props.viewed ?
            css`
            .time-wrapper {
                background-color: white;
                color: var(--clr-primary-pink);
            }
        ` : css`
            .time-wrapper{
                color: var(--clr-clr1);
                /* color: hsl(270.2, 87.1%, 33.5%);// var(--clr-primary-pink-darker); */
            }
        `};
    /* ${(props) =>
        props.isSelected &&
        css`
            animation: ${grow} 2s linear alternate infinite;
        `}; */
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    /* justify-content: center; */
    cursor: pointer;
    box-shadow: 0px 3px 8px 2px rgba(0, 0, 0, 0.15);
    transition: background-color linear 100ms;
    z-index: 200;
    &:hover {
        background-color: rgba(255, 255, 255, 0.95);
        .time-wrapper {
            color: var(--clr-primary-pink);
        }
        font-weight: 400;
    }
    .hud {
        position: absolute;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        opacity: ${props => props.isSelected ? `100%` : `80%`};
        /* grid-template-columns: ${props => !props.isLast ? `1fr 4rem 1fr` : `1fr 4rem` }; */
        grid-template-columns: minmax(40px, 1fr) 4rem minmax(40px,1fr);
        /* grid-template-columns: 1fr 4rem 1fr; */
        align-items: center;
        .time-wrapper {
            grid-column: 2/3;
            /* grid-column: ${props => !props.isLast ? `2/3` : ``};; */
            display: grid;
            place-content: center;
        }
        > ${ButtonWithTooltipWrapper} {
            &:first-of-type {
                grid-column: 1/2;
            }
            &:last-of-type {
                grid-column: 3/4;
            }
        }

        &:hover {
            
            > ${ButtonWithTooltipWrapper} {
                /* pointer-events: ${props => props.sortMode ? "none" : "auto"}; */
                transform: scale(1);
                /* opacity: 100%; */
            }
            ${NewTimerButton} {
                transform: scale(1);
                opacity: 100%;
            }
            ${StyledToolbar} {
                opacity: 100%;
            }
        }
    }
`;
ThumbnailContainer.displayName = "ThumbnailContainer";

/* #endregion */
const TimelineThumbnail = forwardRef(
    (
        {
            children,
            viewed,
            handleClick,
            addNewTimer,
            index,
            dataKey,
            dataId,
            isSelected,
            actions,
            navigate,
            timer,
            disabled,
            theme,
            onTimerSelected,
            isLast,
            hideNumber=false
        },
        ref
    ) => {
        const { time, repeatNumber, isRep, description, label, slideImagePath } = timer
        const sortMode = !disabled
        const [coords, setCoords] = useState();
        const [hover, setHover] = useState(false);
        const [isOn, setIsOn] = useState();
        const placeholder = timer.isBreak ? hourglassSecondary : hourglassPrimary

        function callAddNewTimer(index, beforeOrAfter, event) {
            const shouldDuplicate = event.ctrlKey
            addNewTimer(index, beforeOrAfter, shouldDuplicate)
        }
        return (
            <ThumbnailContainer
                ref={ref}
                hover={hover}
                onMouseEnter={() => !sortMode && setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="thumbnailContainer"
                data-key={dataKey}
                data-id={dataId}
                title={label}
                isSelected={isSelected}
                repeatNumber={repeatNumber}
                data-test-id={"timeline-thumbnail"}
                viewed={viewed}
                sortmode={sortMode}
                img={slideImagePath ? `${urlBaseNoApi}${slideImagePath}` : placeholder}
                isLast={isLast}
                theme={theme}
            >
                {children}
                <section className="hud" sortmode={sortMode}>
                    <ButtonWithTooltipWrapper left={true}>
                        <NewTimerButton
                            title={label}
                            sortmode={sortMode}
                            left={true}
                            onClick={(event) => callAddNewTimer(index, -1, event)}
                            className="material-icons"
                        >
                            add
                        </NewTimerButton>
                        {/* <StyledTooltip>
                            Add Timer Before <br></br>
                            {/* (Hold <code>Ctrl</code> to duplicate) */}
                        {/* </StyledTooltip> */} 
                    </ButtonWithTooltipWrapper>

                    <TooltipWrapper toggleAction="hover">
                        <StyledHoverable
                            className="time-wrapper"
                            title={label}
                            onClick={(event) => {
                                onTimerSelected(dataKey, event)
                                navigate(dataKey)
                            }
                            }
                            theme={theme}
                        >
                            {!hideNumber && <span className="order-number">{index + 1}</span>}
                            <img className="thumbnail-img" src={slideImagePath ? `${urlBaseNoApi}${slideImagePath}`: placeholder}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = cannotLoad;
                                }}

                            />
                            {description && <StyledTooltip>{description}</StyledTooltip>}
                            <div className="thumbnail-text">
                                <span className="abbreviation">{textFormatter.firstLetterOfEachWord(timer.label)}</span>
                                {!isRep ? <span>
                                    {String(time.minutes).padStart(2, "0")}:{String(time.seconds).padStart(2, "0")}
                                </span> : <span>{`x${repeatNumber}`}</span>}
                            </div>
                        </StyledHoverable>
                        <ExercisePopupCard data={{
                            src: `${slideImagePath ? urlBaseNoApi + slideImagePath : ""}`,
                            label: timer.label,
                            actions: actions,
                            dataKey: dataKey,
                            timerId: dataKey,
                            timer: timer,
                            coords: coords,
                            cannotLoad: cannotLoad
                        }} />
                    </TooltipWrapper>
                    { !isLast &&
                    <ButtonWithTooltipWrapper left={false}>
                        <NewTimerButton
                            sortmode={sortMode}
                            left={false}
                            title={label}
                            onClick={(event) => callAddNewTimer(index, 1, event)}
                            className="material-icons"
                        >
                            add
                        </NewTimerButton>
                        {/* <StyledTooltip> */}
                            {/* Add Timer After  */}
                            {/* (Hold <code>Ctrl</code> to duplicate) */}
                        {/* </StyledTooltip> */}
                    </ButtonWithTooltipWrapper>
                }
                </section>
            </ThumbnailContainer>
        );
    }
);

export default TimelineThumbnail;
