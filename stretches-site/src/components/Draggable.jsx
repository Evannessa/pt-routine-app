import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';

function Sortable(props) {
  const Element = props.element || 'div';
      const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
        } = useSortable({id: timer._id});

  return (
    <Element ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </Element>
  );
}
export default Sortable;