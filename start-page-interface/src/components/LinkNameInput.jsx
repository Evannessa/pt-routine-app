import React from "react";
import styled from "styled-components";
import axios from "axios";

const StyledLinkForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    *:not(input) {
        color: white;
    }
    input {
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

function LinkNameInput(props) {
    const urlBase = "http://localhost:9000/links";
    const [formData, setFormData] = React.useState({
        linkName: "",
        url: "",
        tags: [],
    });

    //get tags to suggest
    React.useEffect(() => {
        try {
            axios.get(`${urlBase}/tags`).then((result) => {
                setFormData((prevFormData) => {
                    return {
                        ...prevFormData,
                        tags: result.data.tags,
                    };
                });
                console.log(result);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    console.log(formData.tags);

    let tagComponents = formData.tags.map((tag) => <option value={tag.name}></option>);

    // React.useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    function handleSubmit(event) {
        event.preventDefault();
        createNewLink();
    }
    function createNewLink() {
        try {
            axios.post(`${urlBase}/new`, formData).then((result) => {
                console.log(result);
            });
        } catch (error) {
            console.log(error);
        }
    }

    function handleKeyUp(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            console.log("Pressed enter in textbox");
        }
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
                name="linkName"
                id="linkName"
                value={formData.linkName}
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
            <input type="text" list="tags" name="tags" onKeyUp={handleKeyUp} />
            <datalist id="tags">{tagComponents}</datalist>

            <button type="submit">Submit</button>
        </StyledLinkForm>
    );
}

export default LinkNameInput;
