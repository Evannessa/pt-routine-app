import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { requests } from "../helpers/requests";
import { Navigate, useNavigate } from "react-router-dom";
import tf from "../helpers/formatText";
import { Remarkable } from "remarkable";
import {
    StyledButton,
    IconButton,
    ButtonGroup,
    OutlinedButton,
    ContainedButton,
} from "./styled-components/Buttons.Styled";
const StyledModalContainer = styled.div`
    background: rgba(106, 90, 205, 0.9);
    /* width: fit-content; */
    /* height: auto; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 90vh;
    z-index: 100;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

    iFrame {
        width: 70%;
        height: 80%;
        /* border: 8px double rgba(255, 255, 255, 0.25); */
        box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.5);
        border: none;
        border-top: 3px solid rgba(255, 255, 255, 0.25);
        border-radius: 12px;
    }
`;
const StyledModalBody = styled.div`
    width: 90%;
    height: 80%;
    overflow: hidden;
    overflow: scroll;
    scrollbar-width: thin;
`;

const StyledModalHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 2rem;
    ${IconButton} {
        margin-left: auto;
    }
    h2 {
        margin-left: auto;
    }
`;

const StyledHtmlWrapper = styled.div`
    /* background: #212121; */
    color: white;
    display: flex;
    flex-direction: column;
    table {
        & tr {
            margin: 2rem 0rem;
        }
        & th {
            padding: 2rem 0rem 1rem 1rem;
        }
        & td {
            padding: 2rem 0rem 2rem 1rem;
        }
        & * {
            font-size: 1.25rem;
            text-align: left !important;
            border: none !important;
        }
        & th {
            color: white;
        }
        & tr:nth-child(even) {
            background-color: #292b5f;
        }
        & tr:nth-child(even) {
            background-color: #292b5f;
        }
    }
`;

var md = new Remarkable(); //markdown
md.set({ html: true });

function ModalContainer({ children }, props) {
    let [linkData, setLinkData] = useState();
    let navigate = useNavigate();
    let params = useParams();
    React.useEffect(() => {
        requests.getObject(params.id, requests.displayBase, params, setLinkData);
    }, []);

    function returnIFrame() {
        return <iframe src={linkData.url} title={linkData.name}></iframe>;
    }
    function returnText() {
        return (
            <StyledHtmlWrapper
                dangerouslySetInnerHTML={{
                    __html: md.render(linkData.text),
                }}></StyledHtmlWrapper>
        );
    }
    function returnImage() {
        return <image src={linkData.imageSource} />;
    }

    /**
     * Return a child depending on what type the link is
     * @returns an iFrame, image, or div with html rendered from markdown
     */
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
    const closeModal = (event) => {
        event.stopPropagation();
        navigate(-1);
    };
    return (
        <StyledModalContainer>
            <StyledModalHeader>
                {linkData && (
                    <h2 className="modal__title>">
                        {tf.camelCaseToWords(linkData.name)}
                    </h2>
                )}

                <IconButton
                    className="material-icons"
                    btnStyle=""
                    color="white"
                    colorAlt="red"
                    onClick={closeModal}>
                    close
                </IconButton>
            </StyledModalHeader>
            <StyledModalBody className="modal__body" style={{ color: "black" }}>
                {linkData && returnChildren()}

                {/* {children} */}
            </StyledModalBody>
            <ButtonGroup></ButtonGroup>
        </StyledModalContainer>
    );
}

export default ModalContainer;
