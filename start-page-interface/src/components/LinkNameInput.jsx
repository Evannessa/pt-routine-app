import React, { useEffect } from "react";
import tf from "../helpers/formatText";
import styled from "styled-components";
import axios from "axios";
import { IconButton, ContainedButton } from "./styled-components/Buttons.Styled";
import { useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
import { requests } from "../helpers/requests";
import TagChips from "./TagChips";
import withWrapper from "./input/withWrapper.js";
import ChipGroup from "./ChipGroup";
import Form from "./input/Form";
import Input from "./input/Input";
import { StyledForm } from "./styled-components/input.styled";
import { StyledChipFieldset } from "./styled-components/chips.styled";
import DropArea from "./DropArea";

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
        border-bottom: 0px;
    }
`;

// #region StyledComponents

const StyledContainer = styled.div`
    /* position: absolute; */
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    padding: 1.5rem 3rem;
    gap: 1rem;
    /* width: fit-content; */
    width: 100%;
    width: min(100%, 700px);

    /* max-width: 50%; */
    background: var(--clr-primary-dark);
    border-radius: 15px;
    z-index: 1;
    > button {
        align-self: flex-end;
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
        name: "Untitled",
        url: "#",
        tags: [],
        type: LinkType.External.name,
        text: "",
        imagePath: "",
    });
    const idRef = React.useRef();

    //get ALL tags to suggest when user types
    React.useEffect(() => {
        requests.getAll(`${urlBase}/tags`, setAllTags, "tags");
        console.log(id);
        if (id === "new") {
            createNewLink(); //create a new untitled link
        } else {
            requests.getObject(id, urlBase, params, setFormData);
        }
    }, []);

    useEffect(() => {
        if (formData.type === "Text" && !formData.text) {
            //if we're setting it to text type but there's no text
            updateFormData("text", " ");
        } else if (formData.type === "Image" && !formData.imagePath) {
            //if we're setting it to image type but there's no image
            updateFormData("imagePath", " ");
        }
    }, [formData.type]);

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
    async function patchAndSetState(newData) {
        console.log(newData);
        if (id !== "new") {
            requests.updateObject(params.id, newData, urlBase, setFormData, "link");
        }
    }

    //remove specific tag from this link
    function removeTag(id) {
        // propertyName, value, action, filter
        let removalData = createUpdateData("tags", "", "delete", { id: id });
        patchAndSetState(removalData);
    }

    function setSavedAndUpdate(data) {
        idRef.current = data._id;
        setSaved(true);
    }
    /**
     * axios == post request to new link
     */
    async function createNewLink() {
        await requests
            .createObject(urlBase, formData, location, setSavedAndUpdate, "new")
            .then((result) => {});
    }

    /**
     * create data to be passed into an update for our link
     * @param {*} propertyPath
     * @param {*} value - update value, if any
     * @param {*} action - the sub-action to perform on a property
     * @param {*} filter - the id or other data we want to filter it by
     * @returns object
     */
    function createUpdateData(propertyPath, value, action, filter) {
        return requests.compileUpdateData(
            formData.id,
            propertyPath,
            value,
            action,
            filter
        );
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
            let newData = createUpdateData("tags", newTag, "insert", "");

            console.log("Passed data is", newData);
            requests.updateObject(params.id, newData, urlBase, setFormData, "link");
        }
    }
    //we've created and saved a new link, so navigate to the stored reference of the id
    if (saved === true && `/links/create/${idRef.current}` !== location.pathname) {
        return <Navigate to={`/display/${idRef.current}`} />;
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
        let data = createUpdateData(name, value, "update", "");
        console.log(data);
        patchAndSetState(data);
    }

    function returnInput(
        property,
        wrapped,
        hasLabel = true,
        extraProps = {},
        type = "text"
    ) {
        let name = Object.keys(formData).find((key) => key === property);
        console.log("Name is", name);
        console.log(formData[name]);
        return (
            <Input
                key={name}
                name={name}
                type={type}
                extraProps={extraProps}
                value={formData[name]}
                setStateFunction={updateFormData}
                hasLabel={hasLabel}
                wrapped={wrapped}
            />
        );
    }
    function returnWrappedInput(
        property,
        hasLabel = false,
        wrapped = true,
        extraProps = {}
    ) {
        return (
            <span>
                <label htmlFor={property}>{tf.capitalizeFirstLetter(property)}</label>
                <StyledTextboxSpan>
                    {tagSpans}
                    {returnInput(property, wrapped, hasLabel, extraProps)}
                </StyledTextboxSpan>
            </span>
        );
    }
    function returnDropArea() {
        return (
            <DropArea
                imagePath={formData.imagePath}
                updateFormData={updateFormData}></DropArea>
        );
    }

    return (
        <StyledContainer modal={props.modal}>
            {!isNew() && (
                <IconButton
                    className="material-icons"
                    btnStyle=""
                    color="white"
                    colorAlt="red"
                    onClick={closeModal}>
                    close
                </IconButton>
            )}
            {formData && (
                <Form
                    submitFunction={createNewLink}
                    submitText={isNew() ? "Create New Link" : ""}>
                    {returnInput("name")}
                    {returnInput("url")}
                    {returnWrappedInput("tags", false, false, {
                        onKeyDown: handleKeyDown,
                    })}
                    <ChipGroup
                        groupType="radio"
                        groupName="type"
                        chips={Object.keys(LinkType)}
                        selectedValue={formData.type}
                        setStateFunction={updateFormData}
                    />
                    {formData.type === "Text" &&
                        formData.text &&
                        returnInput("text", false, true, {}, "textarea")}
                    {formData.type === "Image" && formData.imagePath && returnDropArea()}
                </Form>
            )}
        </StyledContainer>
    );
}

export default LinkNameInput;
