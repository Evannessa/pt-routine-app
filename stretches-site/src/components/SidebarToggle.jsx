import React, {useState} from 'react';
import styled, {css} from 'styled-components'
import { ButtonWithIcon } from './styled-components/Buttons.Styled';

const handleTogglePosition = position => {
  switch (position) {
    case "left":
      return css`
        left: 100%; 
      `;
    case "right":
      return css`
        left: 0; 
      `;
    case "top":
        return css`
            bottom: 0; 
        `;
    case "bottom":
        return css`
            top: 0; 
        `;
    default:
      return css`
        right: 0; 
      `;
  }
};
const StyledSidebarButton = styled(ButtonWithIcon)`
    position: absolute;
    border-right: 1px solid hsla(0, 0%, 100%, 0.506);
    backdrop-filter: blur(20px);
    ${({position}) => position == "left" || position == "right" ? css`
        height: 100%;
        width: 2rem;
    ` : css`
        height: 2rem; 
        width: 100%;
    `}
    ${({position}) => handleTogglePosition(position)};
`

const SidebarToggle = ({isClosed, toggleParentClosed, position="left"}) => {


    return (
        <StyledSidebarButton position={position}
            onClick={()=> toggleParentClosed()} icon={isClosed ? "chevron_right" : "chevron_left"}>
        </StyledSidebarButton>
    );
}

export default SidebarToggle;
