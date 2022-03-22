import React, { useState, useEffect } from "react";
import ComboBox from "./input/ComboBox";
import Input from "./input/Input";
import Select from "./input/Select";
import { ChipButton } from "./styled-components/chips.styled";
import * as Buttons from "./styled-components/Buttons.Styled";
import * as Layout from "./styled-components/layout.styled";
import { isElementOfType } from "react-dom/test-utils";
import styled from "styled-components";

export var filterOperations = (function () {
    //the methods associated with each type
    function testIntersection(array1, array2) {
        // "AND" means it matches every single qualifier
        // So we're trying to find items from every filter's array of matching links
        // and find ones that only exist in ALL of them.
        const filteredArray = array1.filter((value) => array2.includes(value));
        return filteredArray;
    }
    const matchFunctions = {
        name: filterStringProperty,
        url: filterStringProperty,
        tags: filterArrayProperty,
        type: filterStringProperty,
    };

    /**
     *
     * @param {String} property - the name of the property we're testing
     * @param {String|Array} match - a string or array to match
     * @param {Boolean} matchAll - if all should match, or just some. For Strings it'll be if the word should match exactly or just partially.
     * @returns a boolean saying whether or not the property matches
     */
    function filterStringProperty(property, match, matchAll = false) {
        if (typeof property !== "string" || !Array.isArray(match) || match.length === 0) {
            return;
        }
        //match all should return an EXACT match
        if (matchAll) {
            return property === match;
        } else {
            //otherwise  should return a non-exact, case-insensitive match that includes portions of the word
            return property.toLowerCase().includes(match[0].toLowerCase());
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

    function getMatches(
        array,
        property,
        conditionToMeet,
        matchAll = false,
        childProperty = ""
    ) {
        //for the strings, match all could be ""
        let propertyName = property;
        let regex = /(name|url|tags|type)/g;
        if (!propertyName || !propertyName.match(regex)) {
            console.warn("NOT A PROPERTY NAME", propertyName);
            return [];
        }
        //filter out items in "links", if name or URL, match the match condition
        // i.e., "name" = "Gaming" "match" = "Gam";
        return array.filter((item, index) => {
            return matchFunctions[propertyName](
                item[propertyName],
                conditionToMeet,
                matchAll,
                childProperty
            );
        });
    }
    return {
        filterStringProperty,
        filterArrayProperty,
        matchFunctions,
        getMatches,
        testIntersection,
    };
})();

const FilterSection = styled.section`
    /* background-color: var(--clr-primary-light); */
    border: ${(props) => (props.displayMode ? "none" : "1px solid var(--clr-accent)")};
    padding: 0.5rem 1rem;
    border-radius: 10px;
`;
export function Filter(props) {
    const [names, setNames] = useState(props.links.map((link) => link.name));
    //all of the links mapped to only show their names
    //TODO: Add url as well
    const [tags, setTags] = useState(props.tags.map((tag) => tag.name));
    //all of the tags
    const [matches, setMatches] = useState(); // matches are the links that match our filter conditions
    const [displayMode, setDisplayMode] = useState(props.displayMode); //whether we're showing the form details, or just the name. Toggles w/ the button.

    const [filter, setFilter] = useState(
        props.defaultValues
            ? { ...props.defaultValues, stringMatch: "", arrayMatch: [] } //spread in the default values with the matches
            : {
                  categoryName: "",
                  propertyChoice: "name",
                  relation: "equal",
                  stringMatch: "",
                  arrayMatch: [],
              }
    ); //the filter is basically our conditions. What property we're filtering on (name, url, or tags), what we want the relation to be (equal or not equal), and what they need to match (a string or an array of tags)

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

    function toggleDisplayMode(event) {
        setDisplayMode((prevMode) => !prevMode);
    }
    function findMatches() {
        // console.log(
        //     "Arguments this way",
        //     props.links,
        //     filter.propertyChoice,
        //     filter.stringMatch
        // );
        // setMatches(getMatches(props.links, filter.propertyChoice, filter.stringMatch));
    }
    //if the links are updated, or our filter object is updated (we change the condition or precision, etc.), find our matching links again
    useEffect(() => {
        if (filter) {
            findMatches();
        }
    }, [props.links, filter]);

    //if our filter object changes, or the names of the links, or the tags change, find our matching links again
    useEffect(() => {
        setMatchProps(
            getMatchProps(
                filter.propertyChoice,
                filter.propertyChoice === "tags" ? "array" : "string"
            )
        );
        if (filter) {
            findMatches();
        }
    }, [filter, names, tags]);

    //if our filter changes, update our parent group to reflect that
    useEffect(() => {
        props.updateParent(filter._id, filter);
    }, [filter]);

    //the methods associated with each type

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
            //otherwise  should return a non-exact, case-insensitive match that includes portions of the word
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
                // console.log(obj, key, obj[key]);
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
        console.log(
            "Parameters",
            array,
            property,
            conditionToMeet,
            matchAll,
            childProperty
        );
        //for the strings, match all could be ""
        let propertyName = property;
        //filter out items in "links", if name or URL, match the match condition
        // i.e., "name" = "Gaming" "match" = "Gam";

        return array.filter((item, index) => {
            return filterOperations.matchFunctions[propertyName](
                item[propertyName],
                conditionToMeet,
                matchAll,
                childProperty
            );
        });
    }

    /**
     *
     * @param {String} propertyName - the name of the property we're updating
     * @param {*} value - the value we're updating with
     */
    function updateFilter(propertyName, value) {
        // console.log("Filter;: Updating " + propertyName + " with ", value);
        //TODO: convert even the strings to be arrays to get rid off this fiddly stuff below
        let updatedMatch = false;
        let newMatchValue = [...filter.match];
        if (propertyName === "stringMatch" || propertyName === "arrayMatch") {
            updatedMatch = true;
            // console.log(typeof value);
            if (typeof value === "string") {
                newMatchValue = [value];
                // console.log(newMatchValue);
            }
        }
        setFilter((prevFilter) => {
            return {
                ...prevFilter,
                [propertyName]: value,
                match: updatedMatch ? newMatchValue : filter.match,
            };
        });

        // props.updateParent(filter._id, filter);
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

    /**
     * gets different props depending on the type
     * @param {String} propertyName - the name of the property
     * @param {*} propertyType - the type of the property
     * @returns - an object to be destructured into props
     */
    function getMatchProps(propertyName, propertyType) {
        // console.log("Name and type", propertyName, propertyType);
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
            matchProps.value = filter.match ? filter.match[0] : "";

            //if it's an array
        } else if (propertyType === "array") {
            matchProps.name = "arrayMatch";
            matchProps.multiple = true;
            // console.log("UPDATING THIS DAMN ARRAY", tags);
            matchProps.options = tags.map((name) => {
                // console.log("Tags are", name);
                return { name: name, _id: name };
            });
            matchProps.value = filter.match ? filter.match : [];
        }
        return matchProps;
    }

    return (
        <FilterSection displayMode={displayMode}>
            <Buttons.OutlinedButton
                onClick={toggleDisplayMode}
                style={{
                    borderColor: displayMode ? "currentcolor" : "transparent",
                }}>
                <Buttons.StyledButtonIconSpan>
                    {displayMode ? "expand_more" : "unfold_less"}
                </Buttons.StyledButtonIconSpan>
                {filter.categoryName}
            </Buttons.OutlinedButton>
            {!displayMode && (
                <fieldset
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "transparent",
                    }}>
                    {/* <Input
                            type="text"
                            value={filter.categoryName}
                            name="categoryName"
                            setStateFunction={updateFilter}
                            hasLabel={true}></Input> */}
                    <Select
                        {...propertyChoiceProps}
                        value={filter.propertyChoice}></Select>
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
                    {/* <div>
					{matches
						? matches.map((match) => <div key={match._id}>{match.name}</div>)
						: []}
								</div> */}
                </fieldset>
            )}
        </FilterSection>
    );
}
