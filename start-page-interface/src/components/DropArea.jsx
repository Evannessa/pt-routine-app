import React, { useEffect, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { useParams } from "react-router-dom";
import { requests } from "../helpers/requests";

const url = "http://localhost:9000/factory";
const uploadsUrl = "http://localhost:9000";
// const url = "localhost:9000/factory";
function DropArea(props) {
    const params = useParams();
    const dropRef = React.useRef();
    let dragCounter = React.useRef(0);
    const [dragging, setDragging] = React.useState(false);
    const previewRef = React.useRef();
    // const [files, setFiles] = React.useState(null);

    async function uploadStuff(file, data) {
        let imageValue;

        const imageFile = file;
        const formData = new FormData();

        formData.append("image", imageFile);
        function updateImage(response) {
            let src = response.data.image;

            let updateObj = requests.compileUpdateData(params.id, "imagePath", src, "update");
            let options = {
                method: "PATCH",
                pathsArray: ["create", params.id],
                setStateCallback: props.updateFormData,
                data: updateObj,
            };
            requests.axiosRequest(options);
            // requests.updateObject(
            //     params.id,
            //     updateObj,
            //     requests.createBase,
            //     props.updateFormData,
            //     "link"
            // );
        }
        let options = {
            method: "POST",
            pathsArray: ["create", params.id, "uploads"],
            setStateCallback: updateImage,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        };
        requests.axiosRequest(options);

        // try {
        //     //upload image
        //     const {
        //         data: {
        //             image: { src },
        //         },
        //     } = await axios.post(
        //         `${requests.createBase}/${params.id}/uploads`,
        //         formData,
        //         {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         }
        //     );
        //     imageValue = src;

        //     let updateObj = requests.compileUpdateData(
        //         params.id,
        //         "imagePath",
        //         src,
        //         "update"
        //     );
        //     requests.updateObject(
        //         params.id,
        //         updateObj,
        //         requests.createBase,
        //         props.updateFormData,
        //         "link"
        //     );
        // } catch (error) {
        //     imageValue = null;
        //     console.log(error);
        // }
        previewRef.current.src = imageValue;
    }

    function handlePaste(event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        console.log(JSON.stringify(items)); // will give you the mime types
        for (let index in items) {
            var item = items[index];
            if (item.kind === "file") {
                var blob = item.getAsFile();
                var reader = new FileReader();
                readImage(blob);
                // reader.onload = function (event) {
                //     console.log(event.target.result);
                // 	uploadStuff()
                // }; // data url!
                // reader.readAsDataURL(blob);
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
            // uploadStuff(files[0]);
            // console.log(e.dataTransfer.files);
            // e.dataTransfer.clearData();
            files = Array.from(files);
            // setFiles((prevFiles) => {
            //     return { ...prevFiles, ...files };
            // });
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
    return (
        <div
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
                src={props.imagePath ? `${uploadsUrl}/${props.imagePath}` : ""}
                alt="preview"
                ref={previewRef}
                style={{ width: "10%", height: "auto" }}
            />
        </div>
    );
}

export default DropArea;
