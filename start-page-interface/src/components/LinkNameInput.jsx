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
import { StyledForm, StyledTextboxSpan } from "./styled-components/input.styled";
import { StyledChipFieldset } from "./styled-components/chips.styled";
import DropArea from "./DropArea";

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
    let id = Object.keys(params).length > 0 ? params.id : "new";
    const location = useLocation();
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
    const [tagsInput, setTagsInput] = React.useState({ inputValue: "" });
    const idRef = React.useRef();

    //get ALL tags to suggest when user types
    React.useEffect(() => {
        requests.axiosRequest("GET", ["display", "tags"], {}, setAllTags);
        // requests.getAll(`${urlBase}/tags`, setAllTags, "tags");
        if (id === "new") {
            createNewLink(); //create a new untitled link
        } else {
            console.log("ID is", id);
            requests.axiosRequest("GET", ["display", id], {}, setFormData);
            // requests.getObject(id, urlBase, params, setFormData);
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
    /**
     * TODO: this will save the state to the API after the user is done typing
     */
    // useEffect(()=> {
    // 	const timeOutId = setTimeout(()=> {}, 500)
    // 	return () => clearTimeout(timeOutId);
    // }, [formData])

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
            requests.updateObject(params.id, newData, setFormData, "link");
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
        requests.axiosRequest("POST", ["create", "new"], formData, setSavedAndUpdate);
        // await requests
        // .createObject(formData, location, setSavedAndUpdate, "new")
        // .then((result) => {});
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
        if (event.key === "Enter" || event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();
            let tagBox = event.currentTarget;
            let newTag = tagBox.value;
            tagBox.value = "";
            setTagsInput({ inputValue: "" });

            console.log("Pressed enter in textbox. Value is", tagBox.value);

            //get tags from old formdata
            let newArray = [...formData.tags];

            //push new form data if doesn't exist
            if (!newArray.includes(newTag)) {
                newArray.push(newTag);
            }
            let newData = createUpdateData("tags", newTag, "insert", "");

            console.log("Passed data is", newData);
            requests.axiosRequest("PATCH", ["create", "id"], newData, setFormData);
            // requests.updateObject(params.id, newData, urlBase, setFormData, "link");
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

    function isNew() {
        return location.pathname.includes("new");
    }
    /**
     * creates an object to pass to the "patch" request when api is called
     * which will update state afterward
     * @param {String} name - the name of the property we're updating in the formData Object
     * @param {*} value  - the value that we're updating
     */
    function updateFormData(name, value) {
        let data = createUpdateData(name, value, "update", "");
        console.log(data);
        patchAndSetState(data);
    }

    /**
     *
     *
     * @param {String} value - string of words we want to become tags. For updating input that's not directly saved
     */
    function updateTagsInput(name, value) {
        console.log(name, value);
        setTagsInput({ inputValue: value });
    }

    function returnInput(args) {
        let { object, property, wrapped, hasLabel, extraProps, type, updateFunction } =
            args;
        let name = Object.keys(object).find((key) => key === property);
        console.log(object, name);
        return (
            <Input
                key={name}
                name={name}
                type={type}
                extraProps={extraProps}
                value={object[name]}
                setStateFunction={updateFunction}
                hasLabel={hasLabel}
                wrapped={wrapped}
            />
        );
    }
    /**
     * Input wrapped in a span for things like displaying tags.
     * returns a span-wrapped Input component
     */
    function returnWrappedInput(args) {
        return (
            <span>
                <label htmlFor={args.property}>
                    {tf.capitalizeFirstLetter(tf.camelCaseToWords(args.property))}
                </label>
                <StyledTextboxSpan style={{ flexDirection: "row" }}>
                    {tagSpans}
                    {returnInput(args)}
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
    //default data to pass to our inputs
    let inputData = {
        object: formData,
        property: "",
        wrapped: false,
        hasLabel: true,
        extraProps: {},
        type: "text",
        updateFunction: updateFormData,
    };
    //data for the "name" input
    let nameInputData = { ...inputData, property: "name" };

    //data for the "url" input
    let urlInputData = { ...inputData, property: "url" };

    //data for the "tags" input
    let tagsInputData = {
        ...inputData,
        object: tagsInput,
        property: "inputValue",
        wrapped: true,
        hasLabel: false,
        extraProps: { onKeyDown: handleKeyDown, style: { flexDirection: "row" } },
        updateFunction: updateTagsInput,
    };

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
                    submitText={isNew() ? "Create New Link" : ""}
                    childDirection="row">
                    {returnInput(nameInputData)}
                    {returnInput(urlInputData)}
                    {returnWrappedInput(tagsInputData)}
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
