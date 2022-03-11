import React, { useState, useEffect } from "react";
import ComboBox from "./input/ComboBox";
import Select from "./input/Select";

export function FilterGroup(props) {
    const [names, setNames] = useState(props.links.map((link) => link.name));
    const [tags, setTags] = useState(props.tags.map((tag) => tag.name));

    const [filter, setFilter] = useState({
        propertyChoice: "name",
        relation: "equal",
        stringMatch: "",
        arrayMatch: [],
    });
    const [propertyChoiceProps, setPropertyChoiceProps] = useState(
        getPropertyChoiceProps()
    );
    const [matchProps, setMatchProps] = useState();
    const matchType = {
        name: String,
        url: String,
        tags: Array,
    };

    useEffect(() => {
        setNames(props.links.map((link) => link.name));
        setTags(props.tags.map((tag) => tag.name));

        setMatchProps(
            getMatchProps(
                filter.propertyChoice,
                filter.propertyChoice === "tags" ? "array" : "string"
            )
        );
    }, []);

    useEffect(() => {
        // setPropertyChoiceProps(getPropertyChoiceProps());

        setMatchProps(
            getMatchProps(
                filter.propertyChoice,
                filter.propertyChoice === "tags" ? "array" : "string"
            )
        );
    }, [filter, names, tags]);

    /**
     *
     * @param {String} propertyName - the name of the property we're updating
     * @param {*} value - the value we're updating with
     */
    function updateFilter(propertyName, value) {
        setFilter((prevFilter) => {
            return { ...prevFilter, [propertyName]: value };
        });
    }
    let optionsByType = {
        string: [
            { name: "equals", _id: "equals" },
            { name: "doesNotEqual", _id: "doesNotEqual" },
            { name: "not", _id: "not" },
        ],
        array: [
            { name: "contains", _id: "contains" },
            { name: "doesNotContain", _id: "doesNotContain" },
        ],
    };

    // any vs all
    function getRelationProps() {
        let relationProps = {
            name: "relation",
            options: [
                { name: "equals", _id: "equals" },
                { name: "doesNotEqual", _id: "doesNotEqual" },
                { name: "not", _id: "not" },
            ],
            setStateFunction: updateFilter,
            value: filter["relation"],
        };
        return relationProps;
    }
    function getPropertyChoiceProps() {
        let propertyChoiceProps = {
            name: "propertyChoice",
            options: [
                { name: "tags", _id: "tags" },
                { name: "name", _id: "name" },
                { name: "url", _id: "url" },
                { name: "type", _id: "type" },
            ],
            setStateFunction: updateFilter,
            value: filter["propertyChoice"],
        };
        return propertyChoiceProps;
    }

    let precisionProps = {
        name: "precision",
        options: [
            { name: "any", _id: "any" },
            { name: "all", _id: "all" },
        ],
    };

    let matchByType = {
        string: {},
    };
    console.log("Props updated?", propertyChoiceProps);

    /**
     * gets different props depending on the type
     * @param {String} propertyName - the name of the property
     * @param {*} propertyType - the type of the property
     * @returns - an object to be destructured into props
     */
    function getMatchProps(propertyName, propertyType) {
        console.log("Name and type", propertyName, propertyType);
        let matchProps = {
            name: "match",
            id: "match",
            list: `${propertyName}s`,
            datalistId: `${propertyName}s`,
            setStateFunction: updateFilter,
        };
        //if it's a string
        if (propertyType === "string") {
            //want to show a combobox with all the various
            matchProps.name = "stringMatch";
            matchProps.options = names.map((name) => {
                return { name: name, _id: name };
            });
            matchProps.value = filter.stringMatch;

            //if it's an array
        } else if (propertyType === "array") {
            matchProps.name = "arrayMatch";
            matchProps.multiple = true;
            console.log("UPDATING THIS DAMN ARRAY", tags);
            matchProps.options = tags.map((name) => {
                console.log("Tags are", name);
                return { name: name, _id: name };
            });
            matchProps.value = filter.arrayMatch;
        }
        return matchProps;
    }

    return (
        <fieldset flex-direction="row">
            <Select {...propertyChoiceProps} value={filter.propertyChoice}></Select>
            <Select {...getRelationProps()}></Select>
            <Select {...precisionProps}></Select>
            {filter.propertyChoice && (
                <div>
                    {filter.propertyChoice !== "tags" ? (
                        <ComboBox {...matchProps}></ComboBox>
                    ) : (
                        <Select
                            {...matchProps}
                            options={props.tags.map((tag) => {
                                return { name: tag.name, _id: tag.name };
                            })}></Select>
                    )}
                </div>
            )}
        </fieldset>
    );
}
