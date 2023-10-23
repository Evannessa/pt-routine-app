import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import TimelineThumbnail from './TimelineThumbnail';

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
    <TimelineThumbnail ref={setNodeRef} style={style} {...attributes} {...listeners} {...props}/>
  );
}