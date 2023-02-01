import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
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
    background: var(--clr-primary-base);
    /* width: fit-content; */
    /* height: auto; */
    ${(props) =>
        props.isModal
            ? css`
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
              `
            : css`
                  position: relative;
                  transform: translate(0, 0);
              `}
    width: 70%;
    height: 90vh;
    z-index: 100;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

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

const StyledModalContainerInset = styled(StyledModalContainer)`
    position: relative;
    transform: translate(0, 0);
`;

const StyledModalBody = styled.div`
    width: 90%;
    height: 80%;
    overflow: ${(props) => (props.type === "Text" ? "scroll" : "hidden")};
    scrollbar-width: thin;
    object-fit: contain;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
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
            background-color: var(--clr-primary-base);
        }
        & tr:nth-child(odd) {
            background-color: var(--clr-primary-base);
        }
    }
`;

var md = new Remarkable(); //markdown
md.set({ html: true });

function ModalContainer({ children, isModal }, props) {
    const uploadsUrl = "http://localhost:9000";
    let [linkData, setLinkData] = useState();
    let navigate = useNavigate();
    let params = useParams();
    React.useEffect(() => {
        let options = {
            method: "GET",
            pathsArray: ["display", params.id],
            setStateCallback: setLinkData,
        };
        requests.axiosRequest(options);
        // requests.getObject(params.id, requests.displayBase, params, setLinkData);
    }, []);

    function returnIFrame() {
        return <iframe src={linkData.url} title={linkData.name}></iframe>;
    }
    function returnText() {
        return (
            <StyledHtmlWrapper
                dangerouslySetInnerHTML={{
                    __html: md.render(linkData.text),
                }}
            ></StyledHtmlWrapper>
        );
    }
    function returnImage() {
        return (
            <img
                src={linkData.imagePath ? `${uploadsUrl}/${linkData.imagePath}` : ""}
                alt="leaf"
                // style={{ width: "50%", height: "auto" }}
            />
        );
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
        <StyledModalContainer isModal={isModal}>
            <StyledModalHeader>
                {linkData && <h2 className="modal__title>">{tf.camelCaseToWords(linkData.name)}</h2>}

                <IconButton className="material-icons" btnStyle="" color="white" colorAlt="red" onClick={closeModal}>
                    close
                </IconButton>
            </StyledModalHeader>
            <StyledModalBody className="modal__body" type={linkData ? linkData.type : ""}>
                {linkData && returnChildren()}

                {/* {children} */}
            </StyledModalBody>
            <ButtonGroup></ButtonGroup>
        </StyledModalContainer>
    );
}

export default ModalContainer;
