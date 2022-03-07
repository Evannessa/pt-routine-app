import React from "react";
import styled from "styled-components";
import axios from "axios";
import { IconButton, ContainedButton } from "./styled-components/Buttons.Styled";
import { useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
import { requests } from "../helpers/requests";
import TagChips from "./TagChips";
import ChipGroup from "./ChipGroup";
import Form from "./input/Form";
import Input from "./input/Input";

const StyledTextboxSpan = styled.div`
    background-color: #171529;
    min-width: 8rem;
    min-height: 2rem;
    border-radius: 4px;
    border: none;
    border-bottom: 2px solid #6495ed;

    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    color: #6495ed;
    padding: 0.25rem 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    align-items: center;
    height: fit-content;
    /* justify-content: center; */
    > span {
        background-color: #6495ed;
        color: white;
    }
    input {
        border: 0px;
        height: 100%;
        background-color: #171529;
        color: #6495ed;
    }
`;

// #region StyledComponents

const StyledContainer = styled.div`
    /* position: absolute; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5rem 2rem;
    gap: 1rem;
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-style: preserve-3d; */
    width: fit-content;
    background: #342e57;
    border-radius: 15px;
    z-index: 1;
    > button {
        align-self: flex-end;
    }
`;

const StyledLinkForm = styled.form`
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: repeat(3, 1fr), 1fr;
    gap: 1rem;
    z-index: 1;
    *:not(input) {
        color: white;
    }
    label {
        grid-column: 1/2;
        text-align: right;
    }
    > input,
    ${StyledTextboxSpan} {
        grid-column: 2/3;
    }
    > button[type="submit"] {
        grid-column: 1/3;
        grid-row: 4/5;
    }

    > button[type="submit"] {
        background-color: #6495ed;
        border: none;
        color: white;
        padding: 0.5em 1em;
        border-radius: 5px;
    }
    > input {
        background-color: #171529;
        min-width: 8rem;
        min-height: 2rem;
        border-radius: 4px;
        border: none;
        border-bottom: 2px solid #6495ed;
        color: #6495ed;
        padding: 0.25rem 0.5rem;
        display: flex;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
`;
class LinkType {
    static External = new LinkType("external");
    static Text = new LinkType("text");

    static Frame = new LinkType("frame");
    static Image = new LinkType("image");
    constructor(name) {
        this.name = name;
    }
}
// #endregion
function LinkNameInput(props) {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params);
    let id = Object.keys(params).length > 0 ? params.id : "new";
    const location = useLocation();
    console.log(location);
    const urlBase = "http://localhost:9000/links/create";
    const [saved, setSaved] = React.useState(false);
    const [allTags, setAllTags] = React.useState([]);
    const [formData, setFormData] = React.useState({
        name: "",
        url: "",
        tags: [],
        type: LinkType.External.name,
    });
    const idRef = React.useRef();

    //get ALL tags to suggest when user types
    React.useEffect(() => {
        requests.getAll(`${urlBase}/tags`, setAllTags, "tags");
        requests.getObject(id, urlBase, params, setFormData);
        // try {
        //     axios.get(`${urlBase}/tags`).then((result) => {
        //         setAllTags(result.data.tags);
        //         // updateFormData("tags", result.data.tags);
        //     });
        // } catch (error) {
        //     console.log(error);
        // }

        //get the link with this id after redirect
        // if (idRef.current !== "new") {
        //     try {
        //         axios.get(`${urlBase}/${id}`).then((response) => {
        //             console.log(response.data);
        //             if (response.data !== null) {
        //                 setFormData(response.data.link);
        //             }
        //         });
        //     } catch (error) {
        //         console.log("There was an error");
        //     }
        // }
    }, []);

    let tagOptions = formData
        ? formData.tags.map((tag) => <option key={tag._id} value={tag.name}></option>)
        : [];
    let tagSpans = formData
        ? formData.tags.map((tag) => (
              <TagChips
                  key={tag._id}
                  id={tag._id}
                  removeTag={removeTag}
                  tagName={tag.name ? tag.name : tag}
              />
          ))
        : [];

    //update the state with new data, and make a patch request
    async function setStateAndPatch(newData) {
        requests.updateObject(params.id, newData, urlBase, setFormData, "link");
        // try {
        //     let updated = await axios
        //         .patch(`${urlBase}/${params.id}`, newData)
        //         .then((response) => {
        //             console.log("Response", response);
        //             return setFormData(response.data.link);
        //         });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    //remove specific tag from this link
    function removeTag(id) {
        // let tags = [...formData.tags].filter((tag) => tag._id !== id);
        // let newData = { ...formData, tags: tags };
        let removalData = {
            id: formData._id,
            tagId: id,
            isRemoval: true,
        };
        setStateAndPatch(removalData);
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
        requests.createObject(urlBase, formData, location, setSaved, "new");
        // if (location.pathname.includes("new")) {
        //     return;
        // }
        // try {
        //     await axios.post(`${urlBase}/new`, formData).then((result) => {
        //         console.log("Result is", result);
        //         idRef.current = result.data.link._id;
        //         console.log(idRef.current);
        //     });
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     console.log("being saved");
        //     setSaved(true);
        // }
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
                isRemoval: false,
            };
            //TODO: rather than sending the whole shebang, just send
            // The new tag name and ID of link
            console.log("Passed data is", newData);
            requests.updateObject(params.id, newData, urlBase, setFormData, "link");
            // try {
            //     let updated = await axios
            //         .patch(`${urlBase}/${params.id}`, newData)
            //         .then((response) => setFormData(response.data.link));
            // } catch (error) {
            //     console.log(error);
            // }
        }
    }
    //we've created and saved a new link, so navigate to the stored reference of the id
    if (saved === true && `/links/create/${idRef.current}` !== location.pathname) {
        return <Navigate to={`/links/display/${idRef.current}`} />;
    }
    const closeModal = (event) => {
        event.stopPropagation();
        navigate(-1);
    };
    function handleChange(event) {
        let { name, type, checked, value } = event.currentTarget;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }
    function isNew() {
        return location.pathname.includes("new");
    }
    function updateFormData(name, value) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }

    let linkTypeOptions = Object.keys(LinkType).map((linkType) => (
        <option key={linkType}>{linkType}</option>
    ));
    return (
        <StyledContainer modal={props.modal}>
            <IconButton
                className="material-icons"
                btnStyle=""
                color="white"
                colorAlt="red"
                onClick={closeModal}>
                close
            </IconButton>
            {formData && (
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
                    <label htmlFor="tags-input">Tags</label>
                    <StyledTextboxSpan>
                        {tagSpans}
                        <input
                            type="text"
                            list="tags"
                            name="tags"
                            id="tags-input"
                            onKeyDown={(e) => e.key === "Enter" && handleKeyDown(e)}
                            placeholder="add new tag..."
                        />
                    </StyledTextboxSpan>
                    {/* <input type="text" list="tags" name="tags" onKeyUp={handleKeyUp} /> */}
                    <datalist id="tags">{tagOptions}</datalist>
                    <ChipGroup
                        groupType="radio"
                        groupName="type"
                        chips={Object.keys(LinkType)}
                        selectedValue={formData.type}
                        setStateFunction={updateFormData}
                    />
                    {/* <select>{linkTypeOptions}</select> */}
                    {isNew() && <ContainedButton type="submit">Submit</ContainedButton>}
                </StyledLinkForm>
            )}
        </StyledContainer>
    );
}

export default LinkNameInput;
