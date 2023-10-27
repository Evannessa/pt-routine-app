import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import TimelineThumbnail from './TimelineThumbnail';
import styled from 'styled-components';
import { Icon } from './styled-components/Buttons.Styled';

const StyledHandle = styled.button`
    pointer-events: ${props => props.disabled ? "none" : "auto"};
    position: absolute;
    z-index: 1000;
    height: 100%;
    width: 100%;
    /* width: 2rem; */
    opacity: ${props => props.disabled ? "0%" : "100%"};
    top: 0;
    left: 0;
    touch-action: none;
    border-radius: 10px;
    /* border-top-left-radius: 10px; */
    /* border-bottom-left-radius: 10px; */
    display:inline-flex;
    justify-content: flex-start;
    transition: opacity 100ms ease-in-out;

    span.button-icon{
        display: grid;
        place-content: center;
        width: 20%;
        height: 100%;
    }
`;

export function SortableThumbnail(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id, disabled: props.disabled});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <TimelineThumbnail ref={setNodeRef} style={style} 
        {...props}
        {...listeners}
        {...attributes}
    >      
        <StyledHandle 
            {...listeners} 
            {...attributes}
            className='drag-handle'
            disabled={props.disabled}
        >
            <Icon className="button-icon" icon="drag_indicator"></Icon>
            <span>{props.timer.label}</span>

        </StyledHandle>
    </TimelineThumbnail>
  );
}