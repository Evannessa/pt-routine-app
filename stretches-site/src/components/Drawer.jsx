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
                /* left: ${isClosed ? "unset" : "0"}; */
                /* right: ${isClosed ? "100%" : "unset"}; */
            ` 
        case "right":
            return css`
                top: 0;
                right: 0;
            `
        case "bottom":
            return css`
                bottom: 0; 
                left: 0;
            `
        default:
            return css`
                top: 0;
                left: 0;
            `
    }


}

const StyledDrawer = styled.section`
    position: absolute;
    overflow-x: visible;
    @media ${device.tablet}{
        width: ${props => props.position == "left" || props.position == "right" ? "30vw" : "100%"};
        height: ${props => props.position == "top" || props.position == "bottom" ? "20vh" : "100%"};
    }
    @media ${device.laptop}{
        width: ${props => props.position == "left" || props.position == "right" ? "25vw" : "100%"};
    }
    /* top: 0; */
        /* left: 0; */
    border-right: 1px solid hsla(0, 0%, 100%, 0.506);
    z-index: 900;
    /* height: 100%; */
    /* position: a; */
    ${({ position, isClosed }) => handleDrawerPosition(position, isClosed)}
    transition: transform 200ms ease-in-out;
`


const Drawer = (props, {position="left"}) => {
    const [isClosed, setIsClosed] = useState(false);

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
