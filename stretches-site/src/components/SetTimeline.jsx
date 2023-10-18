import React, { createRef } from "react";
import TimelineThumbnail from "./TimelineThumbnail";
import styled from "styled-components";
// import { AnimateBubbles } from "./AnimateBubbles";
import ActionFactory from "../classes/ActionFactory";
import {DndContext} from '@dnd-kit/core';
// import {Draggable} from './Draggable'
// import {Dropable} from './Droppable'


/* #region  Styled components */

const TimelineWrapper = styled.ul`
    z-index: 200;
    display: flex;
    gap: 3rem;
    align-items: center;
    justify-content: center;
    overflow-x: scroll;
    overflow-y: hidden;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 1.5% 2%;
    /* padding: 1rem; */
    /* padding-bottom: 2rem; */
    backdrop-filter: blur(12px);
    /* border-top: 5px double white; */
    border-bottom: 5px double white;
    /* box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.25); */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
/* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    /* box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; */


    /* overflow-x: auto; */
    /* overflow-y: visible !important; */
    overscroll-behavior-inline: contain;
    scroll-snap-type: inline mandatory;
    scrollbar-width: thin;
    --clr-clr1: ${(props) => props.theme.color1};
    --clr-clr2: ${(props) => props.theme.color2};
    --clr-gradient: linear-gradient(45deg, var(--clr-clr1), var(--clr-clr2));
    &::-webkit-scrollbar-thumb {
        background: var(--clr-gradient);
    }
    /* padding-top: 3rem; */
`;
TimelineWrapper.displayName = "TimelineWrapper";
const DragListItem = styled.li`
    list-style-type: none;
`;
const Tooltip = styled.span`
    position: absolute;
    z-index: 10;
    bottom: 100%;
    opacity: 0%;
    transition: opacity 100ms ease-in;
    background-color: #212121;
    color: white;
`;
/* #endregion */

function SetTimeline({ timers,
    timerInView,
    addNewTimer, 
    setParentTimers, 
    navigateToParentTimer, 
    deleteParentTimer, 
    duplicateParentTimer }) 
    {
    const timerThumbnailRefs = React.useRef([]);
    const [dragging, setDragging] = React.useState(false);
    const [dragIndex, setDragIndex] = React.useState(0);
    const mousePosition = React.useRef({ x: null, y: null });
    const [selectedTimers, setSelectedTimers] = React.useState([]);

    function onTimerSelected(timerElement) {
        //push returns the array's length
        let newArray = [...selectedTimers];
        let timer = timers.find((timer) => timer._id === timerElement.dataset.key);
        if (!newArray.includes(timer)) {
            newArray.push(timer);
            setSelectedTimers(newArray);
        }
        // timerElement.style.backgroundColor = "pink";
    }
    function onTimerDeselected(timerElement) {
        let newArray = [...selectedTimers];
        let index = timers.indexOf(timerElement.index);
        newArray.splice(index, 1);
        setSelectedTimers(newArray);
        // timerElement.style.backgroundColor = "white";
    }

    //swap the position of two timers
    function swap(timer1, timer2) {
        let swapTimers = [...timers];

        let index1 = timers.indexOf(timer1);
        let index2 = timers.indexOf(timer2);
        swapTimers.splice(index1, 1, timer2);
        swapTimers.splice(index2, 1, timer1);
        //swap

        setSelectedTimers([]); //reset the selected timers

        setParentTimers(swapTimers); //set the timers in the parent
    }
    function handleMouseMove(e) {
        mousePosition.current = { x: e.clientX, y: e.clientY };
    }

    //swap the timers when 2 are selected
    React.useEffect(() => {
        if (selectedTimers.length >= 2) {
            swap(selectedTimers[0], selectedTimers[1]);
        }
    }, [selectedTimers]);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    function handleDragStart(index) {
        setDragIndex(index);
        setDragging(true);
    }
    function handleDragEnter(e, index) {
        // preventDefaults(e);
        // e.stopPropagation();
        e.target.style.backgroundColor = "black";
        e.target.style.color = "white";
        const newTimerList = [...timers];
        const timer = timers[dragIndex]; //get the timer at the index of the current dragged item
        newTimerList.splice(dragIndex, 1); //delete item at our drag item's index
        newTimerList.splice(index, 0, timer); //add new item at the entered index, delete none
        setDragIndex(index);
        setParentTimers(newTimerList);
    }
    function handleDragOver(e) {
        preventDefaults(e);
        e.stopPropagation();
    }

    function handleDragLeave(e) {
        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    }
    function handleDrop(e) {
        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        setDragging(false);
    }

    /**position items for drag and drop
     *
     */
    function positionItems() {
        let indexCounter = 0;
        timerThumbnailRefs.forEach((item) => {
            item.style.left = 50 * indexCounter + indexCounter * 10 + "px";
            item.setAttribute("order", indexCounter + 1);
            indexCounter++;
        });
    }

    /** click of the thumbnail */
    function handleClick(e) {
        onTimerSelected(e.currentTarget);
    }

    //map the timers to the thumbnail components
    let thumbnailComponents = timers
        ? timers.map((timer, index) => (
            //NOTE: placing things like "draggable" on React Components vs Divs doesn't work
            <TimelineThumbnail
                //   className="dragDiv"
                key={timer._id}
                index={index}
                id={timer._id && timer._id.slice(-2)}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => e.preventDefault()}
                handleClick={handleClick}
                ref={createRef()}
                timer={timer}
                {...timer}
                addNewTimer={addNewTimer}
                onTimerSelected={onTimerSelected}
                onTimerDeselected={onTimerDeselected}
                navigate={navigateToParentTimer}
                dataKey={timer._id}
                dataId={timer._id && timer._id.slice(-2)}
                isRep={timer.isRep}
                repeatNumber={timer.repeatNumber}
                actions={[
                    ActionFactory("navigate", "double_arrow", navigateToParentTimer),
                    ActionFactory("duplicate", "content_copy", duplicateParentTimer),
                    ActionFactory("delete", "delete_forever", deleteParentTimer),
                ]}
                isSelected={selectedTimers.find((st) => st._id === timer._id)}
                viewed={timerInView === timer._id}
            />
        ))
        : [];

    //!This code is temporarily removed until basic functionality is working properly
    {
        /* <AnimateBubbles>{thumbnailComponents}</AnimateBubbles> */
    }
    return (
        <TimelineWrapper onMouseMove={handleMouseMove}>
            {thumbnailComponents.length > 0 && thumbnailComponents}
        </TimelineWrapper>
    );
}

export default SetTimeline;
