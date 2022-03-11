import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ComboBox from "./input/ComboBox";
import * as StyledInputs from "./styled-components/input.styled";
import Select from "./input/Select";
import Form from "./input/Form";

function FilterGroup(props) {
    const [names, setNames] = useState(props.links.map((link) => link.name));
    const [tags, setTags] = useState(props.tags.map((tag) => tag.name));

    const [filter, setFilter] = useState({
        propertyChoice: "name",
        relation: "equal",
        stringMatch: "",
        arrayMatch: [],
    });
    const matchType = {
        name: String,
        url: String,
        tags: Array,
    };

    useEffect(() => {
        setNames(props.links.map((link) => link.name));
        setTags(props.tags.map((tag) => tag.name));
    }, []);

    /**
     *
     * @param {String} propertyName - the name of the property we're updating
     * @param {*} value - the value we're updating with
     */
    function updateFilter(propertyName, value) {
        console.log("Updating with", propertyName, value);
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
            console.log("names array", names);
            matchProps.name = "stringMatch";
            matchProps.options = names.map((name) => {
                return { name: name, _id: name };
            });
            matchProps.value = filter.stringMatch;

            //if it's an array
        } else if (propertyType === "array") {
            matchProps.name = "arrayMatch";
            matchProps.multiple = true;
            matchProps.options = tags.map((name) => {
                return { name: name, _id: name };
            });
            matchProps.value = filter.arrayMatch;
        }
        return matchProps;
    }

    return (
        <fieldset flex-direction="row">
            <Select {...propertyChoiceProps}></Select>
            <Select {...relationProps}></Select>
            <Select {...precisionProps}></Select>
            <ComboBox
                {...getMatchProps(
                    filter.propertyChoice,
                    filter.propertyChoice === "name" || "url" || "type"
                        ? "string"
                        : "array"
                )}></ComboBox>
        </fieldset>
    );
}

function FilterGroups(props) {
    const [filters, setFilters] = useState({
        propertyChoice: "name",
        relation: "and",
        match: [],
    });

    //filters should be sub-groups

    //the methods associated with each type
    const matchFunctions = {
        name: filterStringProperty,
        url: filterStringProperty,
        tags: filterArrayProperty,
    };

    function determineAll(group) {}

    /**
     *
     * @param {String} property - the name of the property we're testing
     * @param {String|Array} match - a string or array to match
     * @param {Boolean} matchAll - if all should match, or just some. For Strings it'll be if the word should match exactly or just partially.
     * @returns a boolean saying whether or not the property matches
     */
    function filterStringProperty(property, match, matchAll = false) {
        //match all should return an EXACT match
        if (matchAll) {
            return property === match;
        } else {
            //match all should return a non-exact, case-insensitive match that includes portions of the word
            console.log(property);
            return property.toLowerCase().includes(match.toLowerCase());
        }
    }
    /**
     *
     * @param {*} childArray - the nested array of items
     * @param {*} property -
     * @param {*} match
     * @returns if all (or some) of the values in the array match
     */
    function filterArrayProperty(childArray, match, matchAll, childProperty = "") {
        let nameArray = [];
        if (childProperty) {
            nameArray = childArray.map((item) => item[childProperty].toLowerCase());
        } else {
            nameArray = childArray.map((item) => item.toLowerCase()); //get names of items
        }
        console.log(childArray);
        if (matchAll && match instanceof Array) {
            let allIncluded = match.every((matchString) =>
                nameArray.includes(matchString.toLowerCase())
            );
            return allIncluded;
        }
        //use some to make sure only some of the values in the child array match
        else {
            let someIncluded = match.some((matchString) =>
                nameArray.includes(matchString.toLowerCase())
            );
            return someIncluded;
        }
    }
    const getNestedObject = (nestedObject, pathArray) => {
        return pathArray.reduce(function (obj, key) {
            if (obj && obj[key] !== undefined) {
                console.log(obj, key, obj[key]);
                return obj[key];
            }
            return undefined;
        }, nestedObject);
    };
    function breakDownPropertyName(propertyName) {
        return propertyName.split(".");
    }

    function getMatches(
        array,
        property,
        conditionToMeet,
        matchAll = false,
        childProperty = ""
    ) {
        //for the strings, match all could be ""
        let propertyName = property;

        return array.filter((item, index) => {
            // let newPathString = property.replace("index", index);
            return matchFunctions[propertyName](
                item[propertyName],
                conditionToMeet,
                matchAll,
                childProperty
            );
        });
    }

    function updateFilters(propertyName, value) {
        setFilters({ [propertyName]: value });
    }

    let andOrProps = {
        name: "relation",
        options: [
            { name: "and", _id: "and" },
            { name: "or", _id: "or" },
            { name: "not", _id: "not" },
        ],
        setStateFunction: updateFilters,
        value: filters["relation"],
    };

    return (
        <Form>
            <FilterGroup links={props.links} tags={props.tags}></FilterGroup>
            <Select {...andOrProps}></Select>
        </Form>
    );
}

export default FilterGroups;
