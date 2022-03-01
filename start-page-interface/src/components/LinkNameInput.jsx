import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
import TextboxPrefix from "./TextboxPrefix";
import TagChips from "./TagChips";

const StyledTextboxSpan = styled.div`
    background-color: #373737;
    min-width: 8rem;
    min-height: 2rem;
    border-radius: 4px;
    border: none;
    border-bottom: 2px solid #6495ed;
    color: #6495ed;
    padding: 0.25rem 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    align-items: center;
    /* justify-content: center; */
    > span {
        background-color: #6495ed;
        color: white;
    }
    input {
        border: 0px;
        height: 100%;
        background-color: #373737;
        color: #6495ed;
    }
`;

// #region StyledComponents

const StyledLinkForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    *:not(input) {
        color: white;
    }
    > input {
        min-width: 8rem;
        height: 2rem;
        border-radius: 4px;
        border: none;
        background-color: #373737;
        border-bottom: 2px solid #6495ed;
        color: #6495ed;
        padding: 0.25rem 0.5rem;
    }
`;

// #endregion
function LinkNameInput(props) {
    const params = useParams();
    console.log(params);
    let id = Object.keys(params).length > 0 ? params.id : "new";
    const location = useLocation();
    console.log(location);
    const urlBase = "http://localhost:9000/links";
    const [saved, setSaved] = React.useState(false);
    const [allTags, setAllTags] = React.useState([]);
    const [formData, setFormData] = React.useState({
        name: "",
        url: "",
        tags: [],
    });
    const idRef = React.useRef();

    /**
     *
     * @param {String} property - the name of the property we're updating
     * @param {Object} data - the data we're updating the property with
     */
    function updateFormData(property, data) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [property]: data,
            };
        });
    }

    //get ALL tags to suggest when user types
    React.useEffect(() => {
        try {
            axios.get(`${urlBase}/tags`).then((result) => {
                setAllTags(result.data.tags);
                // updateFormData("tags", result.data.tags);
            });
        } catch (error) {
            console.log(error);
        }

        //get the link with this id after redirect
        if (idRef.current !== "new") {
            try {
                axios.get(`${urlBase}/${id}`).then((response) => {
                    console.log(response.data);
                    if (response.data !== null) {
                        setFormData(response.data.link);
                    }
                });
            } catch (error) {
                console.log("There was an error");
            }
        }
    }, []);

    React.useEffect(() => {}, [formData.tags]);
    let tagOptions = formData.tags.map((tag) => (
        <option key={tag._id} value={tag.name}></option>
    ));
    let tagSpans = formData.tags.map((tag) => (
        <TagChips
            key={tag._id}
            id={tag._id}
            removeTag={removeTag}
            tagName={tag.name ? tag.name : tag}
        />
    ));

    //update the state with new data, and make a patch request
    async function setStateAndPatch(newData) {
        try {
            let updated = await axios
                .patch(`${urlBase}/${params.id}`, newData)
                .then((response) => setFormData(response.data.obj));
        } catch (error) {
            console.log(error);
        }
    }

    //remove specific tag from this link
    function removeTag(id) {
        let tags = [...formData.tags].filter((tag) => tag._id !== id);
        let newData = { ...formData, tags: tags };
        console.log(newData);
        setStateAndPatch(newData);
    }
    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("Event is", event, event.currentTarget);
        createNewLink();
    }
    /**
     * axios == post request to new link
     */
    async function createNewLink() {
        try {
            await axios.post(`${urlBase}/new`, formData).then((result) => {
                console.log("Result is", result);
                idRef.current = result.data.link._id;
                console.log(idRef.current);
            });
        } catch (error) {
            console.log(error);
        } finally {
            console.log("being saved");
            setSaved(true);
        }
    }
    /**
     * handle pressing Enter in the tags box
     * @param {event} event - the event data within the text box
     */
    async function handleKeyDown(event) {
        event.preventDefault();
        event.stopPropagation();
        let tagBox = event.currentTarget;
        let newTag = tagBox.value;
        tagBox.value = "";

        if (event.key === "Enter" || event.keyCode === 13) {
            console.log("Pressed enter in textbox. Value is", tagBox.value);

            //get tags from old formdata
            let newArray = [...formData.tags];

            //push new form data if doesn't exist
            if (!newArray.includes(newTag)) {
                newArray.push(newTag);
            }
            // let newData = {
            //     ...formData,
            //     tags: newArray,
            // };
            let newData = {
                id: formData._id,
                tagName: newTag,
            };
            //TODO: rather than sending the whole shebang, just send
            // The new tag name and ID of link
            console.log("Passed data is", newData);
            try {
                let updated = await axios
                    .patch(`${urlBase}/${params.id}`, newData)
                    .then((response) => setFormData(response.data.obj));
            } catch (error) {
                console.log(error);
            }
        }
    }
    //we've created and saved a new link, so navigate to the stored reference of the id
    if (saved === true && `/links/${idRef.current}` !== location.pathname) {
        return <Navigate to={`/links/${idRef.current}`} />;
    }

    function handleChange(event) {
        let { name, type, checked, value } = event.currentTarget;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }
    return (
        <StyledLinkForm onSubmit={handleSubmit}>
            <label htmlFor="linkName">Link Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
            />
            <label htmlFor="url">URL</label>
            <input
                type="text"
                name="url"
                id="url"
                value={formData.url}
                onChange={handleChange}
            />
            <StyledTextboxSpan>
                {tagSpans}
                <input
                    type="text"
                    list="tags"
                    name="tags"
                    onKeyDown={(e) => e.key === "Enter" && handleKeyDown(e)}
                />
            </StyledTextboxSpan>
            {/* <input type="text" list="tags" name="tags" onKeyUp={handleKeyUp} /> */}
            <datalist id="tags">{tagOptions}</datalist>

            <button type="submit">Submit</button>
        </StyledLinkForm>
    );
}

export default LinkNameInput;
