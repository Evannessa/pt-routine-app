import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { requests } from "../helpers/requests";
import LinkDisplay from "./LinkDisplay";
import {
    StyledButton,
    IconButton,
    ButtonGroup,
    OutlinedButton,
    ContainedButton,
} from "./styled-components/Buttons.Styled";
const StyledModalContainer = styled.div`
    background: slateblue;
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
    let [linkData, setLinkData] = useState();
    let params = useParams();
    React.useEffect(() => {
        requests.getObject(params.id, requests.displayBase, params, setLinkData);
    }, []);

    function returnIFrame() {
        return <iframe src={linkData.url} title={linkData.name}></iframe>;
    }
    function returnText() {
        return <div>linkData.text</div>;
    }
    function returnImage() {
        return <image src={linkData.imageSource} />;
    }

    function returnChildren() {
        let child;
        switch (linkData.type) {
            case "Frame":
                child = returnIFrame();
                break;
            case "Text":
                child = returnText();
                break;
            case "Image":
                child = returnImage();
                break;
            default:
                break;
        }
        return child;
    }

    return (
        <StyledModalContainer>
            <StyledModalHeader>
                <h2>HELLO WORLD</h2>
                {props.title && <h1 className="modal__title>">{props.title}</h1>}
            </StyledModalHeader>
            <StyledModalBody className="modal__body" style={{ color: "black" }}>
                {returnChildren()}

                {/* {children} */}
            </StyledModalBody>
            <ButtonGroup></ButtonGroup>
        </StyledModalContainer>
    );
}

export default ModalContainer;
