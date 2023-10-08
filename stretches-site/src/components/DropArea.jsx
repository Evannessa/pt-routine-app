import React from "react";
import axios from "axios";
import FormData from "form-data";
import { useParams } from "react-router-dom";
import { Container } from "./styled-components/layout.styled";
import styled from "styled-components";
import { urls, combineUrlFragments } from "../helpers/requests";
import cannotLoad from "../images/cannot_load.jpg"
import dragDropImage from "../images/drag_drop_image.webp"
// #region Styled Components
export const StyledDropArea = styled(Container)`
    border-radius: 20px;
    /* width: 50%; */
    /* margin: 2% auto; */
    padding: 1rem;
    background-color: transparent;
    /* max-height: 5rem; */
    height: 100%;
    width: 80%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed white;
    /* box-shadow: inset 0px 2px 0px 2px #21212150; */
    /* border-bottom: 3px solid rgba(255, 255, 255, 0.342); */


	img {
		max-width: 100%;
		max-height: 100%;
        border-radius: 5px;
	}


	.dropForm {
		background: transparent;

		input[type="file"] {
			width: 5rem;
			min-height: 5rem;
			flex: 1 0;
			background-color: purple;
		}
	}

	&.highlight {
		background-color: rgba(255, 255, 255, 0.342);
	}

    img {
        min-width: 4rem;
        min-height: 4rem;
        max-width: 100%;
        max-height: 100%;
	    transform: rotate(15deg) scale(0.8);
        box-shadow: 0px 2px 4px 2px #21212150;
    }

    .dropForm {
        background: transparent;

        input[type="file"] {
            width: 5rem;
            min-height: 5rem;
            flex: 1 0;
            background-color: purple;
        }
    }

    &.highlight {
        background-color: rgba(255, 255, 255, 0.342);
    }
`;
StyledDropArea.displayName = "StyledDropArea";
// #endregion
/* -------------------------------------------------------------------------- */
function DropArea(props) {
    const { urlBase, urlBaseNoApi, uploadsUrl, factoryRoute, uploadsRoute } = urls;
    // const uploadsUrl = combineUrlFragments(urlBase, [factoryRoute, uploadsRoute]);
    /* ---------------------------- States and Hooks ---------------------------- */
    // #region States and hooks
    const params = useParams();
    const dropRef = React.useRef();
    let dragCounter = React.useRef(0);
    const [dragging, setDragging] = React.useState(false);
    const previewRef = React.useRef();
    // const [files, setFiles] = React.useState(null);
    // #endregion

    /* -------------------------------- functions ------------------------------- */
    // #region Functions
    async function uploadStuff(file, data) {
        let imageValue;

        const imageFile = file;
        const formData = new FormData();

        formData.append("image", imageFile);

        try {
            //upload image
            const specificUrl = combineUrlFragments(urlBase, [factoryRoute, "/", params.setId, uploadsRoute]);
            // `${url}/${params.setId}/uploads`
            const {
                data: {
                    image: { src },
                },
            } = await axios.post(specificUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            imageValue = src;

            props.updateTimerData("slideImagePath", src);
        } catch (error) {
            imageValue = null;
            console.log("An error happened while uploading an image");
        }
        previewRef.current.src = `${uploadsUrl}/uploads${imageValue}`;
    }

    function handlePaste(event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (let index in items) {
            var item = items[index];
            if (item.kind === "file") {
                var blob = item.getAsFile();
                var reader = new FileReader();
                readImage(blob);
            }
        }
    }

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    //add highlight class
    function highlight(e) {
        let element = e.target;
        element.classList.add("highlight");
    }
    //remove highlight class
    function unhighlight(e) {
        let element = e.target;
        element.classList.remove("highlight");
    }

    function handleDragEnter(e) {
        preventDefaults(e);
        e.stopPropagation();
        highlight(e);

        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({ dragging: true });
        }
    }
    function handleDragOver(e) {
        preventDefaults(e);
        e.stopPropagation();
        highlight(e);
    }

    function handleDragLeave(e) {
        preventDefaults(e);
        e.stopPropagation();
        unhighlight(e);
        if (dragCounter.current === 0) {
            setDragging(false);
        }
    }
    function handleDrop(e) {
        preventDefaults(e);
        e.stopPropagation();
        unhighlight(e);
        let dt = e.dataTransfer;
        let files = dt.files;
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            files = Array.from(files);
            dragCounter.current = 0;
            readImage(files[0]);
        }
    }
    async function readImage(file) {
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            previewRef.current.src = event.target.result;
            uploadStuff(file, event.target.result);
        });
        reader.readAsDataURL(file);
    }

    /* -------------------------------------------------------------------------- */
    // #endregion

    return (
        <StyledDropArea
            draggable
            className="dropArea"
            onDragStart={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onPaste={handlePaste}
            ref={dropRef}
        >
            <img
                className="slide__preview"
                src={
                    props.slideImagePath && props.slideImagePath.length > 0
                        ? `${urlBaseNoApi}${props.slideImagePath}`
                        // ? `${props.slideImagePath}`
                        : {dragDropImage}
                }
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src= cannotLoad;
                }}
                crossOrigin="true"
                alt="preview"
                ref={previewRef}
            />

        </StyledDropArea>
    );
}

export default DropArea;
