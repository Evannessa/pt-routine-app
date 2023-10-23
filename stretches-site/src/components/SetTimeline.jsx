import React, { createRef, useState } from "react";
import TimelineThumbnail from "./TimelineThumbnail";
import styled from "styled-components";
// import { AnimateBubbles } from "./AnimateBubbles";
import ActionFactory from "../classes/ActionFactory";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy
} from '@dnd-kit/sortable'

import TimerHelpers from "../classes/TimerHelper";
import { SortableThumbnail } from "./SortableItem";
import { useEffect } from "react";
import helpers from "../classes/Helpers";
import DummyThumbnail from "./DummyThumbnail";



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
    duplicateParentTimer }) {
    const timerThumbnailRefs = React.useRef([]);
    const [dragging, setDragging] = React.useState(false);
    const [dragIndex, setDragIndex] = React.useState(0);
    const mousePosition = React.useRef({ x: null, y: null });
    const [selectedTimers, setSelectedTimers] = React.useState([]);
    const [activeId, setActiveId] = useState(null);
    const [items, setItems] = useState(getTimerIds());
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function getTimerIds() {
        return timers.map(timer => TimerHelpers.getSetId(timer))
    }
    function onTimerSelected(timerElement, event) {
        //push returns the array's length
        if (event.ctrlKey) {
            console.log("Ctrl key pressed")
        }
        debugger;
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
    useEffect(() => {
        if (timers.length > 0) {
            setItems(getTimerIds().sort())
        }
        // return () => {
        //     cleanup
        // };
    }, [timers]);
    //swap the timers when 2 are selected
    React.useEffect(() => {
        if (selectedTimers.length >= 2) {
            swap(selectedTimers[0], selectedTimers[1]);
        }
    }, [selectedTimers]);



    function handleDragStart(event) {
        const { active } = event;
        console.log("Starting to drag")

        setActiveId(active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }


    /** click of the thumbnail */
    function handleClick(e) {
        onTimerSelected(e, e.currentTarget);
    }

    //map the timers to the thumbnail components
    const thumbnailComponents = items && items.length > 0 ? items.map((item, index) => {
        const timer = helpers.getItemWithProperty(timers, "_id", item)
        return timer ? <SortableThumbnail
            key={timer._id}
            index={index}
            id={parseInt(index)}
            // ref={createRef()}
            timer={timer}
            {...timer}
            addNewTimer={addNewTimer}
            onTimerSelected={onTimerSelected}
            onTimerDeselected={onTimerDeselected}
            navigate={navigateToParentTimer}
            dataKey={timer._id}
            dataId={timer._id && timer._id.slice(-2)}
            actions={[
                ActionFactory("navigate", "double_arrow", navigateToParentTimer),
                // ActionFactory("duplicate", "content_copy", duplicateParentTimer),
                ActionFactory("delete", "delete_forever", deleteParentTimer),
            ]}
            isSelected={selectedTimers.find((st) => st._id === timer._id)}
            viewed={timerInView === timer._id}
        /> : <></>
    }) : []
    // let thumbnailComponents = timers
    //     ? timers.map((timer, index) => (
    //         <SortableThumbnail
    //             key={timer._id && timer._id.slice(-2)}
    //             index={index}
    //             id={timer._id && timer._id.slice(-2)}
    //             // ref={createRef()}
    //             timer={timer}
    //             {...timer}
    //             addNewTimer={addNewTimer}
    //             onTimerSelected={onTimerSelected}
    //             onTimerDeselected={onTimerDeselected}
    //             navigate={navigateToParentTimer}
    //             dataKey={timer._id}
    //             dataId={timer._id && timer._id.slice(-2)}
    //             actions={[
    //                 ActionFactory("navigate", "double_arrow", navigateToParentTimer),
    //                 // ActionFactory("duplicate", "content_copy", duplicateParentTimer),
    //                 ActionFactory("delete", "delete_forever", deleteParentTimer),
    //             ]}
    //             isSelected={selectedTimers.find((st) => st._id === timer._id)}
    //             viewed={timerInView === timer._id}
    //         />
    //     ))
    //     : [];



    return (
        <TimelineWrapper onMouseMove={handleMouseMove}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={horizontalListSortingStrategy}
                >
                    {thumbnailComponents}
                </SortableContext>
                <DragOverlay>
                    {activeId ? <TimelineThumbnail id={activeId} timer={timers[activeId]}/> : null}
                </DragOverlay>
            </DndContext>
        </TimelineWrapper>
    );
}

export default SetTimeline;
