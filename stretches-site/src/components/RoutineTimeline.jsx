import React, { createRef, useState } from "react";
import { ButtonWithIcon, IconButton } from "./styled-components/Buttons.Styled";
import TimelineThumbnail, { NewTimerButton } from "./TimelineThumbnail";
import styled from "styled-components";
import {
    restrictToHorizontalAxis,
    restrictToWindowEdges,
} from '@dnd-kit/modifiers';

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
    horizontalListSortingStrategy,
    rectSwappingStrategy
} from '@dnd-kit/sortable'

import TimerHelpers from "../classes/TimerHelper";
import { SortableThumbnail } from "./SortableItem";
import { useEffect } from "react";
import helpers from "../classes/Helpers";
import DummyThumbnail from "./DummyThumbnail";



/* #region  Styled components */

const TimelineWrapper = styled.ul`
    margin-left: 32px;
    position: relative;
    z-index: 200;
    display: flex;
    gap: 3rem;
    align-items: center;
    /* justify-content: flex-start; */
    > li:first-child, button:first-child{
        margin-left: auto;
    }
    > li:last-child, button:last-child{
        margin-right: auto;
    }

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
    ul{
        top: 0 !important;
        /* transform: tra */
    }
    .add-button.special{
        width: 3rem;
        height: 3rem;
        position: static;
        transform: scale(1.0) translate(-25%);
        border: 2px solid white !important;
        opacity: unset;
        color: white;
        border-radius: 10px;
        /* margin: unset; */
        background-color: hsla(0, 0%, 100%, 0.3);
        span{
            font-size: xx-large;
            color: white;
        }
        margin-right: auto;
    }



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

function RoutineTimeline({
    sortMode,
    timers,
    timerInView,
    addNewTimer,
    setParentTimers,
    navigateToParentTimer,
    deleteParentTimer
    }) {
    const timerThumbnailRefs = React.useRef([]);
    const mousePosition = React.useRef({ x: null, y: null });
    const [selectedTimers, setSelectedTimers] = React.useState();
    const [activeId, setActiveId] = useState(null);
    const [items, setItems] = useState([]);
    // const [sortMode, setSortMode] = useState(false)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function getTimerIds() {
        return timers.map(timer => TimerHelpers.getSetId(timer))
    }
    function onTimerSelected(dataKey, event) {
        //push returns the array's length
        // if (event.ctrlKey) {
        //     console.log("Ctrl key pressed")
        // }
        // debugger;
        let newArray = [...selectedTimers];
        let timer = timers.find((timer) => timer._id === dataKey);
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

    function handleMouseMove(e) {
        mousePosition.current = { x: e.clientX, y: e.clientY };
    }
    useEffect(() => {
        if (timers.length > 0) {
            setItems(getTimerIds())
            setSelectedTimers([timers[0]])
        }
        // return () => {
        //     cleanup
        // };
    }, [timers]);

    function updateTimerPositions(oldIndex, newIndex) {
        let swapTimers = [...timers]
        const temp = swapTimers[newIndex]
        swapTimers[newIndex] = swapTimers[oldIndex]
        swapTimers[oldIndex] = temp
        setParentTimers(swapTimers)
    }



    function handleDragStart(event) {
        const { active } = event;

        setActiveId(active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            updateTimerPositions(oldIndex, newIndex)
        }

        setActiveId(null);
    }


    const thumbnailComponents = items && items.length > 0 ? items.map((item, index) => {

        
        const timer = helpers.getItemWithProperty(timers, "_id", item) || timers[index]
        return timer ? <SortableThumbnail
            key={timer._id}
            index={index}
            id={timer._id}
            disabled={!sortMode}
            isLast={index === timers.length - 1}
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
            isSelected={selectedTimers && selectedTimers.find((st) => st._id === timer._id)}
            viewed={timerInView === timer._id}
        /> : <></>
    }) : []



    return (
        <TimelineWrapper onMouseMove={handleMouseMove}>
            
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToHorizontalAxis]}
            >
                <SortableContext
                    items={items}
                    strategy={horizontalListSortingStrategy}
                >
                    {thumbnailComponents}
                </SortableContext>
                <DragOverlay
                    modifiers={[restrictToWindowEdges,
                        restrictToHorizontalAxis
                    ]}
                    wrapperElement="ul"
                >
                    {activeId && timers.length > 0 ? <TimelineThumbnail id={activeId} timer={timers.find(timer => timer._id == activeId)} disabled={false} /> : null}
                </DragOverlay>
                <ButtonWithIcon
                    icon="add"
                    title={"Add a new exercise timer"}
                    onClick={(event) => addNewTimer(timers.length - 1, -1, event.ctrlKey)}
                    className="add-button special"/>
                {/* <ButtonWithIcon className="add-button" icon={"add"}></ButtonWithIcon> */}
            </DndContext>
        </TimelineWrapper>
    );
}

export default RoutineTimeline;
