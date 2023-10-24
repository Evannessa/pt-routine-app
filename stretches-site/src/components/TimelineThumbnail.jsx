import { nanoid } from "nanoid";
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
    z-index: 100;
    bottom: 100%;
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
const NewTimerButton = styled.button`
    display: flex;
    transform: scale(0);
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
    & + ${StyledTooltip} {
        opacity: 100%;
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
const ThumbnailContainer = styled.div`
    overflow: ${(props) => (props.hover ? "visible" : "hidden")} !important;
    position: relative;

    border-radius: 12px;
    width: 4rem;
    height: 4rem;
    min-width: 4rem;

    .tooltip-card-title{
        font-weight: bold;
        padding: 0.5em;
    }
    /* .drag-handle{
        opacity: 0%;
        pointer-events: none;
    }
    &:hover{
        .drag-handle{
            opacity:100%;
            pointer-events: auto;
        }
    } */
    .time-wrapper {
        border-radius: 12px;
        width: 4rem;
        height: 4rem;
        transform: scale(1, 1);
        background-color: ${(props) => (props.isSelected ? "pink" : "rgba(255, 255, 255, 0.75)")};
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
    ${(props) =>
        props.isSelected &&
        css`
            animation: ${grow} 2s linear alternate infinite;
        `};
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
        grid-template-columns: 1fr 4rem 1fr;
        align-items: center;
        .time-wrapper {
            grid-column: 2/3;
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
            disabled
        },
        ref
    ) => {
        const { time, repeatNumber, isRep, description, slideImagePath } = timer
        const sortMode = !disabled
        const [coords, setCoords] = useState();
        const [hover, setHover] = useState(false);
        const [isOn, setIsOn] = useState();

        function callAddNewTimer(index, beforeOrAfter, event) {
            const shouldDuplicate = event.ctrlKey
            addNewTimer(index, beforeOrAfter, shouldDuplicate)
        }
        return (
            <ThumbnailContainer
                ref={ref}
                hover={hover}
                onMouseEnter={() => !sortMode  && setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="thumbnailContainer"
                data-key={dataKey}
                data-id={dataId}
                title={description}
                isSelected={isSelected}
                repeatNumber={repeatNumber}
                data-test-id={"timeline-thumbnail"}
                viewed={viewed}
                sortmode={sortMode}
            >
                {children}
                <section className="hud" sortmode={sortMode}>
                    <ButtonWithTooltipWrapper left={true}>
                        <NewTimerButton
                            title={description}
                            sortmode={sortMode}
                            left={true}
                            onClick={(event) => callAddNewTimer(index, -1, event)}
                            className="material-icons"
                        >
                            add
                        </NewTimerButton>
                        <StyledTooltip>
                            Add Timer Before (Hold <code>Ctrl</code> to duplicate) 
                        </StyledTooltip>
                    </ButtonWithTooltipWrapper>

                    <TooltipWrapper toggleAction="hover">
                        <StyledHoverable 
                            className="time-wrapper" 
                            title={description} 
                            onClick={() => navigate(dataKey)}
                        >
                            {description && <StyledTooltip>{description}</StyledTooltip>}
                            <div className="thumbnail-text">
                                <span className="abbreviation">{textFormatter.firstLetterOfEachWord(timer.label)}</span>
                                {!isRep ? <span>
                                    {String(time.minutes).padStart(2, "0")}:{String(time.seconds).padStart(2, "0")}
                                </span> : <span>{`x${repeatNumber}`}</span>}
                            </div>
                        </StyledHoverable>
                        <ExercisePopupCard data={{
                            src: `${urlBaseNoApi}${slideImagePath}`,
                            label: timer.label,
                            actions: actions,
                            timerId: dataKey,
                            timer: timer,
                            coords: coords,
                            cannotLoad: cannotLoad
                        }}/>
                    </TooltipWrapper>

                    <ButtonWithTooltipWrapper left={false}>
                        <NewTimerButton
                            sortmode={sortMode}
                            left={false}
                            title={description}
                            onClick={(event) => callAddNewTimer(index, 1, event)}
                            className="material-icons"
                        >
                            add
                        </NewTimerButton>
                        <StyledTooltip>
                            Add Timer After (Hold <code>Ctrl</code> to duplicate) 
                        </StyledTooltip>
                    </ButtonWithTooltipWrapper>
                </section>
            </ThumbnailContainer>
        );
    }
);

export default TimelineThumbnail;
