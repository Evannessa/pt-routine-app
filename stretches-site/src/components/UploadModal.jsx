import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { requests } from "../helpers/requests";
import styled from "styled-components";
import { StyledModal } from "./styled-components/modal.styled";
const uploadsUrl = "http://localhost:9000/uploads/";

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
function UploadModal(props) {
    const [imagePaths, setImagePaths] = useState(null);

    function populatePaths(response) {
        const fileNames = response.map((imageValue) => `${uploadsUrl}/${imageValue}`);
        setImagePaths(fileNames);
    }
    useEffect(() => {
        const options = {
            method: "GET",
            pathsArray: ["uploads"],
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