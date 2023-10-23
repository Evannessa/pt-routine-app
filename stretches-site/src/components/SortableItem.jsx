import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import TimelineThumbnail from './TimelineThumbnail';
import DummyThumbnail from './DummyThumbnail';

export function SortableThumbnail(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <TimelineThumbnail ref={setNodeRef} style={style} {...props}>      
        <button style={{
            position: 'absolute',
            zIndex: 1000
        }}{...listeners} {...attributes}>Drag handle</button>
    </TimelineThumbnail>
  );
}