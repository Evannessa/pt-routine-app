import React, {useState} from 'react';
import SidebarToggle from './SidebarToggle';
import styled, { css } from 'styled-components';
import { device } from './styled-components/devices';

const handleDrawerPosition = (position, isClosed)=> {

    switch (position) {
        case "left":
            return css`
                top: 0; 
                left: 0;
                transform: ${isClosed ? "translate(-100%)" : "translate(0)"};
            ` 
        case "right":
            return css`
                top: 0;
                right: 0;
                transform: ${isClosed ? "translate(100%)" : "translate(0%)"};
            `
        case "bottom":
            return css`
                bottom: 0; 
                left: 0;
                transform: ${isClosed ? "translateY(100%)" : "translateY(0%)"};
            `
        default:
            return css`
                top: 0;
                left: 0;
                transform: ${isClosed ? "translateY(-100%)" : "translateY(0%)"};
            `
    }


}

const StyledDrawer = styled.section`
    z-index: 1000;
    position: absolute;
    overflow-x: visible;
    backdrop-filter: blur(20px);
    @media ${device.tablet}{
        width: ${props => props.position == "left" || props.position == "right" ? "30vw" : "100%"};
        height: ${props => props.position == "top" || props.position == "bottom" ? "20vh" : "100%"};
    }
    @media ${device.laptop}{
        width: ${props => props.position == "left" || props.position == "right" ? "25vw" : "100%"};
    }
    border-right: 1px solid hsla(0, 0%, 100%, 0.506);
    ${({ position, isClosed }) => handleDrawerPosition(position, isClosed)}
    transition: transform 200ms ease-in-out;
`


const Drawer = (props, {position="left"}) => {
    const [isClosed, setIsClosed] = useState(true);

    function setToggleClosed(){
        setIsClosed(!isClosed)
    }


    return (
        <StyledDrawer isClosed={isClosed} position={position}>
            {props.children}
            <SidebarToggle isClosed={isClosed} toggleParentClosed={setToggleClosed} position={position}></SidebarToggle>
        </StyledDrawer>
    );
}

export default Drawer;
