import { nanoid } from "nanoid";
import React, { useRef, useState, useEffect, forwardRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { urls } from "../helpers/requests";
import { TooltipWrapper } from "../portal-components/TooltipPopover";
import FloatingToolbar from "./FloatingToolbar";
import { StyledToolbar } from "./FloatingToolbar";
import cannotLoad from "../images/cannot_load.jpg"
import Portal from "./Portal";
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
const Tooltip = styled.span`
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
        & + ${Tooltip} {
            opacity: 100%;
        }
    }
`;
const Hoverable = styled.div`
    & + ${Tooltip} {
        opacity: 100%;
    }
`;
const ButtonWithTooltipWrapper = styled.div`
    position: relative;
    opacity: 100%;

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

    .dragStart{

    }
    .time-wrapper {
        border-radius: 12px;
        width: 4rem;
        height: 4rem;
        transform: scale(1, 1);
        background-color: ${(props) => (props.isSelected ? "pink" : "rgba(255, 255, 255, 0.5)")};
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
                pointer-events: auto;
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
            viewed,
            handleClick,
            addNewTimer,
            index,
            description,
            time,
            dataKey,
            dataId,
            isSelected,
            actions,
            navigate,
            slideImagePath,
        },
        ref
    ) => {
        const [coords, setCoords] = useState();
        const [hover, setHover] = useState(false);
        const [isOn, setIsOn] = useState();
        const newRef = useRef();

        const itemRef = useRef(null)

        const onDragStart = (e) =>{
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.setDragImage(e.target, 50000, 50000)

            let ghostNode = e.target.cloneNode(true)

            ghostNode.style.position = "absolute"

            //set to mouse position
            ghostNode.style.top = (e.pageY - e.target.offsetHeight / 2) + 'px'
            ghostNode.style.left = (e.pageX - e.target.offsetWidth / 2) + 'px'

            ghostNode.style.height = e.target.offsetHeight  + 'px'
            ghostNode.style.width = e.target.offsetWidth  + 'px'

            ghostNode.style.opacity = '0.8'
            ghostNode.style.pointerEvents = 'none'

            ghostNode.id = 'ghostNode'
            document.body.prepend(ghostNode)

            // identify selected item

            ref.current.classList.add('dragStart')


        }

        // even t when dragging
        const onDrag = (e) => {
            let ghostNode = document.querySelector("#ghostNode")
            ghostNode.style.top = `${(e.pageY - e.target.offsetY/2)}px`            
            ghostNode.style.left = `${e.pageX - e.target.offsetX/2}px`

        }

        const onDragEnd = (e)=>{
            document.querySelector("#ghostNode").remove()
            ref.current.classList.remove('dragStart')

        }

        const onDragEnter = () => ref.current.classList.add('dragOver')
        const onDragLeave = () => ref.current.classList.remove('dragOver')

        const onDragOver = (e) => e.preventDefault()

        const onDrop = () => {
            ref.current.classList.remove('dragOver')
        }

        return (
            <ThumbnailContainer
                ref={ref}
                hover={hover}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="thumbnailContainer"
                data-key={dataKey}
                data-id={dataId}
                title={description}
                isSelected={isSelected}
                data-test-id={"timeline-thumbnail"}
                viewed={viewed}
                draggable="true"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDrag={onDrag}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <section className="hud">
                    <ButtonWithTooltipWrapper left={true}>
                        <NewTimerButton
                            title={description}
                            left={true}
                            onClick={() => addNewTimer(index, -1)}
                            className="material-icons"
                        >
                            add
                        </NewTimerButton>
                        <Tooltip>Add Timer Before</Tooltip>
                    </ButtonWithTooltipWrapper>

                    <TooltipWrapper toggleAction="hover">
                        <Hoverable className="time-wrapper" title={description} onClick={() => navigate(dataKey)}>
                            {description && <Tooltip>{description}</Tooltip>}
                            <span>
                                {String(time.minutes).padStart(2, "0")}:{String(time.seconds).padStart(2, "0")}
                            </span>
                        </Hoverable>
                        <section>
                            {/* <img src={urlBase + slideImagePath} alt="Exercise Slide" /> */}
                            <img src={`${urlBaseNoApi}${slideImagePath}`} alt="Exercise Slide" crossOrigin="true" onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src= cannotLoad;
                }}/>
                            <p>{description}</p>
                            <FloatingToolbar actions={actions} timerId={dataKey} coords={coords}></FloatingToolbar>
                        </section>
                    </TooltipWrapper>

                    <ButtonWithTooltipWrapper left={false}>
                        <NewTimerButton
                            left={false}
                            title={description}
                            onClick={() => addNewTimer(index, 1)}
                            className="material-icons"
                        >
                            add
                        </NewTimerButton>
                        <Tooltip>Add Timer After</Tooltip>
                    </ButtonWithTooltipWrapper>
                </section>
            </ThumbnailContainer>
        );
    }
);

export default TimelineThumbnail;
