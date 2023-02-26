import React, { useEffect, useState } from "react";

function DropArea(props) {
    // const [dragging, setDragging] = useState({
    //     dragEnter: false,
    //     dragOver: false,
    //     dragLeave: false,
    //     drop: false,
    // });
    const dropRef = React.useRef();
    let dragCounter = React.useRef(0);
    const [dragging, setDragging] = React.useState(false);
    const fileInputField = React.useRef(null);
    const previewRef = React.useRef();
    const [files, setFiles] = React.useState(
        JSON.parse(localStorage.getItem("files")) || []
    );
    useEffect(() => {
        console.log("Files after update", files);
        if (Object.keys(files).length > 0) {
            console.log("Files updated, storing", files);
            console.log("Stringified", JSON.stringify(files));
            localStorage.setItem("files", JSON.stringify(files));
        }
    }, [files]);

    useEffect(() => {
        console.log(files[0]);
        if (Object.keys(files[0]).length > 0) {
            readImage(files[0]);
        }
    }, []);
    // function handleFiles(files) {
    //     console.log(files);
    //     [...files].forEach(uploadFile);
    // }

    // function uploadFile(file) {
    //     let url = "YOUR URL HERE";
    //     let formData = new FormData();
    //     formData.append("file", file);
    // }

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    function highlight(e) {
        let element = e.target;
        element.classList.add("highlight");
    }
    function unhighlight(e) {
        let element = e.target;
        element.classList.add("highlight");
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
            console.log(e.dataTransfer.files);
            // e.dataTransfer.clearData();
            files = Array.from(files);
            setFiles((prevFiles) => {
                return { ...prevFiles, ...files };
            });
            console.log("Files", files);
            dragCounter.current = 0;
            readImage(files[0]);
        }
    }
    function readImage(file) {
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            previewRef.current.src = event.target.result;
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
            ref={dropRef}>
            {files[0] && (
                <img className="slide__preview" src="" alt="preview" ref={previewRef} />
            )}
            {/* <form action="" className="dropForm">
                <p>
                    Upload multiple files with the file dialog, or by dragging and
                    dropping images onto the dashed region.
                </p>
                <input
                    type="file"
                    name="fileElem"
                    id="fileElem"
                    multiple
                    accept="image/*"
                    ref={fileInputField}
                    onChange={handleFiles}
                />
                <label htmlFor="fileElem" className="button">
                    Select some files
                </label>
            </form> */}
        </div>
    );
}

export default DropArea;
