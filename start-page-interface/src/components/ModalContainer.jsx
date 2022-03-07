import React from "react";
import styled from "styled-components";
import {
    StyledButton,
    IconButton,
    ButtonGroup,
    OutlinedButton,
    ContainedButton,
} from "./styled-components/Buttons.Styled";
const StyledModalContainer = styled.div`
    background: white;
    /* width: fit-content; */
    /* height: auto; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 50%;
    z-index: 100;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
const StyledModalBody = styled.div``;

const StyledModalHeader = styled.div``;

function ModalContainer({ children }, props) {
    return (
        <StyledModalContainer>
            <StyledModalHeader>
                {props.title && <h1 className="modal__title>">{props.title}</h1>}
            </StyledModalHeader>
            <StyledModalBody className="modal__body" style={{ color: "black" }}>
                {children}
            </StyledModalBody>
            <ButtonGroup></ButtonGroup>
        </StyledModalContainer>
    );
}

export default ModalContainer;
