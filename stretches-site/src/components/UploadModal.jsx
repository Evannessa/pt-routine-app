import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { requests, urls } from "../helpers/requests";
import styled from "styled-components";
import { StyledModal } from "./styled-components/modal.styled";
const { urlBase, uploadsUrl } = urls;

const StyledImgThumbnail = styled.img`
    max-width: 4rem;
    height: auto;
    object-fit: contain;
    background-color: hsl(0, 2%, 95%);
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    border: 1px solid;
    border-color: ${(props) => props.theme.color2};
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        outline: 2px solid pink;
    }
`;
const ImageList = styled.div`
    display: flex;
    width: fit-content;
    max-width: 400px;
    max-height: 300px;
    overflow: auto;
    gap: 0.25rem;
    flex-wrap: wrap;
`;
/**
 * This displays the various images we've uploaded by fetching image files from the uploads folder
 * and allows to switch which image belongs to a timer by clicking
 * @param {*} props
 * @returns ReactComponent
 */
function UploadModal(props) {
    const [imagePaths, setImagePaths] = useState(null);

    /**
     * Get the array of images and map them, then set the state of our upload modal to be them
     * @param {Array} response - the response which should be an array of images within our uploads folder
     */
    function populatePaths(response) {
        const fileNames = response.map((imageValue) => `/${imageValue}`);
        setImagePaths(fileNames);
    }
    useEffect(() => {
        const options = {
            method: "GET",
            pathsArray: ["factory", "uploads"],
            setStateCallback: populatePaths,
        };
        requests.axiosRequest(options);
    }, []);

    function selectImage(event) {
        const src = event.currentTarget.getAttribute("src");
        const baseName = "/uploads/" + src.split("/").pop();
        console.log("Base file name is", baseName);

        props.updateTimerData("slideImagePath", baseName);
    }

    const imageElements = imagePaths
        ? imagePaths.map((str) => <StyledImgThumbnail key={nanoid()} onClick={selectImage} src={str} alt={str} />)
        : [];

    return <StyledModal>{imagePaths && <ImageList>{imageElements}</ImageList>}</StyledModal>;
}

export default UploadModal;
