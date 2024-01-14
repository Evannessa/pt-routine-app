import React from "react";
import styled, { css, keyframes } from "styled-components";
import { nanoid } from "nanoid";

const ActionButton = styled.button`
    color: white;
    background: none;
    &:hover {
        color: pink;
    }
`;
export const StyledToolbar = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    /* position: absolute; */
    /* top: 100%; */
    /* left: 50%; */
    /* transform: translate(-50%, 0%); */
    opacity: 100%;
    z-index: 200;
`;

function FloatingToolbar({ children, actions, timerId }) {
    const toolbarActionButtons = actions
        ? actions.map((action) => (
              <ActionButton
                  key={nanoid()}
                  onClick={(e) => {
                      e.stopPropagation();
                      action.functionRef(timerId);
                  }}
                  timerId={timerId}
                  title={action.description ? action.description : action.name}
              >
                  <span className="material-icons">{action.icon}</span>
              </ActionButton>
          ))
        : [];
    return <StyledToolbar>{toolbarActionButtons}</StyledToolbar>;
}

export default FloatingToolbar;
